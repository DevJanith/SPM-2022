import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createPayment } from "../../../../actions/payment.action"

export default function PaymentCardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userDataLocal = JSON.parse(sessionStorage.getItem('token'));
    if (userDataLocal) {
      setUserData(userDataLocal);
    }
  }, []);


  const ItemSchema = Yup.object().shape({
    cardNumber: Yup.string().required('Card Number is required'),
    cardholdersName: Yup.string().required('Card Holders Name is required'),
    cardExpiryDate: Yup.string().required('Expiry Date is required'),
    cardCvv: Yup.string().required('CVV is required'),
  });


  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardholdersName: '',
      cardExpiryDate: '',
      cardCvv: '',
    },
    validationSchema: ItemSchema,
    onSubmit: (data) => {
      console.log("test item form submit click")


      data.paymentType = "card"
      data.buyerId = userData?.result?.buyerId

      console.log(data)

      dispatch(createPayment(data));
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Card Number"
            {...getFieldProps('cardNumber')}
            error={Boolean(touched.cardNumber && errors.cardNumber)}
            helperText={touched.cardNumber && errors.cardNumber}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Card Holders Name"
              {...getFieldProps('cardholdersName')}
              error={Boolean(touched.cardholdersName && errors.cardholdersName)}
              helperText={touched.cardholdersName && errors.cardholdersName}
            />
            <TextField
              fullWidth
              label="Card expiry Date"
              {...getFieldProps('cardExpiryDate')}
              error={Boolean(touched.cardExpiryDate && errors.cardExpiryDate)}
              helperText={touched.cardExpiryDate && errors.cardExpiryDate}
            />
            <TextField
              fullWidth
              label="CVV"
              {...getFieldProps('cardCvv')}
              error={Boolean(touched.cardCvv && errors.cardCvv)}
              helperText={touched.cardCvv && errors.cardCvv}
            />
          </Stack>
        </Stack>

        <div style={{ display: "flex", direction: "row", marginTop: "2%" }}>
          <LoadingButton style={{ margin: "2%" }} fullWidth size="large" type="button" variant="contained" >
            Cancel
          </LoadingButton>
          <LoadingButton style={{ margin: "2%" }} fullWidth size="large" type="submit" variant="contained" >
            Pay
          </LoadingButton>
        </div>

      </Form>
    </FormikProvider>
  );
}
