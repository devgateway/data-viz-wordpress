import {__} from '@wordpress/i18n';
import {useState} from "@wordpress/element";
import {
    ***REMOVED***,
    insertObject,
    ***REMOVED***,
    removeFormat,
    slice,
    useAnchorRef
} from '@wordpress/rich-text';
import {RichTextToolbarButton} from '@wordpress/block-editor';
import {speak} from '@wordpress/a11y';
import {info as linkIcon} from '@wordpress/icons';
import {Button, Modal, Panel, PanelBody, PanelRow, Popover, ***REMOVED***} from '@wordpress/components';

const name = process.env.BLOCKS_NS + '/info-tooltip';
const reference = {
    name,
    object: true,
    title: __('Info Tooltip'),
    tagName: 'input',
    className: "wp-info-tooltip",
    attributes: {
        className: 'class',
        style: 'style',
        "data-description": "data-description",
        "data-component": "data-component",
    },
    edit
};

const PopUI = ({onClose, onCancel}) => {
    const [text, setText] = useState("")
    return <Modal title={__("Reference")} ***REMOVED***={e => onCancel()}>
        <***REMOVED***
            label={__("Description")}
            value={***REMOVED***(text)}
            onChange={(value) => setText(***REMOVED***(value))}
        />

        <Button isPrimary onClick={e => onClose(text)}>
            {__("Done")}
        </Button>
    </Modal>

}

function InlineUI({value, onChange, activeObjectAttributes, contentRef, onClose}) {


    const [content, setContent] = useState(activeObjectAttributes["data-description"]);

    const anchorRef = useAnchorRef({
        ref: contentRef,
        value,
        settings: reference,
    });

    return (
        <Popover
            position="bottom center"
            focusOnMount={false}
            anchorRef={anchorRef}
        >
            <Panel>
                <PanelBody>
                    <form
                        style={{"width": "300px"}}
                        onSubmit={(event) => {
                            const ***REMOVED*** = value.replacements.slice();
                            ***REMOVED***[value.start] = {
                                type: name,
                                attributes: {
                                    ...activeObjectAttributes,
                                    "data-description": content,
                                    "data-component": "tooltip",
                                },
                            };

                            onChange({
                                ...value,
                                replacements: ***REMOVED***,
                            });
                            onClose()
                            event.***REMOVED***();
                        }}
                    >
                        <PanelRow>

                            <***REMOVED***
                                rows={5}
                                label={__("Description")}
                                value={***REMOVED*** (content)}
                                onChange={(content) => setContent(content)}
                            />
                        </PanelRow>
                        <PanelRow>

                            <Button
                                label={__('Update')}
                                type="submit"
                                isPrimary
                            >{__('Update')}</Button>
                        </PanelRow>

                    </form>
                </PanelBody>
            </Panel>

        </Popover>
    );
}

function edit(props) {
    const {
        ***REMOVED***,
        isActive,
        activeObjectAttributes,
        ***REMOVED***,
        value,
        onChange,
        onFocus,
        contentRef
    } = props

    const anchorRef = useAnchorRef({
        ref: contentRef,
        value,
        settings: {},
    });

    const [isModalOpen, ***REMOVED***] = useState(false);
    const [showInline, setShowInline] = useState(true);

    function openModal() {
        ***REMOVED***(true);
    }

    function closeModal(referenceText) {

        
        const text = ***REMOVED***(slice(value));
        const obj = insertObject(value, {
            type: name,
            attributes: {
                "className": `wp-info tcdi-component ignore`,
                "data-component": "tooltip",
                "data-description": referenceText ? referenceText : "",
            },
        })

        onChange(
            obj
        );


        ***REMOVED***(false);
    }

    function onCancel() {
        ***REMOVED***(false);
    }

    function ***REMOVED***() {
        onChange(removeFormat(value, name));
        speak(__('Link removed.'), 'assertive');
    }


    return (
        <>
            <RichTextToolbarButton
                icon={linkIcon}
                title={__('Tooltip')}
                isActive={isActive}
                onClick={openModal}
                isActive={***REMOVED***}
                shortcutType="primaryShift"
                ***REMOVED***="t"/>
            {isModalOpen && <PopUI value={value} onCancel={onCancel} onClose={closeModal}/>}
            {***REMOVED*** && <InlineUI value={value}
                                         onClose={e => {
                                             setShowInline(false)
                                         }}
                                         onChange={onChange}
                                         activeObjectAttributes={activeObjectAttributes}
                                         contentRef={contentRef}></InlineUI>}


        </>
    );
}

***REMOVED***(name, reference);
