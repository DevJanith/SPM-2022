import { faker } from '@faker-js/faker';
import { Container, Stack, Typography } from '@mui/material';
import { sample } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../../actions/item.action";
import Page from '../../../components/Page';
import { ProductCartWidget, ProductFilterSidebar, ProductList, ProductSort } from '../../../sections/@dashboard/products';
import PRODUCTS from '../../../_mock/products';
import * as React from 'react';
import { styled } from '@mui/material/styles';

export default function EcommerceShop(props) {

  const {
    setValue,
    value,
    cart,
    setCart
  } = props

  const [openFilter, setOpenFilter] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getItems());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const items = useSelector((state) => state.itemReducer);

  const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107', '#0909FF'];

  const products = items.map((item, index) => {
    const setIndex = index + 1;

    return {
      id: item.id,
      cover: `/static/mock-images/fruits/fruits_${setIndex}.jpg`,
      name: item.name,
      price: item.price,
      qty: item.qty,
      desc: item.description,
      priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
      colors:
        (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        (setIndex === 5 && PRODUCT_COLOR.slice(4, 6)) ||
        (setIndex === 6 && PRODUCT_COLOR.slice(5, 7)) ||
        (setIndex === 7 && PRODUCT_COLOR.slice(6, 8)) ||
        (setIndex === 8 && PRODUCT_COLOR.slice(7, 9)) ||
        (setIndex === 9 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 10 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 11 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 12 && PRODUCT_COLOR.slice(3, 6)) ||
        (setIndex === 13 && PRODUCT_COLOR.slice(4, 6)) ||
        (setIndex === 14 && PRODUCT_COLOR.slice(5, 7)) ||
        (setIndex === 15 && PRODUCT_COLOR.slice(6, 8)) ||
        (setIndex === 16 && PRODUCT_COLOR.slice(7, 9)) ||

        PRODUCT_COLOR,
      status: sample(['sale', 'new', '', '']),
    };
  });

  // console.log(products)
  // console.log(PRODUCTS)

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: '#f2f2f2',
    fontSize: '35px',
    padding: theme.spacing(1),
  }));

  return (
    <Page title="Products">
      <Container>
        {/* <Typography variant="h3" sx={{ mb: 4}}>
          Products
        </Typography> */}

        <Div>{"Products"}</Div>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
        <ProductCartWidget setValue={setValue} value={value} cart={cart} setCart={setCart} />
      </Container>
    </Page>
  );
}
