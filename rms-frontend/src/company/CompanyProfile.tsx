import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { urlCompanies } from "../endpoints";
import { companyDTO } from "./company.model";
import './company.css';
import { Grid } from "@mui/material";
import Authorized from "../auth/Authorized";

export default function CompanyProfile() {

    const { id }: any = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState<companyDTO>();

    useEffect(() => {
        axios.get<companyDTO>(`${urlCompanies}/${id}`)
            .then((response: AxiosResponse<companyDTO>) => {
                setCompany(response.data);
            });
    }, [id]);

    return (
        <div className="background-border" style={{backgroundColor: 'white'}}>
            <h1 style={{ textAlign: 'center', margin: '0px auto 10px auto' }}>{company?.companyName}</h1>
            <Authorized 
            authorized={<button className="button" style={{marginRight: '40px'}} onClick={() => navigate(`/company-profile/edit/${id}`)}>Edit Profile</button>}
            roles={["companyAdmin"]}
            />
            <div className="company-profile-container">
                {company?.logo ? 
                <img style={{width: '240px', height: '240px', objectFit: 'scale-down', gridColumn: '1', gridRow: '1/5', display: 'block', margin: 'auto', border: '4px solid #88bdbc', borderRadius: '10px'}} src={company.logo}/> 
                : <img style={{ width: '240px', height: '240px', objectFit: 'scale-down', gridColumn: '1', gridRow: '1/5', display: 'block', margin: 'auto', border: '4px solid #88bdbc', borderRadius: '10px'}} src="/no-image-found.png"/>}
                <div style={{ gridColumn: '2', gridRow: '1' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Address:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{company?.address}</label></div>
                <div style={{ gridColumn: '2', gridRow: '2' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Country:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{company?.country}</label></div>
                <div style={{ gridColumn: '2', gridRow: '3' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Phone Number:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{company?.phoneNumber}</label></div>
                <div style={{ gridColumn: '2', gridRow: '4' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Website:</label>
                    {company?.website ?
                        <a style={{ gridColumn: '2', gridRow: '4', marginLeft: '10px' }} href={company.website}>{company.website}</a>
                        : null}
                </div>
            </div>
            <div style={{marginTop: '20px'}}>
                <label style={{ color: '#254e58', fontSize: '25px', marginLeft: '40px', fontWeight: 'bold' }}>About Us</label>
                <pre style={{margin: '10px 40px', textAlign: 'justify', whiteSpace: 'pre-wrap', font: 'inherit'}}>{company?.about}</pre>
            </div>
        </div>
    )
}