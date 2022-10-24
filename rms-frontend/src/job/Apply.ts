import axios from "axios";
import { urlJobs } from "../endpoints";
import { convertJobApplicationToFormData } from "../utils/FormDataUtils";
import { applicantJobCreationDTO } from "./job.model";

export default async function apply(jobApplication: applicantJobCreationDTO) {

    const formData = convertJobApplicationToFormData(jobApplication);
    try {
        console.log(Array.from(formData));
        await axios({
            method: 'post',
            url: `${urlJobs}/apply`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
    catch (error: any) {
        console.log(error.response.data);
    }
}