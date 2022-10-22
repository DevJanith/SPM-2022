import { Button, Grid, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { signUp } from '../../../../api';
import Iconify from '../../../../components/Iconify';
import { authenticate } from '../../../../pages/Project/UserManagement/Session';

export default function BuyerRegisterForm(props) {
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
  const [showPassword, setShowPassword] = useState(false);

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
    password: '',
    confirmPassword: '',
    type: userType,
    userFirstName: '',
    userLastName: '',
    userContactNumber: '',
    userAddressLine1: '',
    userAddressLine2: '',
    userAddressLine3: '',
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email Must be a Valid email address').required("Email Field Can not be Empty"),
    password: Yup.string().min(6, 'Too Short!').max(8, 'Too Long!').required("Password Field Can not be Empty"),
    confirmPassword: Yup.string().min(6, 'Too Short!').max(8, 'Too Long!').required("Confirm Password Field Can not be Empty"),
    type: Yup.string().required("Type Field Can not be Empty"),
    userFirstName: Yup.string().required("First Name Field Can not be Empty"),
    userLastName: Yup.string().required("Last Name Field Can not be Empty"),
    userContactNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    // : Yup.string().required("Contact Number Field Can not be Empty")
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setIsPending(true)
      RegisterUser(values)
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
        :
        <>
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
                        <Alert severity="success">Registration Successful !</Alert>
                      </Grid>
                      <Grid item md={12}>
                        <Alert severity="info">Use , User Name:  <span style={{ fontSize: "16px", fontWeight: "bold" }}>{successData.result.email}</span> and <span style={{ fontSize: "16px", fontWeight: "bold", color: "red" }}> registered Password </span> as you're user credentials.   </Alert>
                      </Grid>
                      <Grid item md={12}>
                        <Button fullWidth size="large" type="button" variant="contained" loading={isPending} onClick={() => { navigate("/login") }} >
                          Back to Sign In
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
                            // autoComplete="current-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            {...getFieldProps('password')}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <TextField
                            fullWidth
                            // autoComplete="current-confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            label="Confirm Password"
                            {...getFieldProps('confirmPassword')}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
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
                        <Grid item md={2}>
                          <TextField
                            fullWidth
                            label="Address Line 01"
                            {...getFieldProps('userAddressLine01')}
                            error={Boolean(touched.userAddressLine01 && errors.userAddressLine01)}
                            helperText={touched.userAddressLine01 && errors.userAddressLine01}
                          />
                        </Grid>
                        <Grid item md={5}>
                          <TextField
                            fullWidth
                            label="Address Line 02"
                            {...getFieldProps('userAddressLine02')}
                            error={Boolean(touched.userAddressLine02 && errors.userAddressLine02)}
                            helperText={touched.userAddressLine02 && errors.userAddressLine02}
                          />
                        </Grid>
                        <Grid item md={5}>
                          <TextField
                            fullWidth
                            label="Address Line 03"
                            {...getFieldProps('userAddressLine03')}
                            error={Boolean(touched.userAddressLine03 && errors.userAddressLine03)}
                            helperText={touched.userAddressLine03 && errors.userAddressLine03}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <Button fullWidth size="large" type="submit" variant="contained" loading={isPending}>
                            Register
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
