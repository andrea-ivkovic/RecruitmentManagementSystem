import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../endpoints";
import AddNewUserForm from "./AddNewUserForm";
import { companyUserCreationDTO } from "./auth.model";

export default function AddNewUser() {

    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

    async function addNewUser(values: companyUserCreationDTO) {
        try {
            await axios.post(`${urlAccounts}/addNewUser`, values);
            navigate('/users');
        }
        catch (error: any) {
            setError(error.response.data);
            console.log(error);
        }
    }

    return (
        <div className="login-or-register-background">
            <div className="login-container" style={{ margin: '50px auto', borderRadius: '20px', backgroundColor: '#d1e8e2', padding: '20px', position: 'static' }}>
                <AddNewUserForm model={{ firstName: '', lastName: '', email: '', password: '', companyId: 0 }}
                    onSubmit={async values => {
                        await addNewUser(values);
                    }}
                />
            </div>
        </div >
    )
}