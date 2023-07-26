export interface ItemsList {
    id:          number;
    name:        string;
    code:        string;
    barcode:     string;
    wooCode:     number;
    salePrice:   number;
    costPrice:   number;
    image:       null;
    isInventory: boolean;
    isAiu:       boolean;
    isActive:    boolean;
    group:       Group;
    tax:         Tax;
}

export interface Group {
    id:   number;
    name: string;
}

export interface Tax {
    id:    number;
    name:  string;
    value: number;
}
