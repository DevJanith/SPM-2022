import { Button, Grid, MenuItem, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Form, FormikProvider, useFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export default function MobilePayment(props) {

    const {
        paymentType,
        setPaymentType
    } = props

    const initialValues = {
        paymentType: paymentType,
        mobileNo: ''
    }

    const InitialRegisterSchema = Yup.object().shape({
        paymentType: Yup.string().required("Payment Type Field Can not be Empty"),
        mobileNo: Yup.string().required("Mobile No Can not be Empty")
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
                            <TextField
                                fullWidth
                                label="Mobile Number"
                                {...getFieldProps('mobileNo')}
                                error={Boolean(touched.mobileNo && errors.mobileNo)}
                                helperText={touched.mobileNo && errors.mobileNo}
                                inputProps={{
                                    startAdornment: <InputAdornment position="start">+ 94</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item md={4}>
                        </Grid>
                        <Grid item md={4}>
                            <Button fullWidth size="large" type="submit" variant="contained" loading={false}>
                                Pay via Mobile
                            </Button>
                        </Grid>
                        <Grid item md={4}>
                            <Button fullWidth size="large" type="button" variant="outlined" loading={false} onClick={() => { setPaymentType("initial") }}>
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </>
    )

}
