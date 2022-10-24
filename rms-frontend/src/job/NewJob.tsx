import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../auth/AuthenticationContext";
import { urlJobs } from "../endpoints";
import { convertJobToFormData } from "../utils/FormDataUtils";
import { jobCreationDTO } from "./job.model";
import NewJobForm from "./NewJobForm";

export default function NewJob() {

    const navigate = useNavigate();
    const [error, setError] = useState();

   

    async function createNewJob(values: jobCreationDTO) {
        const formData = convertJobToFormData(values);
        console.log(Array.from(formData));
        console.log(values);
        try{
            await axios({
                method: 'post',
                url: urlJobs,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            navigate(0);
        }
        catch(error: any){
            setError(error.response.data);
            console.log(error);
        }
            
    }

    return (
        <>
                <NewJobForm model={{
                    companyId: 0,
                    title: '',
                    jobSectorId: '',
                    creationDate: new Date(),
                    endDate: new Date(),
                    description: '',
                    skillsAndRequirements: '',
                    archived: false
                }}
                    onSubmit={async values => {
                        await createNewJob(values);
                    }} />
                

        </>
    )
}