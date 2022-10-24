import { Stack } from "@mui/material";
import { jobDTO } from "./job.model";
import JobAd from "./JobAd";

export default function JobsList(props: jobsListProps){
    return(
        <>
        <Stack sx={{width: '800px', margin: '10px auto'}} spacing={2}>
            {props.jobs.map((value, index) => <JobAd key={index} job={value}/>)}
        </Stack>
        </>
    )
}

interface jobsListProps {
    jobs: jobDTO[];
}