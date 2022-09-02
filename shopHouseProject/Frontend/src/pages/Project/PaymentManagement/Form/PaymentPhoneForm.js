import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createPayment} from "../../../../actions/payment.action"

export default function PaymentPhoneForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userDataLocal = JSON.parse(localStorage.getItem('profile'));
    if (userDataLocal) {
      setUserData(userDataLocal);
    }
  }, []);


  const ItemSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('Phone Number is required'),
  });


  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: ItemSchema,
    onSubmit: (data) => {
      console.log("test item form submit click")


      data.paymentType = "phone"
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
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Item name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label="Item Quantity"
              {...getFieldProps('qty')}
              error={Boolean(touched.qty && errors.qty)}
              helperText={touched.qty && errors.qty}
            />
            <TextField
              fullWidth
              label="Item Price"
              {...getFieldProps('price')}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
            />
          </Stack> */}
          <TextField
            fullWidth
            multiline
            label="phoneNumber"
            {...getFieldProps('phoneNumber')}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />
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
