export interface FilesList {
    id:          number;
    date:        Date;
    title:       string;
    description: string;
    source:      string;
    location:    string;
    type:        Type;
    attachment:  Attachment;
}

export interface Attachment {
    id:         number;
    name:       string;
    fileName:   string;
    size:       number;
    extension:  string;
    isExternal: boolean;
    url:        string;
}

export interface Type {
    id:   number;
    name: string;
}
