export interface InvoicesDetailsList {
    id:                 number;
    number:             number;
    date:               Date;
    dueDate:            Date;
    createDate:         string;
    reference:          string;
    status:             string;
    observations:       string;
    company:            Company;
    contact:            Company;
    numeration:         Numeration;
    document:           Document;
    warehouse:          Accounting;
    paymentMethod:      PaymentMethod;
    currency:           Currency;
    seller:             Accounting;
    accounting:         Accounting;
    response:           Response;
    totalAmount:        number;
    discountAmount:     number;
    taxAmount:          number;
    paymentAmount:      number;
    retentionAmount:    number;
    retentionicaAmount: number;
    retentionivaAmount: number;
    prepaidAmount:      number;
    items:              ItemElement[];
    attachments:        Attachment[];
}

export interface Accounting {
    id:   number;
    name: string;
}
export interface Attachment {
    id:        number;
    date:      Date;
    name:      string;
    size:      number;
    extension: string;
    url:       string;
}

export interface Company {
    id:              number;
    name:            string;
    email:           string;
    identification?: string;
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

export interface ItemElement {
    id:             number;
    quantity:       number;
    value:          number;
    price:          number;
    prepaid:        number;
    discount:       number;
    description:    string;
    parentId:       number;
    isRemission:    boolean;
    discountAmount: number;
    totalAmount:    number;
    item:           ItemItem;
    tax:            Tax;
    retention:      Retention;
    attorney:       Accounting;
}

export interface ItemItem {
    id:   number;
    code: number;
    name: string;
}

export interface Retention {
    percentage:    number;
    percentageIca: number;
    percentageIva: number;
}

export interface Tax {
    id:         number;
    name:       string;
    value:      number;
    percentage: number;
}

export interface Numeration {
    id:           number;
    name:         string;
    resolution:   string;
    prefix:       string;
    isElectronic: boolean;
}

export interface PaymentMethod {
    id:   string;
    name: string;
}

export interface Response {
    id:      number;
    message: string;
    date:    string;
    pdfUrl:  string;
    xmlUrl:  string;
    cufe:    string;
    user:    string;
}
