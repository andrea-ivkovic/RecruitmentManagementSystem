import useFormItemStatus from "antd/lib/form/hooks/useFormItemStatus";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthenticationContext from "../auth/AuthenticationContext";
import Authorized from "../auth/Authorized";
import { urlJobs } from "../endpoints";
import apply from "./Apply";
import { jobDTO } from "./job.model";

export default function JobDetails() {

    const { id }: any = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState<jobDTO>();
    const currentDate = new Date();

    useEffect(() => {
        axios.get<jobDTO>(`${urlJobs}/${id}`)
            .then((response: AxiosResponse<jobDTO>) => {
                setJob(response.data);
            });
    }, [id]);



    return (
        <>
            {job ?
                <div className="background-border" style={{backgroundColor: 'white'}}>
                    <h1 style={{ textAlign: 'center', margin: '0px auto 20px auto' }}>{job.title}</h1>
                    <div className="company-profile-container" style={{ gridTemplateRows: '1fr 1fr 1fr 1fr' }}>
                        {job.logo ?
                            <img style={{ width: '240px', height: '240px', objectFit: 'scale-down', gridColumn: '1', gridRow: '1/5', display: 'block', margin: 'auto', border: '4px solid #88bdbc', borderRadius: '10px' }} src={job.logo} />
                            : <img style={{ width: '240px', height: '240px', objectFit: 'scale-down', gridColumn: '1', gridRow: '1/5', display: 'block', margin: 'auto', border: '4px solid #88bdbc', borderRadius: '10px' }} src="/no-image-found.png" />}
                        <div style={{ gridColumn: '2', gridRow: '1' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Sector:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{job.jobSector}</label></div>
                        <div style={{ gridColumn: '2', gridRow: '2' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Application closing date:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{(new Date(job.endDate)).toLocaleDateString("en-GB")}</label></div>
                        <div style={{ gridColumn: '2', gridRow: '3' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Company:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{job.companyName}</label></div>
                        <div style={{ gridColumn: '2', gridRow: '4' }}>
                            <button className="button" style={{ display: 'inline', margin: '0px' }} onClick={() => navigate(`/company-profile/${job.companyId}`)}>View Company</button>
                            <Authorized 
                            authorized={<button onClick={async () => {await apply({jobId: job.id, dateOfApplication: currentDate}); navigate(-1);}} className="apply-now-button" style={{ display: 'inline', margin: '0px 0px 0px 100px' }}>Apply Now</button>}
                            roles={["applicant"]}
                            />
                            
                            
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ color: '#254e58', fontSize: '25px', marginLeft: '40px', fontWeight: 'bold' }}>Job Description</label>
                        <pre style={{ margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', font: 'inherit' }}>{job.description}</pre>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ color: '#254e58', fontSize: '25px', marginLeft: '40px', fontWeight: 'bold' }}>Skills and Requirements</label>
                        <pre style={{ margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', font: 'inherit' }}>{job.skillsAndRequirements}</pre>
                    </div>
                </div> : null}
        </>
    )
}