import { Button, Grid, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Form, FormikProvider, useFormik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signUp } from '../../../actions/auth';
import Iconify from '../../../components/Iconify';


export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("buyer");

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    type: '',
    userFirstName: '',
    userLastName: '',
    userContactNumber: '',
    userAddressLine1: '',
    userAddressLine2: '',
    userAddressLine3: '',
  }

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email Must be a Valid email address').required("Email Field Can not be Empty"),
    password: Yup.string().min(6, 'Too Short!').max(8, 'Too Long!').required("Password Field Can not be Empty"),
    confirmPassword: Yup.string().min(6, 'Too Short!').max(8, 'Too Long!').required("Confirm Password Field Can not be Empty"),
    type: Yup.string().required("Type Field Can not be Empty"),
    userFirstName: Yup.string().required("First Name Field Can not be Empty"),
    userLastName: Yup.string().required("Last Name Field Can not be Empty"),
    userContactNumber: Yup.string().required("Contact Number Field Can not be Empty")
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(signUp(values))
    }
  });


  const { errors, touched, isSubmitting, getFieldProps } = formik;

  switch (userType) {
    case "buyer":
      return (
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
                    // onChange={(e) => {
                    //   console.log(e.target.value);
                    //   setUserType(e.target.value)
                    // }}
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
                  <Button fullWidth size="large" type="submit" variant="contained" loading={false}>
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </>
      );
      break;
    case "trader":
      return (
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
                  <Button fullWidth size="large" type="submit" variant="contained" loading={false}>
                    Request to Become a Trader
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </>
      );
      break;
    default:
      return (
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
                <Grid item md={12}>
                  <Alert severity="info">Select a User Type</Alert>
                </Grid>
                <Grid item md={12}>
                  <Button fullWidth size="large" type="submit" variant="contained" loading={false} disabled={userType == "initial" && true}>
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </>
      )
      break;
  }

}
