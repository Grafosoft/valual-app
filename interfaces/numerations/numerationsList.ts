export interface NumerationsList {
    id:            number;
    name:          string;
    date:          Date;
    authorization: string;
    startDate:     Date;
    dueDate:       Date;
    prefix:        string;
    fromNumber:    number;
    toNumber:      number;
    startNumber:   number;
    currentNumber: number;
    status:        string;
    type:          Software;
    software:      Software;
}

export interface Software {
    id:   number;
    name: string;
}
