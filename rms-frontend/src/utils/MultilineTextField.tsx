import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

export default function MultilineTextField(props: multilineFieldProps) {
    const { values, validateForm, touched, errors } = useFormikContext<any>();

    return (
        <TextField
            style={props.style}
            id={props.id}
            name={props.id}
            label={props.label}
            value={values[props.id]}
            onChange={props.onChange}
            helperText={touched[props.id] ? errors[props.id]?.toString() : ""}
            error={touched[props.id] && Boolean(errors[props.id])}
            multiline
            minRows={props.minRows}
            maxRows={40}
        />
    )
}

interface multilineFieldProps {
    id: string;
    label: string;
    onChange: any;
    style?: object;
    minRows?: number;
}

MultilineTextField.defaultProps = {
    minRows: 1
}