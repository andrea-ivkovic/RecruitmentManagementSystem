import { Alert } from "@mui/material";

export default function DisplayErrors(props: displayErrorProps) {
    return (
        <>
            {props.error ? <Alert variant="filled" sx={{borderRadius: '0px'}} severity="error" onClose={() => {props.setError("")}}>{props.error}</Alert> : null}
        </>
    )
}

interface displayErrorProps {
    error?: string;
    setError(error: string): void;
}