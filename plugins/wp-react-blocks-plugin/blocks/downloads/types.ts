export interface DownloadsAttributes {
    color: string | null;
    type: string;
    height: number;
    checkPng: boolean;
    checkJpg: boolean;
    buttonLabel: string;
    defaultFormat: string;
    pngLabel: string;
    jpgLabel: string;
    pngText: string;
    jpgText: string;
    title: string;
    useTitle: boolean;
    sectionTitle: string;
    style: string;
    fontSize: string;
    fontClass: string;
    tooltip: string;
    downloadTooltip: string;
    includeSourceURL: boolean;
    sourceURLMarginLeft: number;
    sourceURLMarginTop: number;
    sourceURLFontSize: number;
}

export interface DownloadsProps {
    isSelected: boolean;
    className: string;
    fontSizes: {id: string, size: string, slug: string}[];
    toggleSelection: (selected: boolean) => void;
    setAttributes: (attributes: Partial<DownloadsAttributes>) => void;
    attributes: DownloadsAttributes;
}