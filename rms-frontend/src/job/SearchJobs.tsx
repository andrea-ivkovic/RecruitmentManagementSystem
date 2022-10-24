import { FormControl, Input, InputAdornment, InputLabel, Pagination, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { urlJobs } from "../endpoints";
import { jobDTO } from "./job.model";
import JobsList from "./JobsList";
import SearchIcon from '@mui/icons-material/Search';
import SelectJobSector from "../utils/SelectJobSector";

export default function SearchJobs() {
    const initialValues: searchJobsForm = {
        title: '',
        jobSectorId: '',
        page: 1,
        recordsPerPage: 10
    }

    const [jobs, setJobs] = useState<jobDTO[]>([]);
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);

    useEffect(() => {
        if(query.get('title')){
            initialValues.title=query.get('title')!;
        }
        if(query.get('jobSectorId')){
            initialValues.jobSectorId=query.get('jobSectorId')!;
        }
        if(query.get('page')){
            initialValues.page=parseInt(query.get('page')!, 10);
        }
        searchJobs(initialValues);
    }, []);


    function searchJobs(values: searchJobsForm) {

        modifyURL(values);
        
        axios.get(`${urlJobs}/search`, { params: values })
            .then((response: AxiosResponse<jobDTO[]>) => {
                const records = (parseInt(response.headers['totalamountofrecords'], 10));
                setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
                setJobs(response.data);
            });
            
    }

    function modifyURL(values: searchJobsForm){
        const queryStrings: string[] = [];

        if(values.title){
            queryStrings.push(`title=${values.title}`);
        }

        if(values.jobSectorId){
            queryStrings.push(`jobSectorId=${values.jobSectorId}`)
        }

        queryStrings.push(`page=${values.page}`);
        navigate(`/search?${queryStrings.join('&')}`);
        
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    values.page = 1;
                    searchJobs(values);
                }}
            >
                {(formikProps) => (
                    <>
                        <Form>
                            <div style={{ position: 'absolute', top: '70px', right: '20px', width: '300px', border: '3px solid #1976d2', padding: '10px', borderRadius: '10px', backgroundColor: 'white'}}>
                                <div style={{ marginTop: '10px' }}>
                                    <TextField
                                        label="Search"
                                        id="title"
                                        name="title"
                                        value={formikProps.values.title}
                                        onChange={formikProps.handleChange}
                                        sx={{ width: '300px' }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                                        }}
                                    />
                                </div>
                                <div style={{ marginRight: '0px', width: '300px', marginTop: '20px' }}>
                                    <SelectJobSector id="jobSectorId" />
                                </div>
                                <button type="submit" className="apply-now-button" style={{ marginBottom: '20px' }}>Search</button>

                            </div>

                        </Form>
                        {jobs ?
                            <>
                                <JobsList jobs={jobs} />
                                <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
                                   <Pagination count={totalAmountOfPages} page={formikProps.values.page}
                                    onChange={(event, newPage) => {
                                        formikProps.values.page = newPage;
                                        searchJobs(formikProps.values)
                                    }}
                                    color="primary" /> 
                                </div>
                                
                            </>
                            : null}

                    </>
                )}

            </Formik>

        </>
    )
}

interface searchJobsForm {
    title: string;
    jobSectorId: string;
    page: number;
    recordsPerPage: number;
}