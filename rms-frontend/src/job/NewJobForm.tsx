import { Field, Form, Formik, FormikHelpers } from "formik";
import { jobCreationDTO } from "./job.model";
import * as Yup from 'yup';
import CustomTextField from "../utils/CustomTextField";
import CustomDatePicker from "../utils/CustomDatePicker";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Test from "../utils/SelectJobSector";
import SelectJobSector from "../utils/SelectJobSector";
import './job.css';
import MultilineTextField from "../utils/MultilineTextField";

export default function NewJobForm(props: newJobFormProps) {
    return (
        <>
            <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={Yup.object({
                    title: Yup.string().required('This field is required'),
                    jobSectorId: Yup.string().required('This field is required'),
                    description: Yup.string().required('This field is required'),
                    skillsAndRequirements: Yup.string().required('This field is required')
                })}
            >
                {(formikProps) => (
                    <Form>
                        <div className="background-border" style={{backgroundColor: 'white'}}>
                            <h1 style={{ textAlign: 'center', margin: '0px auto 10px auto', color: '#254e58' }}>Create A New Job</h1>
                            <div className="job-profile-container">
                                <div style={{ gridRow: '1', gridColumn: '1/3' }}>
                                    <CustomTextField id="title" label="Title" onChange={formikProps.handleChange} />
                                </div>
                                <div style={{ gridRow: '2', gridColumn: '1' }}>
                                    <SelectJobSector id="jobSectorId" />
                                </div>
                                <div style={{ gridRow: '2', gridColumn: '2' }}>
                                    <CustomDatePicker id="endDate" label="Application closing date" />
                                </div>
                            </div>
                            <label style={{ color: '#254e58', fontSize: '25px', marginLeft: '30px', fontWeight: 'bold' }}>Description</label>
                            <div >
                                <MultilineTextField id="description" label="Job Description" onChange={formikProps.handleChange} minRows={8} style={{ margin: '20px 30px 40px 30px', textAlign: 'justify', whiteSpace: 'pre-wrap', width: '1035px' }} />
                            </div>
                            <label style={{ color: '#254e58', fontSize: '25px', marginLeft: '30px', fontWeight: 'bold' }}>Skills and Requirements</label>
                            <div>
                                <MultilineTextField id="skillsAndRequirements" label="Skills and Requirements" onChange={formikProps.handleChange} minRows={8} style={{ margin: '20px 30px 40px 30px', textAlign: 'justify', whiteSpace: 'pre-wrap', width: '1035px' }} />
                            </div>
                            <button type="submit" className="button">Post a Job</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

interface newJobFormProps {
    model: jobCreationDTO;
    onSubmit(values: jobCreationDTO, action: FormikHelpers<jobCreationDTO>): void;
}