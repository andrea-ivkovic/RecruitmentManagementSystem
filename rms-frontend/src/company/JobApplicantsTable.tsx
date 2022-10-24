import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { applicantJobCreationDTO, applicantJobDTO, jobDTO } from "../job/job.model";
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import axios, { AxiosResponse } from "axios";
import { urlJobs } from "../endpoints";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { convertJobApplicationToFormData } from "../utils/FormDataUtils";

export default function JobApplicantsTable(props: jobApplicantsTableProp) {

    const [rows, setRows] = useState<applicantJobDTO[]>();
    const [searched, setSearched] = useState<string>("");
    const [originalRows, setOriginalRows] = useState<applicantJobDTO[]>();
    const [selectedApplicant, setSelectedApplicant] = useState<applicantJobCreationDTO>();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [assessmentScore, setAssessmentScore] = useState<number>();

    const [refreshScore, setRefreshScore] = useState<number>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get(`${urlJobs}/getApplicants/${props.job.id}`)
            .then((response: AxiosResponse<applicantJobDTO[]>) => {
                setOriginalRows(response.data);
                setRows(response.data);
            });
    }, [props, refreshScore]);

    function requestSearch(value: string) {
        if (originalRows) {
            const filteredRows = originalRows.filter((row) => {
                return row.firstName.toLowerCase().includes(value.toLowerCase()) || row.lastName.toLowerCase().includes(value.toLowerCase());
            });
            setRows(filteredRows);
        }
    }

    function cancelSearch() {
        setSearched("");
        requestSearch("");
    }

    async function changeAssessmentScore(jobApplication: applicantJobCreationDTO) {

        const formData = convertJobApplicationToFormData(jobApplication);
        try {
            console.log(Array.from(formData));
            await axios({
                method: 'put',
                url: `${urlJobs}/addAssessmentScore`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

        }
        catch (error: any) {
            console.log(error.response.data);
        }
        setRefreshScore(jobApplication.assessmentScore);
    }

    return (
        <>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <TextField
                    fullWidth
                    size="small"
                    label="Search"
                    value={searched}
                    onChange={event => {
                        if (event.target.value === '') {
                            cancelSearch();
                        }
                        else {
                            setSearched(event.target.value);
                            requestSearch(event.target.value);
                        }

                    }}
                    sx={{ width: '560px', margin: '10px 0px auto 5px' }}
                />
                <button type="submit" style={{ height: '40px', width: '40px', border: '1px solid grey', borderRadius: '5px', margin: '10px 5px 0px 0px' }}>
                    <SearchIcon color="primary" />
                </button>
            </div>
            <TableContainer component={Paper} style={props.style}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Application Date</TableCell>
                            <TableCell align="right">Assessment Score</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows ? rows.map((row) => (
                            <TableRow hover
                                key={row.userId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.firstName + ' ' + row.lastName}
                                </TableCell>
                                <TableCell align="right">{(new Date(row.dateOfApplication)).toLocaleDateString("en-GB")}</TableCell>
                                <TableCell align="right">{row.assessmentScore?.toFixed(2)}</TableCell>
                                <TableCell align="right">{<button className="dashboard-applicant-edit-button" onClick={() => window.open(`/user-profile/${row.userId}`, '_blank')}><InfoIcon color="primary" /></button>}</TableCell>
                                {props.archive ?

                                    <TableCell align="right">{<button
                                        disabled
                                        className="dashboard-applicant-edit-button"><EditIcon color="disabled" /></button>}
                                    </TableCell>

                                    : <TableCell align="right">{<button
                                        onClick={() => {
                                            setAssessmentScore(row.assessmentScore);
                                            handleClickOpen();
                                            setSelectedApplicant({ userId: row.userId, jobId: props.job.id, dateOfApplication: new Date(row.dateOfApplication), assessmentScore: row.assessmentScore })
                                        }}
                                        className="dashboard-applicant-edit-button"><EditIcon color="primary" /></button>}
                                    </TableCell>

                                }
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <Formik
                    initialValues={{
                        assessmentScore: assessmentScore?.toFixed(2)
                    }}
                    onSubmit={values => {
                        console.log(values);
                        if (selectedApplicant) {
                            const currentValue = {
                                userId: selectedApplicant?.userId,
                                jobId: selectedApplicant?.jobId,
                                dateOfApplication: new Date(selectedApplicant?.dateOfApplication),
                                assessmentScore: Number(values.assessmentScore)
                            };
                            changeAssessmentScore(currentValue);
                        }
                    }}
                >
                    {(formikProps) => (
                        <>
                            <Form id="assessmentScoreForm">
                                <DialogTitle>Assessment Score</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Enter the candidate's assessment score [0.00 - 99.99]
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="assessmentScore"
                                        label="Assessment Score"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={formikProps.values.assessmentScore}
                                        onChange={formikProps.handleChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" form="assessmentScoreForm" onClick={handleClose}>Save</Button>
                                </DialogActions>
                            </Form>
                        </>
                    )}

                </Formik>

            </Dialog>
        </>
    )
}

interface jobApplicantsTableProp {
    job: jobDTO;
    archive?: boolean;
    style?: object;
}

JobApplicantsTable.defaultProps = {
    archive: false,
    style: {maxHeight: '570px'}
}