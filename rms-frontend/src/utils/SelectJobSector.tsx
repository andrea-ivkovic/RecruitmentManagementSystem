import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { urlJobs } from "../endpoints";
import { jobSectorDTO } from "../job/job.model";

export default function SelectJobSector(props: customDatePickerProps) {


    const { values, validateForm, touched, errors, setFieldValue } = useFormikContext<any>();

    const [sectors, setSectors] = useState<jobSectorDTO[]>();

    useEffect(() => {
        axios.get(`${urlJobs}/jobSectors`)
            .then((response: AxiosResponse<jobSectorDTO[]>) => {
                setSectors(response.data);
            })
    }, []);

    return (
        <>
            {sectors ?
                <FormControl fullWidth>
                    <InputLabel id="select-label">Sector</InputLabel>
                    <Select
                        labelId="select-label"
                        label="Sector"
                        name="jobSectorId"
                        value={values[props.id]}
                        onChange={e => {
                            setFieldValue("jobSectorId", e.target.value);
                        }}
                        error={touched[props.id] && Boolean(errors[props.id])}
                    >
                        {sectors.map(sector => <MenuItem value={sector.id.toString()} key={sector.id}>{sector.name}</MenuItem>)}
                    </Select>
                    <FormHelperText style={{color: '#d32f2f'}}>{touched[props.id] ? errors[props.id]?.toString(): ""}</FormHelperText>
                </FormControl> : null}

        </>
    )
}

interface customDatePickerProps {
    id: string;
    style?: object;
    size?: "small" | "medium";
    variant?: "outlined" | "standard";
}