export interface applicantCreationDTO {
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    dateOfBirth?: Date;
    picture?: File;
    pictureURL?: string;
    phoneNumber?: string;
    address?: string;
    about?: string;
    education?: string;
    workExperience?: string;
}

export interface applicantDTO{
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    dateOfBirth?: Date;
    picture: string;
    phoneNumber?: string;
    address?: string;
    about?: string;
    education?: string;
    workExperience?: string;
}

export interface applicantsByJobDTO{
    name: string;
    value: number;
}