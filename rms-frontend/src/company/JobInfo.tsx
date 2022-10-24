import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authorized from "../auth/Authorized";
import { urlJobs } from "../endpoints";
import { jobCreationDTO, jobDTO } from "../job/job.model";
import CustomStepper from "../utils/CustomStepper";
import { convertJobToFormData } from "../utils/FormDataUtils";

export default function JobInfo(props: jobInfoProps) {

    const navigate = useNavigate();

    function transform(job: jobDTO): jobCreationDTO {

        return {
            companyId: job.companyId,
            title: job.title,
            jobSectorId: job.jobSectorId.toString(),
            creationDate: new Date(job.creationDate),
            endDate: new Date(job.endDate),
            description: job.description,
            skillsAndRequirements: job.skillsAndRequirements,
            archived: true
        }


    }

    async function archiveJob(values: jobCreationDTO) {
        const formData = convertJobToFormData(values);
        await axios({
            method: 'put',
            url: `${urlJobs}/archive/${props.job.id}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        navigate(0);
    }

    return (
        <>
            <div style={{ fontFamily: 'Roboto', fontWeight: '500', padding: '15px 15px 10px 15px', fontSize: '20px', display: 'flex', justifyContent: 'center' }}>{props.job.title}</div>
            <div style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: '17px', display: 'flex', justifyContent: 'center', color: 'grey' }}>{props.job.jobSector}</div>
            <div style={{ margin: '15px 0px' }}>
                <CustomStepper job={props.job} />
            </div>
            <div style={{ margin: '20px auto', maxHeight: '380px' }} className="job-info-details-container">

                <div style={{ fontFamily: 'Roboto', fontSize: '17px', marginLeft: '30px', fontWeight: '500' }}>Description</div>
                <pre style={{ margin: '10px 30px', textAlign: 'justify', whiteSpace: 'pre-wrap', font: 'inherit' }}>{props.job.description}</pre>

                <div style={{ fontFamily: 'Roboto', fontSize: '17px', marginLeft: '30px', marginTop: '20px', fontWeight: '500' }}>Skills and Requirements</div>
                <pre style={{ margin: '10px 30px', textAlign: 'justify', whiteSpace: 'pre-wrap', font: 'inherit' }}>{props.job.skillsAndRequirements}</pre>

            </div>
            {props.job.archived === false ?
                <Authorized
                    authorized={
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button 
                            onClick={() => {
                                archiveJob(transform(props.job));
                            }}
                            className="archive-button">Archive</button>
                        </div>
                    }
                    roles={["companyAdmin"]}
                />
                : null}

        </>
    )
}

interface jobInfoProps {
    job: jobDTO;
}