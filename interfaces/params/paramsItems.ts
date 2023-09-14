export interface ParamsItems {
    companyId:   number;
    companyName: string;
    description: string;
    groups:      Group[];
    taxes:       Tax[];
    folders:     Folder[];
}

export interface Group {
    id:   number;
    name: null | string;
}
export interface Tax {
    id:   number;
    name: null | string;
}
export interface Folder {
    id:   number;
    name: null | string;
}