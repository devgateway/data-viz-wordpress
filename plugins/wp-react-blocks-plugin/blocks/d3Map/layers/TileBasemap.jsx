import { PanelBody, PanelRow, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Tile source options mirrored from TileBasemapLayer.jsx in dvz-ui.
 * Keep these in sync with TILE_SOURCES in TileBasemapLayer.jsx.
 */
const TILE_SOURCE_OPTIONS = [
    { label: __('OpenStreetMap', 'dg'), value: 'osm' },
    { label: __('Carto Positron (Light)', 'dg'), value: 'carto-light' },
    { label: __('Carto Dark Matter', 'dg'), value: 'carto-dark' },
    { label: __('Carto Voyager', 'dg'), value: 'carto-voyager' },
    { label: __('Stadia Alidade Smooth', 'dg'), value: 'stadia-alidade-smooth' },
    { label: __('Stadia Alidade Smooth Dark', 'dg'), value: 'stadia-alidade-smooth-dark' },
    { label: __('Stadia OSM Bright', 'dg'), value: 'stadia-osm-bright' },
    { label: __('Stadia Outdoors', 'dg'), value: 'stadia-outdoors' },
    { label: __('ESRI World Imagery (Satellite)', 'dg'), value: 'esri-world-imagery' },
    { label: __('ESRI World Topo Map', 'dg'), value: 'esri-topo' },
];

/**
 * TileBasemapLayer editor panel.
 *
 * Props:
 *   - layer: the layer object
 *   - onChangeProperty: (attr, value) => void
 */
const TileBasemapLayer = ({ layer, onChangeProperty }) => {
    const {
        tileSource = 'carto-light',
        tileOpacity = 1,
        visible = true,
    } = layer;

    return (
        <PanelBody title={__('Tile Basemap Settings', 'dg')} initialOpen={true}>
            <PanelRow>
                <SelectControl
                    label={__('Tile Source', 'dg')}
                    help={__(
                        'Choose the basemap tile layer. Sources use OpenMapTiles-compatible XYZ tiles.',
                        'dg'
                    )}
                    value={tileSource}
                    options={TILE_SOURCE_OPTIONS}
                    onChange={(value) => onChangeProperty('tileSource', value)}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Opacity', 'dg')}
                    help={__('Tile layer opacity (0 = transparent, 1 = opaque)', 'dg')}
                    value={tileOpacity}
                    onChange={(value) => onChangeProperty('tileOpacity', value)}
                    min={0}
                    max={1}
                    step={0.05}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__('Visible', 'dg')}
                    help={__('Show or hide this tile basemap layer', 'dg')}
                    checked={visible}
                    onChange={() => onChangeProperty('visible', !visible)}
                />
            </PanelRow>
        </PanelBody>
    );
};

export default TileBasemapLayer;

