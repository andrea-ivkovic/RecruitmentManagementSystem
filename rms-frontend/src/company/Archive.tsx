import { Grid, InputAdornment, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react"
import AuthenticationContext from "../auth/AuthenticationContext";
import { getClaims } from "../auth/handleJWT";
import SearchIcon from '@mui/icons-material/Search';
import { width } from "@mui/system";
import { jobDTO } from "../job/job.model";
import axios, { AxiosResponse } from "axios";
import { urlJobs } from "../endpoints";
import DashboardJobsList from "./DashboardJobsList";
import SelectedJobContext from "../job/SelectedJobContext";
import JobInfo from "./JobInfo";
import JobApplicantsTable from "./JobApplicantsTable";

export default function Archive (){

    const [jobs, setJobs] = useState<jobDTO[]>([]);
    const [selectedJob, setSelectedJob]= useState<jobDTO>();

    const initialValues: dashboardSearchJobs = {
        title: ''
    }

    useEffect(() => {
        axios.get(`${urlJobs}/getArchive`)
        .then((response: AxiosResponse<jobDTO[]>) => {
            setJobs(response.data);
            setSelectedJob(response.data[0]);
        });
    }, []);

    function searchCompanyJobs(value: dashboardSearchJobs) {
        axios.get(`${urlJobs}/searchArchive`, { params: value })
            .then((response: AxiosResponse<jobDTO[]>) => {
                setJobs(response.data);
            });
    }

    return (
        <SelectedJobContext.Provider value={{ setSelectedJob: setSelectedJob }}>
            <div className="dashboard-box">
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={3}>
                        <div style={{ height: '630px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '10px' }}>
                            <div style={{ margin: '10px auto', order: 1 }}>
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={values => {
                                        searchCompanyJobs(values);
                                    }}
                                >
                                    {(formikProps) => (
                                        <>
                                            <Form>
                                                <TextField
                                                fullWidth
                                                    size="small"
                                                    label="Search"
                                                    id="title"
                                                    name="title"
                                                    value={formikProps.values.title}
                                                    onChange={formikProps.handleChange}
                                                    sx={{ width: '270px' }}
                                                /><button type="submit" style={{ height: '40px', width: '40px', border: '1px solid grey', borderRadius: '5px' }}><SearchIcon color="primary" /></button>
                                            </Form>
                                        </>
                                    )}
                                </Formik>
                            </div>
                            <div className="dashboard-job-list-container">
                                <DashboardJobsList jobs={jobs}/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={5} >
                        <div style={{ height: '630px', backgroundColor: 'white', borderRadius: '10px'  }}>
                                {selectedJob ? <JobApplicantsTable job={selectedJob} archive={true}/> : null}
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ height: '630px', backgroundColor: 'white', borderRadius: '10px'  }}>
                                {selectedJob ? <JobInfo job={selectedJob}/> : null}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </SelectedJobContext.Provider>
    )
}

interface dashboardSearchJobs {
    title: string;
}