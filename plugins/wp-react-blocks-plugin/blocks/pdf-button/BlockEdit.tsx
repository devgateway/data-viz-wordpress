import React from 'react';
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, useState, useRef } from '@wordpress/element';
import {
    Button,
    ButtonGroup,
    PanelBody,
    TextControl,
    ToolbarButton,
    Popover,
} from '@wordpress/components';
import {
    BlockControls,
    ***REMOVED***,
    RichText,
    useBlockProps,
    // @ts-ignore
    __experimentalUseBorderProps as ***REMOVED***,
    // @ts-ignore
    __experimentalUseColorProps as useColorProps,
    // @ts-ignore
    __experimentalGetSpacingClassesAndStyles as ***REMOVED***,
    // @ts-ignore
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { ***REMOVED***, ***REMOVED*** } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';
import { ***REMOVED*** } from './types';

const NEW_TAB_REL = 'noreferrer noopener';

function WidthPanel({ selectedWidth, setAttributes }: { selectedWidth: number, setAttributes: (attributes: { width: number }) => void }) {
    function handleChange(newWidth: number) {
        // Check if we are toggling the width off
        const width = selectedWidth === newWidth ? undefined : newWidth;

        // Update attributes
        if (width !== undefined) {
            setAttributes({ width });
        }
    }

    return (
        <PanelBody title={__('Width settings', "dg")}>
            <ButtonGroup aria-label={__('Button width', "dg")}>
                {[25, 50, 75, 100].map((widthValue) => {
                    return (
                        <Button
                            key={widthValue}
                            isSmall
                            isPrimary={widthValue === selectedWidth}
                            onClick={() => handleChange(widthValue)}
                        >
                            {widthValue}%
                        </Button>
                    );
                })}
            </ButtonGroup>
        </PanelBody>
    );
}

function ButtonEdit(props: ***REMOVED***) {
    const {
        attributes,
        setAttributes,
        className,
        isSelected,
        onReplace,
        mergeBlocks,
    } = props;
    const {
        linkTarget,
        placeholder,
        rel,
        style,
        text,
        url,
        width,
    } = attributes;
    const onSetLinkRel = useCallback(
        (value: string) => {
            setAttributes({ rel: value });
        },
        [setAttributes]
    );

    function ***REMOVED***(value: boolean) {
        const newLinkTarget = value ? '_blank' : undefined;

        let updatedRel: string | undefined = rel;
        if (newLinkTarget && !rel) {
            updatedRel = NEW_TAB_REL;
        } else if (!newLinkTarget && rel === NEW_TAB_REL) {
            updatedRel = undefined;
        }

        setAttributes({
            linkTarget: newLinkTarget,
            rel: updatedRel,
        });
    }

    function setButtonText(newText: string) {
        // Remove anchor tags from button text content.
        setAttributes({ text: newText.replace(/<\/?a[^>]*>/g, '') });
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (***REMOVED***.primary(event, 'k')) {
            startEditing(event);
        } else if (***REMOVED***.primaryShift(event, 'k')) {
            unlink();
            richTextRef.current?.focus();
        }
    }

    const borderProps = ***REMOVED***(attributes);
    const colorProps = useColorProps(attributes);
    const spacingProps = ***REMOVED***(attributes);
    const ref = useRef();
    const richTextRef = useRef<HTMLElement>(null);
    const blockProps = useBlockProps({ ref, onKeyDown });

    const [isEditingURL, ***REMOVED***] = useState(false);
    const isURLSet = !!url;
    const opensInNewTab = linkTarget === '_blank';

    function startEditing(event) {
        event.***REMOVED***();
        ***REMOVED***(true);
    }

    function unlink() {
        setAttributes({
            url: undefined,
            linkTarget: undefined,
            rel: undefined,
        });
        ***REMOVED***(false);
    }

    useEffect(() => {
        if (!isSelected) {
            ***REMOVED***(false);
        }
    }, [isSelected]);

    return (
        <>
            <div
                {...blockProps}
                className={classnames(blockProps.className, {
                    [`has-custom-width wp-block-button__width-${width}`]: width,
                    [`has-custom-font-size`]: blockProps.style.fontSize,
                })}
            >
                <RichText
                    ref={richTextRef as React.RefObject<any>}
                    aria-label={__('Button text', "dg")}
                    placeholder={placeholder || __('Add text…', "dg")}
                    value={text}
                    onChange={(value) => setButtonText(value)}
                    className={classnames(
                        className,
                        'wp-block-button__link',
                        colorProps.className,
                        borderProps.className,
                        {
                            // For backwards compatibility add style that isn't
                            // provided via block support.
                            // @ts-ignore
                            'no-border-radius': style?.border?.radius === 0,
                        }
                    )}
                    style={{
                        ...borderProps.style,
                        ...colorProps.style,
                        ...spacingProps.style,
                    }}
                    onSplit={(value) =>
                        createBlock('core/button', {
                            ...attributes,
                            text: value,
                        })
                    }
                    onReplace={onReplace}
                    onMerge={mergeBlocks}
                    identifier="text"
                />
            </div>
            <BlockControls group="block">
                {!isURLSet && (
                    <ToolbarButton
                        aria-label={__('Link', "dg")}
                        icon={link}
                        title={__('Link', "dg")}
                        shortcut={***REMOVED***.primary('k')}
                        onClick={startEditing}
                    />
                )}
                {isURLSet && (
                    <ToolbarButton
                        aria-label={__('Unlink', "dg")}
                        icon={linkOff}
                        title={__('Unlink', "dg")}
                        shortcut={***REMOVED***.primaryShift('k')}
                        onClick={unlink}
                        isActive={true}
                    />
                )}
            </BlockControls>
            {isSelected && (isEditingURL || isURLSet) && (
                <Popover
                    position="bottom center"
                    onClose={() => {
                        ***REMOVED***(false);
                        richTextRef.current?.focus();
                    }}
                    anchorRef={ref?.current}
                    focusOnMount={isEditingURL ? 'firstElement' : false}
                >
                    <LinkControl
                        className="wp-block-navigation-link__inline-link-input"
                        value={{ url, opensInNewTab }}
                        onChange={({
                            url: newURL = '',
                            opensInNewTab: ***REMOVED***,
                        }) => {
                            setAttributes({ url: newURL });

                            if (opensInNewTab !== ***REMOVED***) {
                                ***REMOVED***(***REMOVED***);
                            }
                        }}
                        onRemove={() => {
                            unlink();
                            richTextRef.current?.focus();
                        }}
                        ***REMOVED***={isEditingURL}
                    />
                </Popover>
            )}
            <***REMOVED***>
                <WidthPanel
                    selectedWidth={width}
                    setAttributes={setAttributes}
                />
            </***REMOVED***>
            <***REMOVED*** group="advanced">
                <TextControl
                    label={__('Link rel', "dg")}
                    value={rel || ''}
                    onChange={onSetLinkRel}
                />
            </***REMOVED***>
        </>
    );
}

export default ButtonEdit;