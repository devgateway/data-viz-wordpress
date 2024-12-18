import {
  PanelRow,
  SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const Labels = (props) => {
  const {
    setAttributes,
    attributes: {
      ***REMOVED***,
      ***REMOVED***,
      type,
    },
  } = props;

  return [
    <>
      {type == "bar" && (
        <PanelRow>
          <SelectControl
            label={__("Bar Label Position", "dg")}
            value={[***REMOVED***]}
            onChange={(***REMOVED***) => {
              setAttributes({ ***REMOVED***: ***REMOVED*** });
            }}
            options={[
              { label: __("Top", "dg"), value: "top" },
              { label: __("Middle", "dg"), value: "middle" },
              { label: __("None", "dg"), value: "none" },
            ]}
            style={{ width: "120px" }}
          />
        </PanelRow>
      )}

      {type == "line" && (
        <PanelRow>
          <SelectControl
            label={__("Line Label Position", "dg")}
            value={[***REMOVED***]}
            onChange={(position) => {
              setAttributes({ ***REMOVED***: position });
            }}
            options={[
              { label: __("On Top", "dg"), value: "top" },
              { label: __("None", "dg"), value: "none" },
            ]}
            style={{ width: "120px" }}
          />
        </PanelRow>
      )}
    </>,
  ];
};

export default Labels;
