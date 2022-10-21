import { Grid, MenuItem, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Form, FormikProvider, useFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';


export default function InitialPayment(props) {

    const {
        paymentType,
        setPaymentType
    } = props

    const initialValues = {
        paymentType: '',
    }

    const InitialRegisterSchema = Yup.object().shape({
        paymentType: Yup.string().required("Payment Type Field Can not be Empty")
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
                                label="Payment Type"
                                {...getFieldProps('paymentType')}
                                error={Boolean(touched.paymentType && errors.paymentType)}
                                helperText={touched.paymentType && errors.paymentType}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setPaymentType(e.target.value)
                                }}
                            >
                                <MenuItem key={1} value={"online"}>
                                    Online Payment
                                </MenuItem>
                                <MenuItem key={2} value={"mobile"}>
                                    Mobile Payment
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item md={12}>
                            <Alert severity="info">Select a Payment Type</Alert>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </>
    )

}
