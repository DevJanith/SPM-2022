import { Button, Card, CardContent, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser } from '../../../api';
import Page from '../../../components/Page';

export default function UserEdit() {

    const dispatch = useDispatch();
    const { id } = useParams()
    let navigate = useNavigate()

    const [successData, setSuccessData] = useState()
    const [errorData, setErrorData] = useState()
    const [isSuccess, setIsSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [isError, setIsError] = useState(false)

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

    useEffect(() => {
        getUser(id)
        return
    }, [])



    return (
        <Page title="User-Edit">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User Edit
                    </Typography>
                </Stack>

                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={5}>
                                <img src={"https://img.freepik.com/premium-vector/content-writer-journalist-background-vector-illustration-copy-writing-research-development-idea-novel-book-script-flat-style_2175-1050.jpg"} alt={"approve User"}
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
                                    {(isPending == true) ? <>
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box>
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
                                                            <Button fullWidth size="large" type="button" variant="contained" loading={isPending} onClick={() => { navigate('/dashboard/user-management/') }}>
                                                                Edit
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
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
