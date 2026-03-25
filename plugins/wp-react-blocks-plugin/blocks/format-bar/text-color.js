import { __ } from '@wordpress/i18n';
import { registerFormatType, applyFormat, removeFormat, useAnchorRef } from '@wordpress/rich-text';
import { RichTextToolbarButton, ColorPalette } from '@wordpress/block-editor';
import { Popover, Panel, PanelBody, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { tag as tagIcon } from '@wordpress/icons';
import { BLOCK_NS } from '@devgateway/dvz-wp-commons'

const name = BLOCK_NS + '/text-color';

function Edit(props) {
  const { isActive, value, onChange, contentRef } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(undefined);

  const anchorRef = useAnchorRef({
    ref: contentRef,
    value,
    settings: {},
  });

  const applyColor = (nextColor) => {
    if (!nextColor) return;
    onChange(
      applyFormat(value, {
        type: name,
        attributes: { style: `color: ${nextColor}` },
      })
    );
    setIsOpen(false);
    setColor(nextColor);
  };

  const clearColor = () => {
    onChange(removeFormat(value, name));
    setIsOpen(false);
    setColor(undefined);
  };

  return (
    <>
      <RichTextToolbarButton
        icon={tagIcon}
        title={__('Text Color')}
        isActive={isActive}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <Popover position="bottom center" focusOnMount={false} anchorRef={anchorRef}>
          <Panel>
            <PanelBody>
              <div style={{ padding: '8px', minWidth: 220 }}>
                <ColorPalette
                  value={color}
                  onChange={(c) => applyColor(c)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                  <Button onClick={clearColor} variant="secondary">
                    {__('Clear')}
                  </Button>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </Popover>
      )}
    </>
  );
}

registerFormatType(name, {
  name,
  title: __('Text Color'),
  tagName: 'span',
  className: 'has-inline-color',
  attributes: { style: 'style' },
  edit: Edit,
});
