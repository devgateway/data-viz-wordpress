import {PanelRow, SelectControl, ToggleControl, PanelBody} from '@wordpress/components';
import {__} from '@wordpress/i18n';

const sequentialColors = [{value: "blues", label: 'blues'}, {value: "greens", label: 'greens'}, {
    value: "greys", label: 'greys'
}, {value: "oranges", label: 'oranges'}, {value: "purples", label: 'purples'}, {
    value: "reds", label: 'reds'
}, {value: "blue_green", label: 'blue_green'}, {value: "blue_purple", label: 'blue_purple'}, {
    value: "green_blue", label: 'green_blue'
}, {value: "orange_red", label: 'orange_red'}, {
    value: "purple_blue_green", label: 'purple_blue_green'
}, {value: "purple_blue", label: 'purple_blue'}, {value: "purple_red", label: 'purple_red'}, {
    value: "red_purple", label: 'red_purple'
}, {value: "yellow_green_blue", label: 'yellow_green_blue'}, {
    value: "yellow_green", label: 'yellow_green'
}, {value: "yellow_orange_brown", label: 'yellow_orange_brown'}, {
    value: "yellow_orange_red", label: 'yellow_orange_red'
}]

const GradientGenerator = (props) => {
    const {
        onChangeProperty, gradientScheme, gradientReverse
    } = props;

    return <PanelBody>
            <PanelRow>
                <ToggleControl
                    label="Reverse Gradient"
                    checked={gradientReverse}
                    onChange={e => {
                        onChangeProperty("gradientReverse", !gradientReverse)}}
                />
                </PanelRow>
            <PanelRow>
            <SelectControl
                label={__('Gradient Color Scheme')}
                value={gradientScheme}
                onChange={(value) => {
                    onChangeProperty("gradientScheme", value)
                }}
                options={sequentialColors}
            />
        </PanelRow>
    </PanelBody>
}

export default GradientGenerator