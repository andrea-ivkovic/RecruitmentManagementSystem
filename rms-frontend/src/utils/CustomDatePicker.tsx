import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

export default function CustomDatePicker(props: customDatePickerProps) {

    const { values, validateForm, touched, errors, setFieldValue } = useFormikContext<any>();

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DesktopDatePicker
                    label={props.label}
                    inputFormat="DD/MM/YYYY"
                    value={values[props.id]}
                    onChange={(value) => setFieldValue(props.id, value)}
                    renderInput={(params: any) =>
                        <TextField
                            fullWidth
                            size={props.size}
                            variant={props.variant}
                            id={props.id} name={props.id} style={props.style} {...params} />}
                />
            </LocalizationProvider>

        </>
    )
}

interface customDatePickerProps {
    id: string;
    label: string;
    style?: object;
    size?: "small" | "medium";
    variant?: "outlined" | "standard";
}

CustomDatePicker.defaultProps = {
    size: "medium",
    variant: "outlined"
}