import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Authorized from "../auth/Authorized";
import { urlApplicants } from "../endpoints";
import { applicantDTO } from "./applicant.model";

export default function ApplicantProfile() {

    const { id }: any = useParams();
    const navigate = useNavigate();
    const [applicant, setApplicant] = useState<applicantDTO>();

    useEffect(() => {
        axios.get<applicantDTO>(`${urlApplicants}/${id}`)
            .then((response: AxiosResponse<applicantDTO>) => {
                setApplicant(response.data);
                console.log(response.data);
            });
    }, [id]);

    return (
        <>
            {applicant ? <div className="background-border" style={{backgroundColor: 'white'}}>
                <h1 style={{ textAlign: 'center', margin: '0px auto 10px auto' }}>{applicant?.firstName} {applicant?.lastName}</h1>
                <Authorized
                    authorized={<button className="button" style={{ marginRight: '40px' }} onClick={() => navigate(`/user-profile/edit/${id}`)}>Edit Profile</button>}
                    roles={["applicant"]}
                />
                <div className="company-profile-container">
                    {applicant?.picture ?
                        <img style={{ width: '240px', height: '240px', objectFit: 'scale-down', gridColumn: '1', gridRow: '1/5', display: 'block', margin: 'auto', border: '4px solid #88bdbc', borderRadius: '10px' }} src={applicant.picture} />
                        : <img style={{ width: '240px', height: '240px', objectFit: 'scale-down', gridColumn: '1', gridRow: '1/5', display: 'block', margin: 'auto', border: '4px solid #88bdbc', borderRadius: '10px' }} src="/no-image-found.png" />}
                    <div style={{ gridColumn: '2', gridRow: '1' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Email:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{applicant?.email}</label></div>
                    <div style={{ gridColumn: '2', gridRow: '2' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Phone Number:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{applicant?.phoneNumber}</label></div>
                    <div style={{ gridColumn: '2', gridRow: '3' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Address:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{applicant?.address}</label></div>
                    <div style={{ gridColumn: '2', gridRow: '4' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Date of Birth:</label>
                        {applicant.dateOfBirth ? <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{(new Date(applicant.dateOfBirth)).toLocaleDateString("en-GB")}</label> : null}
                    </div>
                </div > 
                <div style={{ marginTop: '20px' }}>
                    <label style={{ color: '#254e58', fontSize: '25px', marginLeft: '40px', fontWeight: 'bold' }}>About </label>
                    <pre style={{ margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', font: 'inherit' }}>{applicant?.about}</pre>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label style={{ color: '#254e58', fontSize: '25px', marginLeft: '40px', fontWeight: 'bold' }}>Education </label>
                    <pre style={{ margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', font: 'inherit' }}>{applicant?.education}</pre>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label style={{ color: '#254e58', fontSize: '25px', marginLeft: '40px', fontWeight: 'bold' }}>Work Experience </label>
                    <pre style={{ margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', font: 'inherit' }}>{applicant?.workExperience}</pre>
                </div>
            </div> : null}

        </>
    )
}