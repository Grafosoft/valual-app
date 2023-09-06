export interface ContactsDetailsList {
    id:                     number;
    type:                   string;
    identification:         string;
    commercialName:         string;
    firstName:              string;
    middleName:             string;
    firstSurname:           string;
    secondSurname:          string;
    email:                  string;
    phone:                  string;
    adress:                 string;
    observations:           string;
    commercialCode:         string;
    birthDate:              Date;
    createDate:             string;
    postalCode:             string;
    comissionSeller:        number;
    isSeller:               boolean;
    isTaxResident:          boolean;
    isBirthdayNotification: boolean;
    isActive:               boolean;
    identificationType:     Activity;
    city:                   Activity;
    tax:                    Tax;
    activity:               Activity;
    bank:                   Bank;
    priceList:              PriceList;
    media:                  Media;
    communicationMethod:    CommunicationMethod;
    communication:          Communication;
    contacts:               Contact[];
    attachments:            any[];
}

export interface Activity {
    id:       number;
    code:     string;
    name:     string;
    country?: string;
}
export interface Attachment {
    id:        number;
    date:      Date;
    name:      string;
    size:      number;
    extension: string;
    url:       string;
}

export interface Bank {
    name:    string;
    type:    string;
    account: string;
}

export interface Communication {
    whatsapp: string;
}
export interface CommunicationMethod {
    id:   string;
    name: string;
}

export interface Contact {
    id:           number;
    name:         string;
    rol:          string;
    phone:        string;
    email:        string;
    observations: string;
}

export interface Media {
    website:   string;
    linkedin:  string;
    facebook:  string;
    instagram: string;
}

export interface PriceList {
    id:   number;
    name: string;
}

export interface Tax {
    person:         string;
    regime:         string;
    responsibility: string;
}
