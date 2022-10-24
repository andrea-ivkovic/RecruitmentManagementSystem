import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlCompanies } from "../endpoints";
import { convertCompanyToFormData } from "../utils/FormDataUtils";
import { companyCreationDTO, companyDTO } from "./company.model";
import CompanyProfileForm from "./CompanyProfileForm";

export default function EditCompanyProfile() {

    const { id }: any = useParams();
    const navigate = useNavigate();
    const [entity, setEntity] = useState<companyCreationDTO>();

    useEffect(() => {
        axios.get<companyDTO>(`${urlCompanies}/${id}`)
            .then((response: AxiosResponse<companyDTO>) => {
                setEntity(transform(response.data));
            });

    }, [id, navigate]);


    function transform(company: companyDTO): companyCreationDTO {
        return {
            companyName: company.companyName,
            address: company.address,
            country: company.country,
            phoneNumber: company.phoneNumber,
            website: company.website,
            logoURL: company.logo,
            about: company.about
        }
    }

    async function edit(entityToEdit: companyCreationDTO){
            const formData =convertCompanyToFormData(entityToEdit);
                await axios({
                    method: 'put',
                    url: `${urlCompanies}/${id}`,
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                });
    }

    return (
        <>
        {entity ? <CompanyProfileForm
            model={entity}
            onSubmit={async values => {
                console.log(values);
                await edit(values);
                navigate(`/company-profile/${id}`);
            }}
            /> :  null}
            
        </>
    )
}