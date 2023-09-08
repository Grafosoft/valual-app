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
    technicalKey:  string;
    status:        string;
    type:          Type;
    software:      Software;
}

export interface Software {
    id:             number;
    name:           string;
    identification: string;
    pinCode:        string;
    TestId:         string;
}

export interface Type {
    id:   number;
    name: string;
}
