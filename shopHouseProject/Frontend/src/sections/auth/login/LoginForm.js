import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel, IconButton, InputAdornment, Link, Stack, TextField, Alert, Grid } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authenticate } from '../../../pages/Project/UserManagement/Session';
import { signIn } from "../../../api";
import Iconify from '../../../components/Iconify';

export default function LoginForm() {
  const dispatch = useDispatch();
  let navigate = useNavigate()

  const [successData, setSuccessData] = useState()
  const [errorData, setErrorData] = useState()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const LoginUser = async (values) => {
    console.log(values);
    setIsPending(true)

    await dispatch(
      signIn(values)
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
    // if (isSuccess == true || isError == true) {
    //   console.log("form sent to initial state");
    // }
    if (isSuccess) {
      navigate('/dashboard/app', { replace: true });
    }
  }, [isSuccess, isError])

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setIsPending(true)
      LoginUser(values)
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      {isError && <>
        <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
          <Grid item md={12}>
            {(typeof errorData != "undefined" && errorData != null) && <>
              <Alert severity="error">{errorData.data.message}</Alert>
            </>}
          </Grid>
        </Grid>
      </>}
      {isSuccess && <>
        <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
          <Grid item md={12}>
            <Alert severity="success">Login Succefully</Alert>
          </Grid>
        </Grid>
      </>}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />

            <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isPending}>
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </>
  );
}
