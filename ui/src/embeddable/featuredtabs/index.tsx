import React, { useEffect, useState } from 'react'
import { Accordion, Container, Grid, Icon, Label, Segment } from 'semantic-ui-react'
import {
    MediaConsumer,
    MediaProvider,
    PostConsumer,
    PostIcon,
    PostProvider,
    PostTitle,
    PostContent
} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";

const FeaturedPost = ({ post, onClick, active, moreLabel }) => {
    const media = post['_embedded'] ? post['_embedded']["wp:featuredmedia"] : null;

    return (
        <div className="cover" style={{ "***REMOVED***": 'url(' + (media ? media[0].source_url : '') + ')' }}>
            <PostIntro post={post} />
            {!active ?
                <Label onClick={onClick}><Icon name='search' size="large" /> {moreLabel}</Label> :
                <Label onClick={onClick}><Icon name='arrow alternate circle left outline' size="large" /> Back </Label>}
        </div>
    );
};

const ***REMOVED*** = ({ post }) => {
    const parser = new DOMParser();
    const doc = parser.***REMOVED***(post.content.rendered, 'text/html');
    const figureElement = doc.querySelector('figure');
    if (!figureElement) {
        return null;
    }
    return (
        <div style={{
            flex: '0 0 40px'
        }} dangerouslySetInnerHTML={{ __html: figureElement.outerHTML }} />
    );
};

interface ***REMOVED*** {
    posts?: any[],
    width: number,
    height: number,
    color: string,
    moreLabel: string
}

const FeaturedTabs: React.FC<***REMOVED***> = ({ posts, height, color, moreLabel }) => {
    const [active, setActive] = useState<string | null>(null)
    const [visible, setVisible] = useState(false)
    const [scrollPos, setScrollPos] = useState<[number, number]>([0, 0])
    const arrayColors = color.split(',')


    const ***REMOVED*** = (k: string) => {
        if (!visible) {
            setActive(k)
            setVisible(true)
        } else {
            setVisible(false)
            setActive(k)
        }
    }

    useEffect(() => {
        if (active) {
            setScrollPos([window.scrollX, window.scrollY])
        }
        if (active == null) {
            window.scrollTo(scrollPos[0], scrollPos[1])

        }
    }, [active])


    useEffect(() => {
        window.setTimeout(() => {
            if (window.location.hash) {
                const slug = window.location.hash.substr(1)
                const element = document.***REMOVED***(slug);

                if (element && posts && posts.map(p => p.slug).indexOf(slug) > -1) {
                    setActive(slug)
                    element.***REMOVED***({ behavior: "auto", block: "start" });
                }

            }
        }, 0
        )
    }, posts)

    return (
        <Container fluid={true} className="featured tabs" style={{ "min-height": height + 'px' }}>
            {/* @ts-ignore */}
            <Grid stackable columns={active != null ? 1 : posts.length} className="desktop">
                {posts && posts.map((post, i) => {
                    return <React.Fragment>
                        <Grid.Column
                            style={active == null ? { display: 'block', visibility: 'visible', "***REMOVED***": arrayColors[i] } : { display: 'none', visibility: 'hidden' }}>

                            <a id={post.slug} />
                            <FeaturedPost post={post} moreLabel={moreLabel}
                                active={active}
                                onClick={e => ***REMOVED***(post.slug)} />
                        </Grid.Column>

                        <Grid.Column className="expanded"
                            style={active != post.slug ? { display: 'none', visibility: 'hidden' } : { display: 'block', visibility: 'visible' }}>
                            <Segment style={{ "***REMOVED***": arrayColors[i] }}>
                                {post.meta_fields && post.meta_fields.icon &&
                                    <MediaProvider id={post.meta_fields ? post.meta_fields.icon[0] : null}>
                                        <MediaConsumer>
                                            <PostIcon></PostIcon>
                                        </MediaConsumer>
                                    </MediaProvider>
                                }
                                <PostTitle as={"h2"} post={post} className={"has-standard-36-font-size has-white-color"} />
                                <Label className={"closeIcon"} onClick={e => setActive(null)}><Icon name='times circle outline' size="large" /></Label>

                            </Segment>
                            <PostContent as={"div"} fluid={true} post={post} />
                            <Label className={"closeIconText"} onClick={e => setActive(null)}><Icon name='times circle outline' size="large" /> Close </Label>
                        </Grid.Column>
                    </React.Fragment>
                })}

            </Grid>


        </Container>
    )
}

// Mobile ***REMOVED*** Component
const ***REMOVED*** = ({ posts, activeItem, setActive, color }) => {
    const [activeIndex, ***REMOVED***] = useState(posts.findIndex(p => p.slug === activeItem));
    const [scrollTarget, ***REMOVED***] = useState(null);
    const arrayColors = color.split(',');

    const findElementAndAddStyles = (elementClass, ***REMOVED***, ***REMOVED***) => {
        const elements = document.***REMOVED***(elementClass);
        elements.forEach((element) => {
            if (element.querySelector(***REMOVED***)) {
                element.classList.add(***REMOVED***);
            }
        });
    }

    useEffect(() => {
        if (scrollTarget) {
            const offsetTop = (scrollTarget as HTMLElement).getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }

        //  handles issues with older browsers that don't support the has() css selector
        // adds classes to the container to allow for styling
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion .accordion-post-ft-title', 'has-accordion-title');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion .accordion-post-vft-content', 'has-accordion-content')
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', 'blockquote', 'has-blockquote');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.vt-accordion-post-intro figure', 'has-vt-accordion-figure');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.content.active.accordion-post-content .wp-block-columns', 'has-wp-block-columns');
    }, [scrollTarget]);

    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        ***REMOVED***(newIndex);
        setActive(posts[index].slug);

        // Set the scroll target after updating the activeIndex
        if (newIndex !== -1) {
            ***REMOVED***(e.currentTarget);
        }
    };

    return (
        <Accordion fluid styled>
            {posts.map((post, index) => {
                const iconUrl = post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null;

                return (
                    <React.Fragment key={post.id}>
                        <Accordion.Title
                            active={activeIndex === index}
                            index={index}
                            onClick={handleClick}
                            style={{ ***REMOVED***: arrayColors[index] }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', ***REMOVED***: 'space-between', width: '100%' }}>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {iconUrl && (
                                        <MediaProvider id={iconUrl}>
                                            <MediaConsumer>
                                                <PostIcon className="icon" />
                                            </MediaConsumer>
                                        </MediaProvider>
                                    )}
                                    {!iconUrl && <***REMOVED*** post={post} />}
                                    <p className='accordion-post-ft-title' dangerouslySetInnerHTML={{ __html: post.title.rendered }} style={{ marginLeft: '10px' }} />
                                </div>
                                <Icon name="chevron down" />
                            </div>
                        </Accordion.Title>
                        <Accordion.Content className={"accordion-post-ft-content"} active={activeIndex === index}>
                            <PostContent post={post} />
                        </Accordion.Content>
                    </React.Fragment>
                );
            })}
        </Accordion>
    );
};

export interface ***REMOVED*** {
    "data-width": number,
    "data-height": number,
    "data-type": string,
    "data-taxonomy": string,
    "data-categories": string,
    "data-items": number,
    "data-color": string,
    "data-read-more-label": string,
    "data-use-scrolls": string,
    editing: boolean,
    parent: number,
    unique: number,
    intl: any
}


const Root = (props: ***REMOVED***) => {
    const [random, ***REMOVED***] = useState(Math.random() * (99999 - 1) + 1);
    const {
        "data-width": width,
        "data-height": height,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-color": color,
        "data-use-scrolls": useScrolls,
        "data-read-more-label": moreLabel = "READ More",
        editing,
        parent,
        unique
    } = props

    const locale = props.intl.locale;
    const scrollable = useScrolls == 'true'

    // Determine screen width and conditionally render components
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1250);
        };

        window.***REMOVED***("resize", handleResize);
        return () => window.***REMOVED***("resize", handleResize);
    }, []);

    return (
        <Container
            className={`viz featured tabs ${editing ? 'editing' : ''} ${scrollable ? 'scrollable' : ''}`}
            fluid={true}
        >
            <PostProvider
                locale={locale}
                type={type}
                taxonomy={taxonomy}
                categories={categories}
                store={`tabbedposts_${parent}_${unique}`}
                page={1}
                perPage={items}
            >
                <PostConsumer>
                    {isMobile ? (
                        <***REMOVED***
                            posts={items}
                            activeItem={items[0]?.slug}
                            color={color}
                            setActive={() => { }}
                        />
                    ) : (
                        <FeaturedTabs
                            moreLabel={moreLabel}
                            color={color}
                            width={width}
                            height={height}
                        />
                    )}
                </PostConsumer>
            </PostProvider>
        </Container>
    )
}


export default Root