import { Stack } from "@mui/material";
import { jobDTO } from "../job/job.model";
import JobItem from "./JobItem";

export default function DashboardJobsList(props: jobsListProps){
    return(
        <>
        <Stack sx={{}} spacing={1}>
            {props.jobs.map((value, index) => <JobItem key={index} job={value}/>)}
        </Stack>
        </>
    )
}

interface jobsListProps {
    jobs: jobDTO[];
}