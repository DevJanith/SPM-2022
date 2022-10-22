import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import Checkout from "../../../layout/Checkout"

export default function OnlinePayment(props) {

    const {
        paymentType,
        setPaymentType
    } = props

    const initialValues = {
        paymentType: paymentType
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
                        <Grid item md={4}>
                        </Grid>
                        <Grid item md={4}>
                            <Checkout
                                name={'The Road to learn React'}
                                description={'Only the Book'}
                                amount={1540.00}
                            />
                            {/* <Button fullWidth size="large" type="submit" variant="contained" loading={false}>
                                Pay via Payment Portal
                            </Button> */}
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
