import { applicantCreationDTO } from "../applicant/applicant.model";
import { companyCreationDTO } from "../company/company.model";
import { applicantJobCreationDTO, jobCreationDTO } from "../job/job.model";

export function convertCompanyToFormData(company: companyCreationDTO): FormData {
    const formData = new FormData();

    formData.append('companyName', company.companyName);
    formData.append('address', company.address);
    formData.append('country', company.country);
    formData.append('phoneNumber', company.phoneNumber);

    if (company.website) {
        formData.append('website', company.website);
    }

    if (company.logo) {
        formData.append('logo', company.logo);
    }

    if (company.about) {
        formData.append('about', company.about);
    }

    return formData;

}

export function convertApplicantToFormData(applicant: applicantCreationDTO): FormData {
    const formData = new FormData();

    formData.append('firstName', applicant.firstName);
    formData.append('lastName', applicant.lastName);

    if (applicant.email) {
        formData.append('email', applicant.email);
    }

    if (applicant.password) {
        formData.append('password', applicant.password);
    }

    if (applicant.phoneNumber) {
        formData.append('phoneNumber', applicant.phoneNumber);
    }

    if (applicant.address) {
        formData.append('address', applicant.address);
    }

    if (applicant.about) {
        formData.append('about', applicant.about);
    }

    if (applicant.education) {
        formData.append('education', applicant.education);
    }

    if (applicant.workExperience) {
        formData.append('workExperience', applicant.workExperience);
    }

    if (applicant.dateOfBirth) {
        formData.append('dateOfBirth', formatDate(applicant.dateOfBirth));
    }

    if (applicant.picture) {
        formData.append('picture', applicant.picture);
    }

    return formData;

}

export function convertJobToFormData(job: jobCreationDTO): FormData {

    const formData = new FormData();

    formData.append("companyId", job.companyId.toString());
    formData.append("title", job.title);
    formData.append("jobSectorId", job.jobSectorId);
    formData.append("creationDate", formatDateTime(job.creationDate));
    formData.append("endDate", formatEndDate(job.endDate));
    formData.append("description", job.description);
    formData.append("skillsAndRequirements", job.skillsAndRequirements);
    formData.append("archived", job.archived.toString());

    return formData;

}

export function convertJobApplicationToFormData(jobApplication: applicantJobCreationDTO): FormData {

    const formData = new FormData();

    if(jobApplication.userId){
        formData.append("userId", jobApplication.userId);
    }

    formData.append("jobId", jobApplication.jobId.toString());
    formData.append("dateOfApplication", formatDateTime(jobApplication.dateOfApplication));

    if(jobApplication.assessmentScore){
        formData.append("assessmentScore", jobApplication.assessmentScore.toString());
    }

    return formData;

}

function formatDate(date: Date) {
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        { value: month }, ,
        { value: day }, ,
        { value: year }
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}

function formatDateTime(date: Date) {
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    });

    const [
        { value: month }, ,
        { value: day }, ,
        { value: year }, ,
        { value: hour }, ,
        { value: minute }, ,
        { value: second }
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}

function formatEndDate(date: Date) {
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        hourCycle: 'h23'
    });

    const [
        { value: month }, ,
        { value: day }, ,
        { value: year }, ,
        { value: hour }, ,
        { value: minute }, ,
        { value: second }
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}T23:59:59`;
}