import {PanelBody, PanelRow, SelectControl, TextControl, ToggleControl} from "@wordpress/components";

const Property = ({features, ***REMOVED***, value, property, title, type = 'toggle'}) => {

    const properties = features && features.length > 0 ? features[0].properties : {}
    let attributes = Object.keys(properties)
    if (type == "toggle") {
        return (<PanelBody initialOpen={"close"} title={title}>

            <PanelRow>
                <ToggleControl
                    label={"None"}
                    checked={value == "none"}
                    onChange={(value) => {
                        ***REMOVED***(property, "none")
                    }}/>
            </PanelRow>
            {attributes.map(k => {
                return <PanelRow>
                    <ToggleControl
                        label={k}
                        checked={value == k}
                        onChange={(value) => {
                            ***REMOVED***(property, value ? k : "none")
                        }}
                    >

                    </ToggleControl>
                </PanelRow>
            })}

        </PanelBody>)
    } else {
        return <PanelRow>
            <SelectControl
                label={title}
                value={[value]}
                onChange={(value) => {
                    ***REMOVED***(property, value)
                }}
                options={[{label: "None", value: 'none'}, ...attributes.map(k => ({label: k, value: k}))]}>
            </SelectControl>
        </PanelRow>
    }
}

export default Property