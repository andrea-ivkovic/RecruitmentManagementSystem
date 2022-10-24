import { Box, Step, StepLabel } from "@mui/material";
import { jobDTO } from "../job/job.model";
import Stepper from '@mui/material/Stepper';

export default function CustomStepper(props: stepperProps) {

    const steps = [
        'Open',
        'Candidates Selection',
        'Closed',
    ];

    function getCurrentStep(){
        const currentDate = new Date();
        const closingDate = new Date(props.job.endDate);

        if(props.job.archived == true){
            return 3;
        }
        else if(props.job.archived == false && closingDate>currentDate){
            return 0;
        }
        else if(props.job.archived == false && closingDate<currentDate){
            return 1;
        }
        else 
            return -1;
    }

    


    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={getCurrentStep()} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </>
    )
}

interface stepperProps {
    job: jobDTO;
}