import { ComponentWithSettingsState, Menu } from "@dg-data-viz/wp-commons";
import { BlockEditProps } from "@wordpress/blocks";

export interface MenuAttributes {
    app: string;
    label: string;
    group: string;
    measuresGroups: any;
    height: number;
    icon: string | null;
    name: string;
    showIcons: boolean;
    showLabels: boolean;
    icon_media_id: number | null;
}

export interface MenuBlockProps extends BlockEditProps<MenuAttributes> {
    isSelected: boolean;
    app: string;
    attributes: MenuAttributes;
    toggleSelection: (active: boolean) => void;
    setAttributes: (attributes: Partial<MenuAttributes>) => void;
}

export interface MenuBlockState extends ComponentWithSettingsState {
    menus: {label: string, value: string}[];
}
