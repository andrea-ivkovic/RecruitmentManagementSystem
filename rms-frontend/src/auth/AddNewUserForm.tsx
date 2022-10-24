import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { companyUserCreationDTO } from "./auth.model";
import * as Yup from 'yup';
import CustomTextField from "../utils/CustomTextField";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AddNewUserForm(props: addNewUserProps){

    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
             <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('This filed is required'),
                    lastName: Yup.string().required('This field is required'),
                    email: Yup.string().required('Email is required')
                        .email('Enter a valid email'),
                    password: Yup.string().required('Password is required')
                        .min(8, "Password must contain at least 8 characters")
                })}
            >
                {formikProps => (
                    <Form>
                        <CustomTextField
                            id="firstName"
                            label="First Name"
                            onChange={formikProps.handleChange}
                            style={{ marginTop: '20px' }}
                        />
                        <CustomTextField
                            id="lastName"
                            label="Last Name"
                            onChange={formikProps.handleChange}
                            style={{ marginTop: '20px' }}
                        />
                        <CustomTextField
                            id="email"
                            label="Email"
                            onChange={formikProps.handleChange}
                            style={{ marginTop: '20px' }}
                        />
                        <FormControl error={formikProps.touched.password && Boolean(formikProps.errors.password)} sx={{ marginTop: '20px' }} fullWidth variant="outlined" >
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
                                label="Password"
                            />
                            <FormHelperText>{formikProps.touched.password ? formikProps.errors.password : ""}</FormHelperText>
                        </FormControl>
                        <button className="register-button" type="submit" >Add new user</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

interface addNewUserProps{
    
    model: companyUserCreationDTO;
    onSubmit(values: companyUserCreationDTO, actions: FormikHelpers<companyUserCreationDTO>): void;
}