import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { userCredentials } from "./auth.model";
import './loginOrRegister.css';
import * as Yup from 'yup';
import CustomTextField from "../utils/CustomTextField";

export default function LoginForm(props: loginFormProps) {

    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required('Email is required')
                    .email('Enter a valid email'),
                password: Yup.string().required('Password is required')
                    .min(8, "Password must contain at least 8 characters")
            })}
        >
            {formikProps => (
                <Form>
                    <CustomTextField
                    id="email"
                    label="Email"
                    onChange={formikProps.handleChange}
                    style={{marginTop: '20px'}}
                    />
                    <FormControl error={formikProps.touched.password && Boolean(formikProps.errors.password)} sx={{ marginTop: '50px' }} fullWidth variant="outlined" >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
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
                    <button className="login-button" type="submit">Login</button>
                </Form>
            )}
        </Formik>
    )
}

interface loginFormProps {
    model: userCredentials;
    onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>): void;
}