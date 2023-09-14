export interface ContactsList {
    id:                 number;
    type:               string;
    identification:     string;
    commercialName:     string;
    firstName:          string;
    middleName:         string;
    firstSurname:       string;
    secondSurname:      string;
    email:              string;
    phone:              string;
    adress:             string;
    observations:       string;
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
    regime:         string;
    responsibility: string;
}
