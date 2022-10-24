import { DesktopDatePicker } from "@mui/lab";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlApplicants } from "../endpoints";
import { convertApplicantToFormData } from "../utils/FormDataUtils";
import { applicantCreationDTO, applicantDTO } from "./applicant.model";
import ApplicantProfileForm from "./ApplicantProfileForm";

export default function EditApplicantProfile() {
    const { id }: any = useParams();
    const navigate = useNavigate();
    const [entity, setEntity] = useState<applicantCreationDTO>();

    useEffect(() => {
        axios.get<applicantDTO>(`${urlApplicants}/${id}`)
            .then((response: AxiosResponse<applicantDTO>) => {
                setEntity(transform(response.data));
            });

    }, [id, navigate]);


    function transform(applicant: applicantDTO): applicantCreationDTO {
        if (applicant.dateOfBirth)
            return {
                firstName: applicant.firstName,
                lastName: applicant.lastName,
                email: applicant.email,
                password: applicant.password,
                dateOfBirth: new Date(applicant.dateOfBirth),
                pictureURL: applicant.picture,
                phoneNumber: applicant.phoneNumber,
                address: applicant.address,
                about: applicant.about,
                education: applicant.education,
                workExperience: applicant.workExperience
            }

        else {
            return {
                firstName: applicant.firstName,
                lastName: applicant.lastName,
                email: applicant.email,
                password: applicant.password,
                pictureURL: applicant.picture,
                phoneNumber: applicant.phoneNumber,
                address: applicant.address,
                about: applicant.about,
                education: applicant.education,
                workExperience: applicant.workExperience
            }
        }
    }

    async function edit(entityToEdit: applicantCreationDTO) {
        const formData = convertApplicantToFormData(entityToEdit);
        await axios({
            method: 'put',
            url: `${urlApplicants}/${id}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    return (
        <>
            {entity ? <ApplicantProfileForm
                model={entity}
                onSubmit={async values => {
                    console.log(values);
                    await edit(values);
                    navigate(`/user-profile/${id}`);
                }}
            /> : null}

        </>
    )
}