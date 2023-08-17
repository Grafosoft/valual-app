export interface UserList {
    id:                     string;
    user:                   string;
    email:                  string;
    name:                   string;
    phone:                  string;
    firstName:              string;
    familyName:             string;
    jobTitle:               string;
    organizationDepartment: string;
    identification:         string;
    image:                  string;
    signature:              string;
    isMobileApp:            boolean;
    isActive:               boolean;
    status:                 string;
    identificationType:     IdentificationType;
    country:                Country;
}

export interface Country {
    id:   number;
    code: string;
}

export interface IdentificationType {
    id:   string;
    code: string;
    name: string;
}
