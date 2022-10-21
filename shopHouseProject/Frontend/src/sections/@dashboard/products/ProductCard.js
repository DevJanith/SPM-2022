import PropTypes from 'prop-types';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

ShopProductCard.propTypes = {
  product: PropTypes.object,
  page: ""
};

export default function ShopProductCard({ product, page }) {
  const { name, cover, price, colors, status, qty, desc } = product;

  let navigate = useNavigate()

  return (
    <>
      {page == "home" ? <>
        <Card style={{ cursor: "pointer" }} onClick={() => { navigate(`/login`) }}>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            {status && (
              <Label
                variant="filled"
                color={(status === 'sale' && 'error') || 'info'}
                sx={{
                  zIndex: 9,
                  top: 16,
                  right: 16,
                  position: 'absolute',
                  textTransform: 'uppercase',
                }}
              >
                {status}
              </Label>
            )}
            <ProductImgStyle alt={name} src={cover} />
          </Box>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Link to="#" color="inherit" underline="hover" component={RouterLink}>
              <Typography variant="subtitle2" noWrap>
                {name}       &nbsp;    qty : {qty}
              </Typography>
            </Link>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <ColorPreview colors={colors} />
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    marginLeft: "10px"
                    // textDecoration: 'line-through',
                  }}
                >

                </Typography>
                &nbsp;
                {fCurrency(price)}
              </Typography>
            </Stack>
            <Stack direction="column" >
              <Typography variant="h6">
                Description
              </Typography>
              <Typography variant="subtitle1">
                {desc}
                {page == "home" &&
                  <><Button variant="outlined" sx={{ ml: 4 }}>View</Button></>
                }
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </>
        : <>
          <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
              {status && (
                <Label
                  variant="filled"
                  color={(status === 'sale' && 'error') || 'info'}
                  sx={{
                    zIndex: 9,
                    top: 16,
                    right: 16,
                    position: 'absolute',
                    textTransform: 'uppercase',
                  }}
                >
                  {status}
                </Label>
              )}
              <ProductImgStyle alt={name} src={cover} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
              <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                <Typography variant="subtitle2" noWrap>
                  {name}       &nbsp;    qty : {qty}
                </Typography>
              </Link>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <ColorPreview colors={colors} />
                <Typography variant="subtitle1">
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{
                      color: 'text.disabled',
                      marginLeft: "10px"
                      // textDecoration: 'line-through',
                    }}
                  >

                  </Typography>
                  &nbsp;
                  {fCurrency(price)}
                </Typography>
              </Stack>
              <Stack direction="column" >
                <Typography variant="h6">
                  Description
                </Typography>
                <Typography variant="subtitle1">
                  {desc}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </>
      }

    </>
  );
}
