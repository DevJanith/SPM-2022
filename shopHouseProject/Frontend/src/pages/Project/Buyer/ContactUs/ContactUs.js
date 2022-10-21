import { Button, Card, CardContent, Grid, TextField, Paper, Typography, Divider } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Container } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Page from '../../../../components/Page';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import map from "./images/map.jpg"

export default function ContactUs(props) {

  const dispatch = useDispatch();
  let navigate = useNavigate()
  const [contactUs, setContactUs] = useState(false)

  const initialValues = {
    email: '',
    desc: ""
  }

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email Must be a Valid email address').required("Email Field Can not be Empty"),
    desc: Yup.string().required("Description Can not be Empty"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setContactUs(true)
    }
  });


  const { errors, touched, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <Page title="Home">
        <Container maxWidth="xl">
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography variant="h2" gutterBottom textAlign={"center"}  >
                    Contact Us
                  </Typography>
                  <Divider variant="middle" />
                </Grid>
                <Grid item md={6}>
                  <div style={{ display: "flex", padding: "0 0 0 2%" }}>
                    <div style={{ flex: 0.5, flexDirection: "column" }}>
                      <div><MarkEmailReadOutlinedIcon color='primary' style={{ margin: "10px 20px 0 0", fontSize: "40px", backgroundColor: "#0095ff", color: "white", borderRadius: "45px", padding: "6px" }} /></div>
                      <div><BusinessOutlinedIcon color='primary' style={{ margin: "10px 20px 0 0", fontSize: "40px", backgroundColor: "#0095ff", color: "white", borderRadius: "45px", padding: "6px" }} /></div>
                      <div><LocalPhoneOutlinedIcon color='primary' style={{ margin: "10px 20px 0 0", fontSize: "40px", backgroundColor: "#0095ff", color: "white", borderRadius: "45px", padding: "6px" }} /></div>
                    </div>
                    <div style={{ flex: 1, flexDirection: "column" }}>
                      <div style={{ margin: "20px 20px 0 0", fontSize: "20px", fontWeight: "bold" }}>Email Address</div>
                      <div style={{ margin: "20px 20px 0 0", fontSize: "20px", fontWeight: "bold" }}>Contact Number</div>
                      <div style={{ margin: "20px 20px 0 0", fontSize: "20px", fontWeight: "bold" }}>Address </div>
                    </div>
                    <div style={{ flex: 2, flexDirection: "column" }}>
                      <div style={{ margin: "20px 20px 0 0" }}>: shophouse110@gmail.com </div>
                      <div style={{ margin: "20px 20px 0 0" }}>: +94 76 852 3525</div>
                      <div style={{ margin: "20px 20px 0 0" }}>: No 50, Temple Rd, Maharagama</div>
                    </div>
                  </div>
                </Grid>
                <Grid md={6} >
                  {contactUs ? <>
                    <Grid container spacing={2} style={{ padding: "4%" }}>
                      <Grid item md={12}>
                        <Alert severity="success">Requested Successfully !</Alert>
                      </Grid>
                      <Grid item md={12}>
                        <Button fullWidth size="large" type="button" variant="contained" loading={false} onClick={() => { setContactUs(false) }} >
                          Another Request
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                    :
                    <>
                      <FormikProvider value={formik} >
                        <Form autoComplete="off" noValidate >
                          <Grid container spacing={2} style={{ padding: "4%" }}>
                            <Grid item md={12}>
                              <TextField
                                fullWidth
                                label="Email Address"
                                {...getFieldProps('email')}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                              />
                            </Grid>
                            <Grid item md={12}>
                              <TextField
                                fullWidth
                                label="Description"
                                {...getFieldProps('desc')}
                                error={Boolean(touched.desc && errors.desc)}
                                helperText={touched.desc && errors.desc}
                              />
                            </Grid>
                            <Grid item md={12}>
                              <Button fullWidth size="large" type="submit" variant="contained" loading={false}>
                                Submit
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      </FormikProvider>
                    </>
                  }
                </Grid>
                <Grid item md={12}>
                  <img src={map} style={{ width: "100%", height: "350px" }} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Page>
    </>
  );

}
