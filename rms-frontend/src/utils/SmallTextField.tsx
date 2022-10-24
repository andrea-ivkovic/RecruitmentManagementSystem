import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

export default function SmallTextField(props: smallTextFieldProps) {

    const { values, validateForm, touched, errors } = useFormikContext<any>();

    return (
        <>
            <TextField
                size="small"
                variant="standard"
                InputProps={{
                    readOnly: props.readOnly
                }}
                style={props.style}
                fullWidth
                id={props.id}
                name={props.id}
                label={props.label}
                value={values[props.id]}
                onChange={props.onChange}
                helperText={touched[props.id] ? errors[props.id]?.toString() : ""}
                error={touched[props.id] && Boolean(errors[props.id])}
            />
        </>
    )
}

interface smallTextFieldProps {
    id: string;
    label: string;
    onChange: any;
    style?: object;
    readOnly?: boolean;
}
SmallTextField.defaultProps ={
    readonly: false
}