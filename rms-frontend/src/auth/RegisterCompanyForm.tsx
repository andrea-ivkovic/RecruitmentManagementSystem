import { Form, Formik, FormikHelpers, yupToFormErrors } from "formik";
import { registerCompanyData } from "./auth.model";
import * as Yup from 'yup';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import './loginOrRegister.css';
import CustomTextField from "../utils/CustomTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function RegisterCompanyForm(props: registerCompanyProps) {

    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className="login-or-register-background">
            <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={Yup.object({
                    companyName: Yup.string().required('This field is required'),
                    address: Yup.string().required('This field is required'),
                    country: Yup.string().required('This field is required'),
                    phoneNumber: Yup.string().required('This field is required'),
                    adminFirstName: Yup.string().required('This field is required'),
                    adminLastName: Yup.string().required('This field is required'),
                    adminEmail: Yup.string().required('Email is required')
                        .email('Enter a valid email'),
                    password: Yup.string().required('Password is required')
                        .min(8, "Password must contain at least 8 characters")
                })}
            >
                {formikProps => (

                    <Form>
                        <div className="register-company-container">
                            <div className="register-company-container-label"><label >Company Info</label></div>
                            <CustomTextField
                                id="companyName"
                                label="Company Name"
                                onChange={formikProps.handleChange}
                                style={{ gridColumn: '1', gridRow: '2' }}
                            />
                            <CustomTextField
                                id="address"
                                label="Address"
                                onChange={formikProps.handleChange}
                                style={{ gridColumn: '1', gridRow: '3' }}
                            />
                            <CustomTextField
                                id="country"
                                label="Country"
                                onChange={formikProps.handleChange}
                                style={{ gridColumn: '1', gridRow: '4' }}
                            />
                            <CustomTextField
                                id="phoneNumber"
                                label="Phone Number"
                                onChange={formikProps.handleChange}
                                style={{ gridColumn: '1', gridRow: '5' }}
                            />
                            <CustomTextField
                                id="adminFirstName"
                                label="Admin First Name"
                                onChange={formikProps.handleChange}
                                style={{ gridColumn: '2', gridRow: '2' }}
                            />
                            <CustomTextField
                                id="adminLastName"
                                label="Admin Last Name"
                                onChange={formikProps.handleChange}
                                style={{ gridColumn: '2', gridRow: '3' }}
                            />
                            <CustomTextField
                                id="adminEmail"
                                label="Admin Email"
                                onChange={formikProps.handleChange}
                                style={{ gridColumn: '2', gridRow: '4' }}
                            />
                                <FormControl style={{ gridColumn: '2', gridRow: '5', margin: '0px'}}
                                    error={formikProps.touched.password && Boolean(formikProps.errors.password)} sx={{ marginTop: '20px' }} fullWidth variant="outlined" >
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formikProps.values.password}
                                        onChange={formikProps.handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="password"
                                    />
                                    <FormHelperText>{formikProps.touched.password ? formikProps.errors.password : ""}</FormHelperText>
                                </FormControl>
                            <button className="register-button" type="submit" style={{ gridColumn: '1/3', gridRow: '6' }}>Register</button>
                        </div>
                    </Form>

                )}

            </Formik>
        </div>
    )
}

interface registerCompanyProps {
    model: registerCompanyData;
    onSubmit(values: registerCompanyData, actions: FormikHelpers<registerCompanyData>): void;
}