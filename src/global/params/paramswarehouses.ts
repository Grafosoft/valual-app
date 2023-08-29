export interface ParamsWarehouses {
    companyId:   number;
    companyName: string;
    description: string;
    pricelists:  Pricelist[];
}

export interface Pricelist {
    id:   number;
    name: string;
}
