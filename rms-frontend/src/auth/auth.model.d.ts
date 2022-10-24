export interface claim {
    name: string;
    value: string;
}

export interface authenticationResponse {
    token: string;
    expiration: Date;
}

export interface userCredentials {
    email: string;
    password: string;
}

export interface registerCompanyData {
    companyName: string;
    address: string;
    country: string;
    phoneNumber: string;
    adminFirstName: string;
    adminLastName: string;
    adminEmail: string;
    password: string;
}

export interface companyUserCreationDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyId: number;
}

export interface companyUserDTO{
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    userId: string;
}

