export interface ParamsNumerations {
    companyId:   number;
    companyName: string;
    description: string;
    status:      Status[];
    types:       Software[];
    softwares:   Software[];
}

export interface Software {
    id:   number;
    name: string;
}

export interface Status {
    id:   string;
    name: string;
}
