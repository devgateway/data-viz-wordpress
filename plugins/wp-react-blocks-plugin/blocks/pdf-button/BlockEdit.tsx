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
    InspectorControls,
    RichText,
    useBlockProps,
    // @ts-ignore
    __experimentalUseBorderProps as useBorderProps,
    // @ts-ignore
    __experimentalUseColorProps as useColorProps,
    // @ts-ignore
    __experimentalGetSpacingClassesAndStyles as useSpacingProps,
    // @ts-ignore
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { displayShortcut, isKeyboardEvent } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';
import { PdfButtonProps } from './types';

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

function ButtonEdit(props: PdfButtonProps) {
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

    function onToggleOpenInNewTab(value: boolean) {
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
        if (isKeyboardEvent.primary(event, 'k')) {
            startEditing(event);
        } else if (isKeyboardEvent.primaryShift(event, 'k')) {
            unlink();
            richTextRef.current?.focus();
        }
    }

    const borderProps = useBorderProps(attributes);
    const colorProps = useColorProps(attributes);
    const spacingProps = useSpacingProps(attributes);
    const ref = useRef();
    const richTextRef = useRef<HTMLElement>(null);
    const blockProps = useBlockProps({ ref, onKeyDown });

    const [isEditingURL, setIsEditingURL] = useState(false);
    const isURLSet = !!url;
    const opensInNewTab = linkTarget === '_blank';

    function startEditing(event) {
        event.preventDefault();
        setIsEditingURL(true);
    }

    function unlink() {
        setAttributes({
            url: undefined,
            linkTarget: undefined,
            rel: undefined,
        });
        setIsEditingURL(false);
    }

    useEffect(() => {
        if (!isSelected) {
            setIsEditingURL(false);
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
                        shortcut={displayShortcut.primary('k')}
                        onClick={startEditing}
                    />
                )}
                {isURLSet && (
                    <ToolbarButton
                        aria-label={__('Unlink', "dg")}
                        icon={linkOff}
                        title={__('Unlink', "dg")}
                        shortcut={displayShortcut.primaryShift('k')}
                        onClick={unlink}
                        isActive={true}
                    />
                )}
            </BlockControls>
            {isSelected && (isEditingURL || isURLSet) && (
                <Popover
                    position="bottom center"
                    onClose={() => {
                        setIsEditingURL(false);
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
                            opensInNewTab: newOpensInNewTab,
                        }) => {
                            setAttributes({ url: newURL });

                            if (opensInNewTab !== newOpensInNewTab) {
                                onToggleOpenInNewTab(newOpensInNewTab);
                            }
                        }}
                        onRemove={() => {
                            unlink();
                            richTextRef.current?.focus();
                        }}
                        forceIsEditingLink={isEditingURL}
                    />
                </Popover>
            )}
            <InspectorControls>
                <WidthPanel
                    selectedWidth={width}
                    setAttributes={setAttributes}
                />
            </InspectorControls>
            <InspectorControls group="advanced">
                <TextControl
                    label={__('Link rel', "dg")}
                    value={rel || ''}
                    onChange={onSetLinkRel}
                />
            </InspectorControls>
        </>
    );
}

export default ButtonEdit;