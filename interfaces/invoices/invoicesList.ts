export interface InvoicesList {
    id:            number;
    number:        number;
    date:          Date;
    dueDate:       Date;
    createDate:    string;
    status:        string;
    observations:  string;
    document:      Document;
    contact:       Contact;
    numeration:    Numeration;
    paymentMethod: PaymentMethod;
    currency:      Currency;
    totalAmount:   number;
    taxAmount:     number;
}

export interface Contact {
    id:             number;
    identification: string;
    name:           string;
}

export interface Currency {
    id:       string;
    code:     string;
    baseRate: number;
}

export interface Document {
    id:   number;
    code: string;
    name: string;
}

export interface Numeration {
    id:           number;
    name:         string;
    resolution:   string;
    prefix:       string;
    isElectronic: boolean;
}

export interface PaymentMethod {
    id:   number;
    name: string;
}
