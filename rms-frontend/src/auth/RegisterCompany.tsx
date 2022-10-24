import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { companyCreationDTO } from "../company/company.model";
import { urlAccounts, urlCompanies } from "../endpoints";
import { registerCompanyData, companyUserCreationDTO, authenticationResponse } from "./auth.model";
import AuthenticationContext from "./AuthenticationContext";
import { getClaims, saveToken } from "./handleJWT";
import RegisterCompanyForm from "./RegisterCompanyForm";

export default function RegisterCompany() {

    const [error, setError] = useState<string>("");
    const { update } = useContext(AuthenticationContext);
    const history = useNavigate();

    async function registerCompanyAndAdmin(values: registerCompanyData) {

        try {
            const companyCreationDTO: companyCreationDTO =
                { companyName: values.companyName, address: values.address, country: values.country, phoneNumber: values.phoneNumber };
            const response = await axios.post<number>(urlCompanies, companyCreationDTO);
            const companyUserCreationDTO: companyUserCreationDTO =
            {
                firstName: values.adminFirstName, lastName: values.adminLastName, email: values.adminEmail,
                password: values.password, companyId: response.data
            };

            const authenticationResponse = await axios.post<authenticationResponse>(`${urlAccounts}/createAdmin`, companyUserCreationDTO);
            saveToken(authenticationResponse.data);
            update(getClaims());
            history('/');
        }
        catch(error: any){
                setError(error.response.data);
                console.log(error);
            }


    }

    return (
        <RegisterCompanyForm model={{
            address: '', adminFirstName: '', adminLastName: '', companyName: '', country: '',
            adminEmail: '', password: '', phoneNumber: ''
        }}
            onSubmit={async values => {
                await registerCompanyAndAdmin(values);
            }} />
    )
}