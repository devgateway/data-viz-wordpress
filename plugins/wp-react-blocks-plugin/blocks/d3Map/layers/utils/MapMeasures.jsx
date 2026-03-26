import {__} from '@wordpress/i18n';
import {CheckboxControl, PanelBody, PanelRow, SelectControl, ToggleControl, TextControl} from '@wordpress/components';

import Format from '../../../charts/Format.jsx'
import {togglePanel} from '@devgateway/dvz-wp-commons';
import {getTranslation} from '@devgateway/dvz-wp-commons';

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"

}

const Measures = (props) => {
    const {
        onMeasuresChange,
        onFormatChange,
        onSetSingleMeasure,
        allMeasures,
        setAttributes,
        panelStatus,
        layer: {
            measures,
            app,
            format,
            customMeasuresLabels = {}
        },
        attributes: {
            enableMeasureSelector = false,
            measureSelectorLabel = 'Measure',
            defaultMeasure = '',
        } = {}
    } = props

    const allowMultipleSelection = enableMeasureSelector === true
    const selectedMeasureOptions = (measures || []).map(measureValue => {
        const measure = allMeasures?.find(m => m.value === measureValue)
        const customLabel = customMeasuresLabels?.[measureValue]
        return {
            value: measureValue,
            label: (customLabel && customLabel.toString().trim().length > 0)
                ? customLabel
                : (measure ? getTranslation(measure) : measureValue)
        }
    })
    const selectedDefaultMeasure = selectedMeasureOptions.some(option => option.value === defaultMeasure)
        ? defaultMeasure
        : ''
    const defaultMeasureOptions = [
        {value: '', label: __('First selected measure')},
        ...selectedMeasureOptions
    ]

    const MToggle = ({measure}) => {
        return <ToggleControl
            label={getTranslation(measure)}
            checked={measures.indexOf(measure.value) > -1}
            onChange={() => onMeasuresChange(measure.value)} />
    }

    const MCheckbox = ({measure}) => {

        return <CheckboxControl
            label={getTranslation(measure)}
            checked={measures.indexOf(measure.value) > -1}
            onChange={() => onSetSingleMeasure(measure.value)}/>
    }


    const countSelected = (g) => {
        const groupMeasures = allMeasures.filter(m => m.group.label === g).map(m => m.value)
        if (groupMeasures.length > 0) {
            return groupMeasures.filter(m => measures.includes(m)).length
        }
        return 0
    }

    return <PanelBody initialOpen={false} title={__("Measures")}>
        {allMeasures && [...new Set(allMeasures.map(p => getTranslation(p.group)))].map(g => {
            return (<PanelBody
                initialOpen={false}
                onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                title={`${g} (${countSelected(g)} / ${allMeasures.filter(f => f.group.label === g).length} ) `}>
                {allMeasures.filter(f => getTranslation(f.group) === g)
                    .map(m => <PanelRow>
                        <PanelRow>
                            {allowMultipleSelection
                                ? <MToggle measure={m}></MToggle>
                                : <MCheckbox measure={m}></MCheckbox>}
                        </PanelRow>
                    </PanelRow>)}
            </PanelBody>)
        })}

        <PanelRow>
            <ToggleControl
                label={__('Show Measure Selector')}
                help={__('Allow selecting multiple measures and show a selector above the map when compatible layers share measures.')}
                checked={enableMeasureSelector === true}
                onChange={(value) => setAttributes({enableMeasureSelector: value})}
            />
        </PanelRow>

        {enableMeasureSelector === true && <>
            <PanelRow>
                <TextControl
                    label={__('Measure Selector Label')}
                    value={measureSelectorLabel}
                    onChange={(value) => setAttributes({measureSelectorLabel: value})}
                />
            </PanelRow>
            <PanelRow>
                <SelectControl
                    label={__('Default Measure')}
                    value={selectedDefaultMeasure}
                    options={defaultMeasureOptions}
                    onChange={(value) => setAttributes({defaultMeasure: value})}
                    help={selectedMeasureOptions.length > 0
                        ? __('Select the measure shown by default when the selector is enabled.')
                        : __('Select one or more measures in this layer to define the selector options.')}
                />
            </PanelRow>
        </>}

        <Format
            format={format ? format : defaultFormat}
            hiddenCustomAxisFormat={true}
            onFormatChange={format => {
                onFormatChange(format)
            }}>
        </Format>

    </PanelBody>
}


export default Measures