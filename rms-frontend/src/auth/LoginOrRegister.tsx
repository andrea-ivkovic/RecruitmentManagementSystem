import { useContext, useState } from "react";
import './loginOrRegister.css';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {authenticationResponse, userCredentials } from "./auth.model";
import axios from "axios";
import AuthenticationContext from "./AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";
import { getClaims, saveToken } from "./handleJWT";
import { urlAccounts, urlApplicants } from "../endpoints";
import { Alert } from "@mui/material";
import DisplayErrors from "../utils/DisplayErrors";
import { applicantCreationDTO } from "../applicant/applicant.model";

export default function LoginOrRegister() {

    const [toggleButton, setToggleButton] = useState({});
    const [loginContainer, setLoginContainer] = useState({});
    const [registerContainer, setRegisterContainer] = useState({});

    const [error, setError] = useState<string>("");
    const { update } = useContext(AuthenticationContext);
    const history = useNavigate();

    async function registerApplicant(values: applicantCreationDTO) {
        try {
            const authenticationResponse = await axios.post<authenticationResponse>(`${urlApplicants}/createApplicant`, values);
            saveToken(authenticationResponse.data);
            update(getClaims());
            history('/');
        }
        catch (error: any) {
            setError(error.response.data);
            console.log(error);
        }
    }

    async function login(values: userCredentials) {
        try {
            const authenticationResponse = await axios.post<authenticationResponse>(`${urlAccounts}/login`, values);
            saveToken(authenticationResponse.data);
            update(getClaims());
            history('/');
        }
        catch (error: any) {
            setError(error.response.data);
            console.log(error);
        }
    }

    return (
        <>
            <DisplayErrors error={error} setError={setError}/>
            <div className="login-or-register-background">
                <div className="login-form-box" >
                    <div className="login-button-box">
                        <div className="toggle-button" style={toggleButton}></div>
                        <button className="toggle-login-button"
                            onClick={() => {
                                setLoginContainer({ left: '55px' });
                                setRegisterContainer({ left: '550px' });
                                setToggleButton({ left: '0px' })
                            }}
                        >Login</button>
                        <button className="toggle-login-button"
                            onClick={() => {
                                setLoginContainer({ left: '-450px' });
                                setRegisterContainer({ left: '55px' });
                                setToggleButton({ left: '180px' })
                            }}
                        >Register</button>
                    </div>
                    <div className="login-container" style={loginContainer}>
                        <LoginForm
                            model={{ email: '', password: '' }}
                            onSubmit={async values => {
                                login(values);
                            }}
                        />
                    </div>
                    <div className="register-container" style={registerContainer}>
                        <RegisterForm model={{ firstName: '', lastName: '', email: '', password: '' }}
                            onSubmit={async values => {
                                await registerApplicant(values);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}