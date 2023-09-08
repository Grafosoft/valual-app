export interface ParamsBanks {
    companyId:   number;
    companyName: string;
    description: string;
    types:       Type[];
}

export interface Type {
    id:   string;
    name: string;
}
