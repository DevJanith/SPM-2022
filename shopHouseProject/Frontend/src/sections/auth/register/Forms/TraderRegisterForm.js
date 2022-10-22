import { Button, Grid, MenuItem, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { signUp } from '../../../../api';
import { authenticate } from '../../../../pages/Project/UserManagement/Session';

export default function TraderRegisterForm(props) {
  const {
    userType,
    setUserType
  } = props

  const dispatch = useDispatch();
  let navigate = useNavigate()

  const [successData, setSuccessData] = useState()
  const [errorData, setErrorData] = useState()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)

  const RegisterUser = async (values) => {
    console.log(values);
    setIsPending(true)

    await dispatch(
      signUp(values)
        .then((response) => {
          console.log(response);
          authenticate(response.data)
          setSuccessData(response.data)
          setIsPending(false)
          setIsSuccess(true)
        })
        .catch((errors) => {
          console.log(errors);
          setErrorData(errors.response)
          setIsPending(false)
          setIsError(true)
        }))
  }

  useEffect(() => {
    if (isSuccess == true || isError == true) {
      console.log("form sent to initial state");
    }
  }, [isSuccess, isError])


  const initialValues = {
    email: '',
    type: userType,
    userFirstName: '',
    userLastName: '',
    userContactNumber: '',
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email Must be a Valid email address').required("Email Field Can not be Empty"),
    type: Yup.string().required("Type Field Can not be Empty"),
    userFirstName: Yup.string().required("First Name Field Can not be Empty"),
    userLastName: Yup.string().required("Last Name Field Can not be Empty"),
    userContactNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    // userContactNumber: Yup.string().required("Contact Number Field Can not be Empty")
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      RegisterUser(values)
      // dispatch(signUp(values))
    }
  });


  const { errors, touched, isSubmitting, getFieldProps } = formik;

  return (
    <>
      {isPending ? <>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </>
        : <>
          {isError ? <>
            <Grid container spacing={2}>
              <Grid item md={12}>
                {(typeof errorData != "undefined" && errorData != null) && <>
                  <Alert severity="error">{errorData.data.message}</Alert>
                </>}
              </Grid>
              <Grid item md={12}>
                <Button fullWidth size="large" type="button" variant="contained" loading={isPending} onClick={() => { navigate("/login") }} >
                  Back to Sign In Page
                </Button>
              </Grid>
            </Grid>
          </>
            :
            <>
              {isSuccess ? <>
                {(typeof successData != "undefined" && successData != null)
                  &&
                  <>
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                        <Alert severity="success">Trader Requested Successfully !</Alert>
                      </Grid>
                      <Grid item md={12}>
                        <Alert severity="info">Please wait, the Admin will approve trader and will sent email to <span style={{ fontSize: "16px", fontWeight: "bold" }}>{successData.result.email}</span> with user credentials. <span style={{ fontSize: "16px", fontWeight: "bold", color: "red" }}>(approximate time :  with in a 01 day)</span> </Alert>
                      </Grid>
                      <Grid item md={12}>
                        <Button fullWidth size="large" type="button" variant="contained" loading={isPending} onClick={() => { navigate("/") }} >
                          Back to Home Page
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                }
              </>
                :
                <>
                  <FormikProvider value={formik} >
                    <Form autoComplete="off" noValidate >
                      <Grid container spacing={2}>
                        <Grid item md={12}>
                          <TextField
                            fullWidth
                            select
                            label="User Type"
                            {...getFieldProps('type')}
                            error={Boolean(touched.type && errors.type)}
                            helperText={touched.type && errors.type}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setUserType(e.target.value)
                            }}
                          >
                            <MenuItem key={1} value={"buyer"}>
                              Buyer
                            </MenuItem>
                            <MenuItem key={2} value={"trader"}>
                              Trader
                            </MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            fullWidth
                            label="First name"
                            {...getFieldProps('userFirstName')}
                            error={Boolean(touched.userFirstName && errors.userFirstName)}
                            helperText={touched.userFirstName && errors.userFirstName}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            fullWidth
                            label="Last name"
                            {...getFieldProps('userLastName')}
                            error={Boolean(touched.userLastName && errors.userLastName)}
                            helperText={touched.userLastName && errors.userLastName}
                          />
                        </Grid>
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
                            label="Contact Number"
                            {...getFieldProps('userContactNumber')}
                            error={Boolean(touched.userContactNumber && errors.userContactNumber)}
                            helperText={touched.userContactNumber && errors.userContactNumber}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <Button fullWidth size="large" type="submit" variant="contained" loading={isPending}>
                            Request to Become a Trader
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  </FormikProvider>
                </>
              }
            </>
          }
        </>
      }
    </>
  );

}
