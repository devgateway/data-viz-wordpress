export type Options = {
    label: string;
    value: string;
    labels?: Record<string, string>;
}

export interface Dimension {
    label:  string;
    labels: Record<string, any>;
    value:  string;
    type:   string;
    field:  string | null;
}

export interface FileContent {
    id:          string;
    createdDate: Date;
    name:        string;
    contentType: string;
    size:        number;
}


export interface Category {
    id:            number;
    type:          string;
    code:          string;
    value:         string;
    position:      number | null;
    parent:        string | null;
    fileContent?:   FileContent | null;
    labels:        Record<string, any>;
    descriptions:  Record<string, any>;
    categoryStyle: Record<string, any> | null;
    createdDate?:   Date;
    updatedDate?:   Date;
    delegate?:      string | null;
    aClass?:        string | null;
    enabled?:       boolean | null;
    param?:         string | null;
    field?:         string | null;
    fieldType?:     string | null;
}

export type Categories = {
    type: string;
    items: Category[];
}[]

export interface Measure {
    label:    string;
    labels:   Record<string, any>;
    value:    string;
    group:    Group;
    styles:   Styles;
    position: number;
    enabled:  boolean | null;
}

export interface Group {
    label:  string;
    labels: Record<string, any>;
}


export interface Styles {
    textColor:       string | null;
    ***REMOVED***: string | null;
    className:       string | null;
    color:           string;
}

export interface Filter {
    label:  string;
    labels: Record<string, any>;
    param:  string;
    type:   string;
    field:  string;
    // TODO: Check the value property in the API response since it is not there
    value:  string[];
}

export interface DgSettings {
    react_ui_url:          string;
    react_api_url:         string | null;
    apache_superset_url:   string | boolean | null;
    react_search_type:     string;
    react_menu_type:       string;
    languages:             Languages;
    landing_page_url:      string;
    google_analytics_code: string;
    name:                  string;
    description:           string;
    site_logo:             number;
    site_icon:             number;
}

export interface Languages {
    [key: string]: Language;
}

export interface Language {
    enable:          number;
    locale:          string;
    name:            string;
    translation:     string;
    date:            string;
    time:            string;
    flag:            string;
    wpseo_og_locale: string;
}

export interface Taxonomy {
    id:             number;
    name:           string;
    slug:           string;
    description:    string;
    types:          string[];
    hierarchical:   boolean;
    rest_base:      string;
    rest_namespace: string;
    _links:         Links;
}

export interface Links {
    collection: Collection[];
    "wp:items": Collection[];
    curies:     Cury[];
}

export interface Collection {
    href: string;
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}

export interface Taxonomies {
    [key: string]: Taxonomy;
};

export interface Wp_Types {
    description:     string;
    hierarchical:    boolean;
    has_archive:     boolean;
    name:            string;
    slug:            string;
    icon:            string;
    taxonomies:      string[];
    rest_base:       string;
    rest_namespace:  string;
    template:        any[];
    template_lock:   boolean;
    yoast_head:      string | null;
    yoast_head_json: Record<string, any> | null;
    _links:          Links;
}

export interface Links {
    collection: Collection[];
    "wp:items": Collection[];
    curies:     Cury[];
}

export interface Collection {
    href: string;
}

export interface ***REMOVED*** {
    applications: ***REMOVED***;
}

export interface ***REMOVED*** {
    versions__delta: string;
    apps__hashcode:  string;
    application:     Application[];
}


export interface Application {
    name:     string;
    instance: Instance[];
}

export interface Instance {
    instanceId:                    string;
    hostName:                      string;
    app:                           string;
    ipAddr:                        string;
    status:                        string;
    ***REMOVED***:              string;
    port:                          Port;
    securePort:                    Port;
    countryId:                     number;
    ***REMOVED***:                ***REMOVED***;
    leaseInfo:                     LeaseInfo;
    metadata:                      Metadata;
    homePageUrl:                   string;
    statusPageUrl:                 string;
    ***REMOVED***:                string;
    vipAddress:                    string;
    ***REMOVED***:              string;
    isCoordinatingDiscoveryServer: string;
    ***REMOVED***:          string;
    ***REMOVED***:            string;
    actionType:                    string;
}

export interface ***REMOVED*** {
    "@class": string;
    name:     string;
}

export interface LeaseInfo {
    renewalIntervalInSecs: number;
    ***REMOVED***:        number;
    registrationTimestamp: number;
    ***REMOVED***:  number;
    ***REMOVED***:     number;
    ***REMOVED***:    number;
}

export interface Metadata {
    "management.port": string;
    tetsim?:             string;
    label?:              string;
    "dataset.required"?: string;
    type?:               string;
}

export interface Port {
    $:          number;
    "@enabled": string;
}