import { useFormikContext } from "formik";

export default function DateField(props: dateFieldProps) {

    const { values, validateForm, touched, errors } = useFormikContext<any>(); // in values we have access to initialValues (precisely actorCreationDTO) from ActorForm.tsx 

    return (
        <div>
            <label htmlFor={props.field}>{props.displayName}</label>
            <input type="date" className="form-control"
                id={props.field}
                name={props.field}
                defaultValue={values[props.field]?.toLocaleDateString('en-CA')}
                onChange={e => {
                    const date = new Date(e.currentTarget.value + 'T00:00:00');
                    values[props.field]= date; //we need to change the value in the object that formik manages
                    //what we are saying here is basically values.dateOfBirth=date or values["dateOfBirth"]=date
                    validateForm();
                }}
            />
            {touched[props.field]  && errors[props.field] 
            ? <div className="text-danger">{errors[props.field]?.toString()}</div> 
            : null}
            {/*this way we are asking formik if the user has already interacted with specific field which we are working with*/}
        </div>
    )
}

interface dateFieldProps {
    field: string;
    displayName: string;
}