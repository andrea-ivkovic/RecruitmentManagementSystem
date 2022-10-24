import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jobDTO } from "./job.model"

export default function JobAd(props: jobAdProps) {

    const navigate = useNavigate();

    return (
        <>
            <div className="job-ad-container" style={{backgroundColor: 'white'}}>
            
                {props.job.logo ?
                    <img style={{ width: '220px', height: '220px', objectFit: 'scale-down', gridColumn: '1', gridRow: '1/5', display: 'block', margin: 'auto', border: '0px solid #88bdbc', borderRadius: '10px' }} src={props.job.logo} />
                    : <img style={{ width: '220px', height: '220px', objectFit: 'scale-down', gridColumn: '1', gridRow: '1/5', display: 'block', margin: 'auto', border: '0px solid #88bdbc', borderRadius: '10px' }} src="/no-image-found.png" />}
                <div style={{ gridColumn: '2', gridRow: '1' }}><label style={{ fontSize: '22px', fontWeight: 'bold', marginLeft: '5px' }}>{props.job.title}</label></div>
                <div style={{ gridColumn: '2', gridRow: '2' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Sector:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{props.job.jobSector}</label></div>
                <div style={{ gridColumn: '2', gridRow: '3' }}><label style={{ color: '#254e58', fontSize: '18px' }}>Application closing date:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{(new Date(props.job.endDate)).toLocaleDateString("en-GB")}</label></div>
                <div style={{ gridColumn: '2', gridRow: '4' }}>
                <label style={{ color: '#254e58', fontSize: '18px' }}>Published on:</label> <label style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>{(new Date(props.job.creationDate)).toLocaleDateString("en-GB")}</label>
                    <button className="button" style={{ display: 'inline', margin: '0px', marginLeft: '80px' }} onClick={() => navigate(`/job-details/${props.job.id}`)}>View Details</button>
                </div>
            </div>
        </>
    )
}

interface jobAdProps {
    job: jobDTO;
}