import { Divider } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jobDTO } from "../job/job.model";
import SelectedJobContext from "../job/SelectedJobContext";
import WorkIcon from '@mui/icons-material/Work';
import { margin } from "@mui/system";

export default function JobItem(props: jobAdProps) {

    const navigate = useNavigate();
    const { setSelectedJob } = useContext(SelectedJobContext);

    return (
        <>
            <div className="job-item-container" onClick={() => setSelectedJob(props.job)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <WorkIcon style={{ marginTop: '5px' }} color="disabled" />
                    <span style={{ fontFamily: 'Roboto', fontWeight: '500', margin: '5px 0px 0px 10px', fontSize: '17px'}}>{props.job.title}</span>
                </div>
                <div style={{margin: '8px 30px'}}>
                    <div style={{ fontFamily: 'Roboto', fontWeight: '400', color: 'grey', marginBottom: '4px' }}>Created on: {(new Date(props.job.creationDate)).toLocaleDateString("en-GB")}</div>
                    <div style={{ fontFamily: 'Roboto', fontWeight: '400', color: 'grey' }}>Closing date: {(new Date(props.job.endDate)).toLocaleDateString("en-GB")}</div>
                </div>
            </div>
            <Divider />
        </>
    )
}

interface jobAdProps {
    job: jobDTO;
}