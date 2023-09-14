export interface CompaniesDetailsList {
    id:                 number;
    name:               string;
    identification:     string;
    adress:             string;
    city:               Activity;
    department:         string;
    phone:              string;
    email:              string;
    commercialCode:     string;
    image:              string;
    identificationType: Activity;
    tax:                Tax;
    activity:           Activity;
    invoice:            Invoice;
}

export interface Activity {
    id:   number;
    code: string;
    name: string;
}

export interface Invoice {
    terms:             string;
    notificationEmail: string;
    contact:           Contact;
}

export interface Contact {
    id:   number;
    name: string;
}

export interface Tax {
    person:         string;
    regime:         string;
    responsibility: string;
}
