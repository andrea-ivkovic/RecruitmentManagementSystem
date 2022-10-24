import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthenticationContext from "./auth/AuthenticationContext";
import Authorized from "./auth/Authorized";
import { urlJobs } from "./endpoints";
import { jobDTO } from "./job/job.model";
import JobsList from "./job/JobsList";

export default function HomePage() {

    const [jobs, setJobs] = useState<jobDTO[]>();
    const navigate = useNavigate();
    const { claims, update } = useContext(AuthenticationContext);

    useEffect(() => {
        if (claims.findIndex(claim => claim.name === 'role' && claim.value === "companyAdmin")> -1) {
            navigate("/dashboard");
        }
        else if(claims.findIndex(claim => claim.name === 'role' && claim.value === "companyUser")> -1) {
            navigate("/dashboard");
        }
    }, []);

    useEffect(() => {
        axios.get(`${urlJobs}/getLatest`)
            .then((response: AxiosResponse<jobDTO[]>) => {
                setJobs(response.data);
            })
    }, []);

    return (
        <>
                <h1 style={{ font: '30px Arial', color: '#254e58', display: 'block', textAlign: 'center', margin: '15px' }}>Latest Job Openings</h1>
                {jobs ?
                    <JobsList jobs={jobs} />
                    : null}
        </>
    )
}