import { Propane } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { FormikProps, useFormikContext } from "formik";

export default function CustomTextField(props: customTextFieldProps) {

    const { values, validateForm, touched, errors } = useFormikContext<any>();

    return (
        <TextField style={props.style}
            fullWidth
            id={props.id}
            name={props.id}
            label={props.label}
            value={values[props.id]}
            onChange={props.onChange}
            helperText={touched[props.id] ? errors[props.id]?.toString(): ""}
            error={touched[props.id] && Boolean(errors[props.id])}
        />
    )
}

interface customTextFieldProps {
    id: string;
    label: string;
    onChange: any;
    style?: object;
}

CustomTextField.defaultProps = {
    style: {}
}