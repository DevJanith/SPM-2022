import { Button, Card, CardContent, Container, Grid, IconButton, InputAdornment, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Iconify from '../../../components/Iconify';
import { fetchUser, userUpdate } from '../../../api';
import Page from '../../../components/Page';

export default function UserApprove() {

    const dispatch = useDispatch();
    const { id } = useParams()
    let navigate = useNavigate()

    const [successData, setSuccessData] = useState()
    const [errorData, setErrorData] = useState()
    const [isSuccess, setIsSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [isError, setIsError] = useState(false)

    const [successEditData, setSuccessEditData] = useState()
    const [errorEditData, setErrorEditData] = useState()
    const [isEditSuccess, setIsEditSuccess] = useState(false)
    const [isEditPending, setIsEditPending] = useState(false)
    const [isEditError, setIsEditError] = useState(false)

    const getUser = async (values) => { 
        setIsPending(true)

        await dispatch(
            fetchUser(values)
                .then((response) => { 
                    setSuccessData(response.data.result)
                    setIsPending(false)
                    setIsSuccess(true)
                })
                .catch((errors) => {
                    setErrorData(errors.response)
                    setIsPending(false)
                    setIsError(true)
                }))
    }

    const approveUser = async () => {
        setIsEditPending(true)

        const data = successData

        data.states = "1"

        await dispatch(
            userUpdate(id, data)
                .then((response) => {
                    console.log(response);
                    setSuccessEditData(response.data.result)
                    setIsEditPending(false)
                    setIsEditSuccess(true)
                })
                .catch((errors) => {
                    setErrorData(errors.response)
                    setIsEditPending(false)
                    setIsEditError(true)
                }))
    }

    useEffect(() => {
        getUser(id)
        return
    }, [isEditSuccess])



    return (
        <Page title="User-Approve">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User Approve
                    </Typography>
                </Stack>

                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={5}>
                                <img src={"https://cife.edu.mx/wp-content/uploads/2021/11/evaluacion-1.png"} alt={"approve User"}
                                    style={{
                                        "width": "100vh",
                                        // "border-radius": "30%",
                                        "object-fit": "cover",
                                        // "border": "1px solid #ffb401"
                                    }}
                                />
                            </Grid>
                            <Grid item md={7}>
                                <>
                                    {(isPending == true || isEditPending == true) ? <>
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box>
                                    </>
                                        :
                                        <>
                                            {isEditError ? <>
                                                <Grid container spacing={2}>
                                                    <Grid item md={12}>
                                                        {(typeof errorEditData != "undefined" && errorEditData != null) && <>
                                                            <Alert severity="error">{errorEditData.data.message}</Alert>
                                                        </>}
                                                    </Grid>
                                                    <Grid item md={12}>
                                                        <Button fullWidth size="large" type="button" variant="contained" loading={isEditPending} onClick={() => { navigate("/dashboard/user-management") }} >
                                                            Back to User Management
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </>
                                                :
                                                <>
                                                    {isEditSuccess ? <>
                                                        {(typeof successEditData != "undefined" && successEditData != null)
                                                            &&
                                                            <>
                                                                <Grid container spacing={2}>
                                                                    <Grid item md={12}>
                                                                        <Alert severity="success">User Approve Successful !</Alert>
                                                                    </Grid>
                                                                    <Grid item md={12}>
                                                                        <Alert severity="info">Email sent to -{`>`} User, User Name:  <span style={{ fontSize: "16px", fontWeight: "bold" }}>{successEditData.email}</span>     </Alert>
                                                                    </Grid>
                                                                    <Grid item md={12}>
                                                                        <Button fullWidth size="large" type="button" variant="contained" loading={isPending} onClick={() => { navigate("/dashboard/user-management/") }} >
                                                                            Back to User Management
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </>
                                                        }
                                                    </>
                                                        :
                                                        <>
                                                            {
                                                                (typeof successData != "undefined" || successData != null) &&
                                                                <>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={12}>
                                                                            <TextField id="outlined-basic" label="User Name" variant="outlined" value={successData.email} disabled fullWidth />
                                                                        </Grid>
                                                                        <Grid item md={12}>
                                                                            <Paper elevation={3}>
                                                                                <fieldset style={{ border: "none" }}>
                                                                                    <legend>User Details</legend>
                                                                                    <Grid container spacing={2} style={{ padding: "4%" }}>
                                                                                        <Grid item md={12}>
                                                                                            <TextField id="outlined-basic" label="Full Name" variant="outlined" value={successData.userDetails.userName} disabled fullWidth />
                                                                                        </Grid>
                                                                                        <Grid item md={12}>
                                                                                            <TextField id="outlined-basic" label="Email Address" variant="outlined" value={successData.userDetails.userEmail} disabled fullWidth />
                                                                                        </Grid>
                                                                                        <Grid item md={12}>
                                                                                            <TextField id="outlined-basic" label="Contact Number" variant="outlined" value={successData.userDetails.userContactNumber} disabled fullWidth />
                                                                                        </Grid>
                                                                                        <Grid item md={12}>
                                                                                            <TextField id="outlined-basic" label="Address" variant="outlined" value={successData.userDetails.userAddress} disabled fullWidth />
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </fieldset>
                                                                            </Paper>
                                                                        </Grid>
                                                                        <Grid item md={12}>
                                                                            <Button fullWidth size="large" type="button" variant="contained" loading={isPending} onClick={() => {approveUser()}}>
                                                                                Approve Trader
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </>
                                            }
                                        </>
                                    }
                                </>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </Page>
    );
}
