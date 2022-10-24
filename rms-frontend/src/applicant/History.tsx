import { Pagination } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { urlJobs } from "../endpoints";
import { jobDTO } from "../job/job.model";
import JobsList from "../job/JobsList";

export default function History(){

    const initialValues: historyForm = {
        page: 1,
        recordsPerPage: 10
    }

    const [jobs, setJobs] = useState<jobDTO[]>([]);
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);

    useEffect(() => {
        if(query.get('page')){
            initialValues.page=parseInt(query.get('page')!, 10);
        }
        searchJobs(initialValues);
    }, []);


    function searchJobs(values: historyForm) {

        modifyURL(values);
        
        axios.get(`${urlJobs}/history`, { params: values })
            .then((response: AxiosResponse<jobDTO[]>) => {
                const records = (parseInt(response.headers['totalamountofrecords'], 10));
                setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
                setJobs(response.data);
            });
            
    }

    function modifyURL(values: historyForm){
        const queryStrings: string[] = [];

        queryStrings.push(`page=${values.page}`);
        navigate(`/history?${queryStrings.join('&')}`);
        
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

interface historyForm {
    page: number;
    recordsPerPage: number;
}