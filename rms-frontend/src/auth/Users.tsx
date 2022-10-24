import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../endpoints";
import StickyHeadTable from "../utils/StickyHeadTable";
import { companyUserDTO } from "./auth.model";



export default function Users() {

    const navigate = useNavigate();

    return (
        <>
            <button className="register-button" onClick={() => navigate('/users/add-new-user')} type="submit" style={{ color: 'white' }}>Add new user</button>
            <StickyHeadTable />
        </>
    )
}