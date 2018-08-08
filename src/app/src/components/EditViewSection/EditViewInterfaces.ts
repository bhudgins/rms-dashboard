export interface TableSchema {
    title: string;
    properties: any;
    definitions: any;
    type: string;
    $schema: string;
}

export interface Link {
    href: string;
    templated?: boolean;
}

// all are optional based on position of data coming back.
export interface Links {
    first?: Link;
    prev?: Link;
    self?: Link;
    next?: Link;
    last?: Link;
    profile?: Link;
    search?: Link;
    
}

export interface Page {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

export interface RmsResponse {
    _embedded: any; //  could be any data returned. keeping it any for now.
    _links: Links;
    page: Page;
}