export interface ParamsContacts {
    companyId:           number;
    companyName:         string;
    description:         string;
    types:               AccountType[];
    identificationTypes: IdentificationType[];
    persons:             AccountType[];
    regimes:             AccountType[];
    accountTypes:        AccountType[];
    responsibilities:    AccountType[];
    priceLists:          IdentificationType[];
    communicationMethod: AccountType[];
}

export interface AccountType {
    id:   string;
    name: string;
}

export interface IdentificationType {
    id:   number;
    name: string;
}
