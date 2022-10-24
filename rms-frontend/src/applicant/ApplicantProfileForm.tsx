import { Form, Formik, FormikHelpers } from "formik";
import { applicantCreationDTO } from "./applicant.model";
import * as Yup from 'yup';
import { DesktopDatePicker } from "@mui/lab";
import CustomDatePicker from "../utils/CustomDatePicker";
import DateField from "../utils/DateField";
import ImageField from "../utils/ImageField";
import SmallTextField from "../utils/SmallTextField";
import MultilineTextField from "../utils/MultilineTextField";

export default function ApplicantProfileForm(props: applicantProfileFormProps) {
    return (
        <>
            <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
            >
                {(formikProps) => (
                    <Form>
                        <div className="background-border" style={{backgroundColor: 'white'}}>
                            <h1 style={{ textAlign: 'center', margin: '0px auto 10px auto' }}>{props.model.firstName} {props.model.lastName}</h1>

                            <div className="company-profile-container">
                                <div style={{ gridColumn: '1', gridRow: '1/5' }}>
                                    <ImageField field="picture" imageURL={props.model.pictureURL} />
                                </div>
                                <div style={{ gridColumn: '2', gridRow: '1' }}>
                                    <SmallTextField readOnly={true} id="email" label="Email" onChange={formikProps.handleChange} style={{ width: '720px' }} />
                                </div>
                                <div style={{ gridColumn: '2', gridRow: '2' }}>
                                    <SmallTextField id="phoneNumber" label="Phone Number" onChange={formikProps.handleChange} style={{ width: '720px' }} />
                                </div>
                                <div style={{ gridColumn: '2', gridRow: '3' }}>
                                    <SmallTextField id="address" label="Address" onChange={formikProps.handleChange} style={{ width: '720px' }} />
                                </div>
                                <div style={{ gridColumn: '2', gridRow: '4' }}>
                                    <CustomDatePicker id="dateOfBirth" label="Date of Birth" style={{ width: '720px' }} size="small" variant="standard" />
                                </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <MultilineTextField id="about" label="About" onChange={formikProps.handleChange} minRows={8} style={{ margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', width: '1020px' }} />
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <MultilineTextField id="education" label="Education" onChange={formikProps.handleChange} minRows={8} style={{ margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', width: '1020px' }} />
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <MultilineTextField id="workExperience" label="Work Experience" onChange={formikProps.handleChange} minRows={8} style={{ margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', width: '1020px' }} />
                            </div>
                            <button type="submit" className="button">Save Changes</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

interface applicantProfileFormProps {
    model: applicantCreationDTO;
    onSubmit(values: applicantCreationDTO, action: FormikHelpers<applicantCreationDTO>): void;
}