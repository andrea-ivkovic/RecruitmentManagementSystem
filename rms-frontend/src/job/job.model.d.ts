export interface jobCreationDTO {
    companyId: number;
    title: string;
    jobSectorId: string;
    creationDate: Date;
    endDate: Date;
    description: string;
    skillsAndRequirements: string;
    archived: boolean;
}

export interface jobSectorDTO {
    id: number;
    name: string;
}

export interface jobDTO {
    id: number;
    companyId: number;
    companyName: string;
    logo?: string;
    title: string;
    jobSectorId: number;
    jobSector: string;
    creationDate: Date;
    endDate: Date;
    description: string;
    skillsAndRequirements: string;
    archived: boolean;
}

export interface applicantJobCreationDTO {
    userId?: string;
    jobId: number;
    dateOfApplication: Date;
    assessmentScore?: number;
}

export interface applicantJobDTO {
    firstName: string;
    lastName: string;
    dateOfApplication: Date;
    assessmentScore?: number;
    userId: string;
}