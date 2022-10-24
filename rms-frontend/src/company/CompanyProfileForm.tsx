import { TextField } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import CustomTextField from "../utils/CustomTextField";
import ImageField from "../utils/ImageField";
import SmallTextField from "../utils/SmallTextField";
import { companyCreationDTO } from "./company.model";
import * as Yup from 'yup';
import MultilineTextField from "../utils/MultilineTextField";

export default function CompanyProfileForm(props: companyProfileFormProps) {


    return (
        <>
            <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={Yup.object({
                    address: Yup.string().required('This filed is required'),
                    country: Yup.string().required('This field is required'),
                    phoneNumber: Yup.string().required('This field is required')
                })}
            >
                {(formikProps) => (
                    <Form>
                        <div className="background-border" style={{backgroundColor: 'white'}}>
                            <h1 style={{ textAlign: 'center', margin: '0px auto 10px auto' }}>{props.model.companyName}</h1>

                            <div className="company-profile-container">
                                <div style={{ gridColumn: '1', gridRow: '1/5' }}>
                                    <ImageField field="logo" imageURL={props.model.logoURL} />
                                </div>
                                <div style={{ gridColumn: '2', gridRow: '1' }}>
                                    <SmallTextField id="address" label="Address" onChange={formikProps.handleChange} style={{ width: '720px' }} />
                                </div>
                                <div style={{ gridColumn: '2', gridRow: '2' }}>
                                    <SmallTextField readOnly={true} id="country" label="Country" onChange={formikProps.handleChange} style={{ width: '720px' }} />
                                </div>
                                <div style={{ gridColumn: '2', gridRow: '3' }}>
                                    <SmallTextField id="phoneNumber" label="Phone Number" onChange={formikProps.handleChange} style={{ width: '720px' }} />
                                </div>
                                <div style={{ gridColumn: '2', gridRow: '4' }}>
                                    <SmallTextField id="website" label="Website" onChange={formikProps.handleChange} style={{ width: '720px' }} />
                                </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <MultilineTextField id="about" label="About Company" onChange={formikProps.handleChange} minRows={8} style={{ margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', width: '1020px' }} />
                            </div>
                            <button type="submit" className="button">Save Changes</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

interface companyProfileFormProps {
    model: companyCreationDTO;
    onSubmit(values: companyCreationDTO, action: FormikHelpers<companyCreationDTO>): void;
}