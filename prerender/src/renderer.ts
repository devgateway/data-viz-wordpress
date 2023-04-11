import puppeteer, {PDFOptions, ***REMOVED***} from 'puppeteer';
import url from 'url';
import {dirname} from 'path';

import {Config} from './config';

type ***REMOVED*** = {
    status: number;
    customHeaders: Map<string, string>;
    content: string;
};

type ***REMOVED*** = {
    width: number;
    height: number;
};

const MOBILE_USERAGENT =
    'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Mobile Safari/537.36';

/**
 * Wraps Puppeteer's interface to Headless Chrome to expose high level rendering
 * APIs that are able to handle web components and PWAs.
 */
export class Renderer {
    private browser: puppeteer.Browser;
    private config: Config;

    constructor(browser: puppeteer.Browser, config: Config) {
        this.browser = browser;
        this.config = config;
    }

    private ***REMOVED***(requestUrl: string): boolean {
        const parsedUrl = url.parse(requestUrl);

        if (parsedUrl.hostname && parsedUrl.hostname.match(/\.internal$/)) {
            return true;
        }

        if (this.config.***REMOVED*** && requestUrl.match(new RegExp(this.config.***REMOVED***))) {
            return true;
        }

        return false;
    }

    async serialize(
        requestUrl: string,
        isMobile: boolean,
        timezoneId?: string
    ): Promise<***REMOVED***> {
        /**
         * Executed on the page after the page has loaded. Strips script and
         * import tags to prevent further loading of resources.
         */
        function stripPage() {
            // Strip only script tags that contain JavaScript (either no type attribute or one that contains "javascript")
            const elements = document.***REMOVED***(
                'script:not([type]), script[type*="javascript"], script[type="module"], link[rel=import]'
            );
            for (const e of Array.from(elements)) {
                e.remove();
            }
        }

        /**
         * Injects a <base> tag which allows other resources to load. This
         * has no effect on serialised output, but allows it to verify render
         * quality.
         */
        function ***REMOVED***(origin: string, directory: string) {
            const bases = document.head.***REMOVED***('base');
            if (bases.length) {
                // Patch existing <base> if it is relative.
                const existingBase = bases[0].getAttribute('href') || '';
                if (existingBase.startsWith('/')) {
                    // check if is only "/" if so add the origin only
                    if (existingBase === '/') {
                        bases[0].setAttribute('href', origin);
                    } else {
                        bases[0].setAttribute('href', origin + existingBase);
                    }
                }
            } else {
                // Only inject <base> if it doesn't already exist.
                const base = document.createElement('base');
                // Base url is the current directory
                base.setAttribute('href', origin + directory);
                document.head.insertAdjacentElement('afterbegin', base);
            }
        }

        const page = await this.browser.newPage();

        // Page may reload when setting isMobile
        // https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#pagesetviewportviewport
        await page.setViewport({
            width: this.config.width,
            height: this.config.height,
            isMobile,
        });

        if (isMobile) {
            page.setUserAgent(MOBILE_USERAGENT);
        }

        if (timezoneId) {
            try {
                await page.***REMOVED***(timezoneId);
            } catch (e) {
                if (e.message.includes('Invalid timezone')) {
                    return {
                        status: 400,
                        customHeaders: new Map(),
                        content: 'Invalid timezone id',
                    };
                }
            }
        }

        await page.***REMOVED***(this.config.reqHeaders);

        page.evaluateOnNewDocument('***REMOVED***.forcePolyfill = true');
        page.evaluateOnNewDocument('ShadyDOM = {force: true}');
        page.evaluateOnNewDocument('ShadyCSS = {***REMOVED***: true}');

        await page.setRequestInterception(true);

        page.on('request', (***REMOVED***: puppeteer.HTTPRequest) => {
            if (this.***REMOVED***(***REMOVED***.url())) {
                ***REMOVED***.abort();
            } else {
                ***REMOVED***.continue();
            }
        });

        let response: puppeteer.HTTPResponse | null = null;
        // Capture main frame response. This is used in the case that rendering
        // times out, which results in puppeteer throwing an error. This allows us
        // to return a partial response for what was able to be rendered in that
        // time frame.
        page.on('response', (r: puppeteer.HTTPResponse) => {
            if (!response) {
                response = r;
            }
        });

        try {
            // Navigate to page. Wait until there are no oustanding network requests.
            response = await page.goto(requestUrl, {
                timeout: this.config.timeout,
                waitUntil: 'networkidle0',
            });
        } catch (e) {
            console.error(e);
        }

        if (!response) {
            console.error('response does not exist');
            // This should only occur when the page is about:blank. See
            // https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md#pagegotourl-options.
            await page.close();
            if (this.config.closeBrowser) {
                await this.browser.close();
            }
            return {status: 400, customHeaders: new Map(), content: ''};
        }

        // Disable access to compute metadata. See
        // https://cloud.google.com/compute/docs/storing-retrieving-metadata.
        if (response.headers()['metadata-flavor'] === 'Google') {
            await page.close();
            if (this.config.closeBrowser) {
                await this.browser.close();
            }
            return {status: 403, customHeaders: new Map(), content: ''};
        }

        // Set status to the initial server's response code. Check for a <meta
        // name="render:status_code" content="4xx" /> tag which overrides the status
        // code.
        let statusCode = response.status();
        const newStatusCode = await page
            .$eval('meta[name="render:status_code"]', (element) =>
                parseInt(element.getAttribute('content') || '')
            )
            .catch(() => undefined);
        // On a repeat visit to the same origin, browser cache is enabled, so we may
        // encounter a 304 Not Modified. Instead we'll treat this as a 200 OK.
        if (statusCode === 304) {
            statusCode = 200;
        }
        // Original status codes which aren't 200 always return with that status
        // code, regardless of meta tags.
        if (statusCode === 200 && newStatusCode) {
            statusCode = newStatusCode;
        }

        // Check for <meta name="render:header" content="key:value" /> tag to allow a custom header in the response
        // to the crawlers.
        const customHeaders = await page
            .$eval('meta[name="render:header"]', (element) => {
                const result = new Map<string, string>();
                const header = element.getAttribute('content');
                if (header) {
                    const i = header.indexOf(':');
                    if (i !== -1) {
                        result.set(
                            header.substr(0, i).trim(),
                            header.substring(i + 1).trim()
                        );
                    }
                }
                return JSON.stringify([...result]);
            })
            .catch(() => undefined);

        // Remove script & import tags.
        await page.evaluate(stripPage);
        // Inject <base> tag with the origin of the request (ie. no path).
        const parsedUrl = url.parse(requestUrl);
        await page.evaluate(
            ***REMOVED***,
            `${parsedUrl.protocol}//${parsedUrl.host}`,
            `${dirname(parsedUrl.pathname || '')}`
        );

        // Serialize page.
        const result = (await page.content()) as string;

        await page.close();
        if (this.config.closeBrowser) {
            await this.browser.close();
        }
        return {
            status: statusCode,
            customHeaders: customHeaders
                ? new Map(JSON.parse(customHeaders))
                : new Map(),
            content: result,
        };
    }

    async screenshot(
        url: string,
        isMobile: boolean,
        dimensions: ***REMOVED***,
        options?: ***REMOVED***,
        timezoneId?: string
    ): Promise<Buffer> {
        const page = await this.browser.newPage();

        // Page may reload when setting isMobile
        // https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#pagesetviewportviewport
        await page.setViewport({
            width: dimensions.width,
            height: dimensions.height,
            isMobile,
        });

        if (isMobile) {
            page.setUserAgent(MOBILE_USERAGENT);
        }

        await page.setRequestInterception(true);

        page.addListener('request', (***REMOVED***: puppeteer.HTTPRequest) => {
            if (this.***REMOVED***(***REMOVED***.url())) {
                ***REMOVED***.abort();
            } else {
                ***REMOVED***.continue();
            }
        });

        if (timezoneId) {
            await page.***REMOVED***(timezoneId);
        }

        let response: puppeteer.HTTPResponse | null = null;

        try {
            // Navigate to page. Wait until there are no oustanding network requests.
            response = await page.goto(url, {
                timeout: this.config.timeout,
                waitUntil: 'networkidle0',
            });
        } catch (e) {
            console.error(e);
        }

        if (!response) {
            await page.close();
            if (this.config.closeBrowser) {
                await this.browser.close();
            }
            throw new ***REMOVED***('NoResponse');
        }

        // Disable access to compute metadata. See
        // https://cloud.google.com/compute/docs/storing-retrieving-metadata.
        if (response.headers()['metadata-flavor'] === 'Google') {
            await page.close();
            if (this.config.closeBrowser) {
                await this.browser.close();
            }
            throw new ***REMOVED***('Forbidden');
        }

        // Must be jpeg & binary format.
        const ***REMOVED***: ***REMOVED*** = {
            type: options?.type || 'jpeg',
            encoding: options?.encoding || 'binary',
        };
        // Screenshot returns a buffer based on specified encoding above.
        // https://github.com/GoogleChrome/puppeteer/blob/v1.8.0/docs/api.md#pagescreenshotoptions
        const buffer = (await page.screenshot(***REMOVED***)) as Buffer;
        await page.close();
        if (this.config.closeBrowser) {
            await this.browser.close();
        }
        return buffer;
    }


    async pdf(
        url: string,
        isMobile: boolean,
        dimensions: ***REMOVED***,
        options?: PDFOptions,
        timezoneId?: string
    ): Promise<Buffer> {

        const page = await this.browser.newPage();
        // Page may reload when setting isMobile
        // https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#pagesetviewportviewport
        await page.setViewport({
            width: dimensions.width,
            height: dimensions.height,
            isMobile,
        });

        if (isMobile) {
            page.setUserAgent(MOBILE_USERAGENT);
        }

        await page.setRequestInterception(true);

        page.addListener('request', (***REMOVED***: puppeteer.HTTPRequest) => {
            if (this.***REMOVED***(***REMOVED***.url())) {
                ***REMOVED***.abort();
            } else {
                ***REMOVED***.continue();
            }
        });

        if (timezoneId) {
            await page.***REMOVED***(timezoneId);
        }

        let response: puppeteer.HTTPResponse | null = null;

        try {
            // Navigate to page. Wait until there are no oustanding network requests.
            response = await page.goto(url, {
                timeout: this.config.timeout,
                waitUntil: 'networkidle0',
            });


            await page.evaluate(async () => {
                await new Promise((resolve) => {
                    let totalHeight = 0;
                    let distance = 100;
                    let timer = setInterval(() => {
                        let scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;
                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve(true);
                        }
                    }, 0);
                });
            });

        } catch (e) {
            console.error(e);
        }

        if (!response) {
            await page.close();
            if (this.config.closeBrowser) {
                await this.browser.close();
            }
            throw new ***REMOVED***('NoResponse');
        }

        // Disable access to compute metadata. See
        // https://cloud.google.com/compute/docs/storing-retrieving-metadata.
        if (response.headers()['metadata-flavor'] === 'Google') {
            await page.close();
            if (this.config.closeBrowser) {
                await this.browser.close();
            }
            throw new ***REMOVED***('Forbidden');
        }

        // @ts-ignore
        const pdfOptions: PDFOptions = {
            path: options?.path || 'export.pdf',
            format: options?.format || 'a4',
            scale: options?.scale || 1,
            margin: options?.margin || {
                top: 50,
                left: 50,
                bottom: 50,
                right: 50
            },
            ***REMOVED***: options?.***REMOVED*** || false,
            ***REMOVED***: options?.***REMOVED*** || '<h1><h1/>',
            ***REMOVED***: options?.***REMOVED*** || '<h1></h1>'
        };

        const buffer = await page.pdf(pdfOptions);

        await page.close();
        if (this.config.closeBrowser) {
            await this.browser.close();
        }
        return buffer;
    }
}

type ErrorType = 'Forbidden' | 'NoResponse';

export class ***REMOVED*** extends Error {
    type: ErrorType;

    constructor(type: ErrorType) {
        super(type);

        this.name = this.constructor.name;

        this.type = type;
    }
}
