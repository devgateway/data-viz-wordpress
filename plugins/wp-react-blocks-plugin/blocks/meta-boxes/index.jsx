import { ***REMOVED*** } from "@wordpress/blocks";
import { TextControl } from "@wordpress/components";
import { useEntityProp, ***REMOVED*** } from "@wordpress/core-data";
import { useBlockProps } from "@wordpress/block-editor";
import { useDispatch, useSelect } from "@wordpress/data";

***REMOVED***("myguten/meta-block", {
  title: "Meta Block",
  edit: ({ setAttributes, attributes }) => {
    const blockProps = useBlockProps();
    const postType = useSelect(
      (select) => select("core/editor").***REMOVED***(),
      []
    );

    const properties = useSelect(
      (select) => select("core/editor").getEditedPostAttribute("meta"),
      []
    );
    const { editPost } = useDispatch("core/editor");
    const [meta, setMeta] = useEntityProp("postType", postType, "meta");
    const ***REMOVED*** = meta["myguten_meta_block_field"];
    const ***REMOVED*** = (newValue) => {
      editPost({ meta: { ...meta, myguten_meta_block_field: newValue } });
      //setMeta( { ...meta, myguten_meta_block_field: newValue } );
    };

    return (
      <div {...blockProps}>
        <TextControl
          label="Meta Block Field"
          value={***REMOVED***}
          onChange={***REMOVED***}
        />
      </div>
    );
  },

  // No information saved to the block.
  // Data is saved to post meta via the hook.
  save: () => {
    return null;
  },
});
