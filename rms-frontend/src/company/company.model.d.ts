export interface companyCreationDTO{
    companyName: string;
    address: string;
    country: string;
    phoneNumber: string;
    website?: string;
    logo?: File;
    logoURL? : string;
    about?: string;
}

export interface companyDTO{
    companyName: string;
    address: string;
    country: string;
    phoneNumber: string;
    website?: string;
    logo? : string;
    about?: string;
}