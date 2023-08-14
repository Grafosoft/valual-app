export interface WarehouseList {
    id:        number;
    name:      string;
    priceList: PriceList;
}

export interface PriceList {
    id:   number;
    name: string;
}
