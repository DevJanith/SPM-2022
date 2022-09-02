import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createItem } from "../../../../actions/item.action";
import { toast } from "react-toastify";

export default function ItemCreateForm(props) {

  const {
    items,
    itemData,
    setItemData,
    handleSubmitForm,
    clear,
    currentId,
    setCurrentId,
    value,
    setValue,
    notify
  } = props

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
    name: Yup.string().required('Name is required'),
    qty: Yup.string().required('Quantity is required'),
    price: Yup.string().required('Price is required'),
    description: Yup.string().required('Description is required'),
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      qty: '',
      price: '',
      description: '',
    },
    validationSchema: ItemSchema,
    onSubmit: (data, { resetForm }) => {
      console.log("test item form submit click")
      data.traderId = userData?.result?.traderId
      dispatch(createItem(data));
      notify()
      resetForm()
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
          </Stack>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
        </Stack>

        <div style={{ display: "flex", direction: "row", marginTop: "2%" }}>
          <LoadingButton style={{ margin: "2%" }} fullWidth size="large" type="button" variant="contained" >
            Cancel
          </LoadingButton>
          <LoadingButton style={{ margin: "2%" }} fullWidth size="large" type="submit" variant="contained" >
            Save
          </LoadingButton>
        </div>

      </Form>
    </FormikProvider>
  );
}
