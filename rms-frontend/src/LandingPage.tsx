import axios, { AxiosResponse } from "axios"
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthenticationContext from "./auth/AuthenticationContext";
import Authorized from "./auth/Authorized";
import { getClaims } from "./auth/handleJWT";
import { urlAccounts } from "./endpoints";

export default function LandingPage() {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { claims, update } = useContext(AuthenticationContext);
    

    useEffect(() => {
        if (claims.findIndex(claim => claim.name === 'role' && claim.value === "companyAdmin")> -1) {
            navigate("/dashboard");
        }
        else if(claims.findIndex(claim => claim.name === 'role' && claim.value === "companyUser")> -1) {
            navigate("/dashboard");
        }
        else{
            navigate("/home");
        } 
    }, []);



    return (
        <>
        </>
    )
}

