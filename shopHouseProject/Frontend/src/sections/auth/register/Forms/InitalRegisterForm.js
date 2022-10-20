import { Button, Grid, MenuItem, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Form, FormikProvider, useFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';


export default function InitialRegisterForm(props) {

  const {
    userType,
    setUserType
  } = props
  
  const initialValues = {
    type: '',
  }

  const InitialRegisterSchema = Yup.object().shape({
    type: Yup.string().required("Type Field Can not be Empty")
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: InitialRegisterSchema,
    onSubmit: (values) => { }
  });


  const { errors, touched, isSubmitting, getFieldProps } = formik;

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
          </Grid>
        </Form>
      </FormikProvider>
    </>
  )

}
