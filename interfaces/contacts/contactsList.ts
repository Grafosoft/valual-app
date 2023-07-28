export interface ContactsList {
    id:                 number;
    type:               string;
    identification:     string;
    commercialName:     string;
    firstName:          null;
    middleName:         null;
    firstSurname:       null;
    secondSurname:      null;
    email:              string;
    phone:              string;
    adress:             null;
    observations:       null;
    isActive:           boolean;
    identificationType: IdentificationType;
    city:               City;
    tax:                Tax;
}

export interface City {
    name: string;
}

export interface IdentificationType {
    code: string;
}

export interface Tax {
    person:         string;
    regime:         null;
    responsibility: null;
}
