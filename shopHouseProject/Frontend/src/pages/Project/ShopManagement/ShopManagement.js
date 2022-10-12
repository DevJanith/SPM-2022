import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import Page from '../../../components/Page';
import Cart from './Cart';
import ProductList from './ProductList';
import Products from "./Products";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ShopManagement() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [cart, setCart] = React.useState([])

    const handleClickCartButton = (item) => {

        const id = item.id
        const exist = cart.filter(item => item.id !== id)

        console.log(exist)
        if (exist == null) {
            console.log("test1")
        }
        cart.push(item)
        // console.log(cart)
        // console.log("test" + cart.length)
    }

    return (
        <Page title="Shop Management">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Products" {...a11yProps(0)} />
                        <Tab label="Product List" {...a11yProps(1)} />
                        <Tab label="Cart" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Products setValue={setValue} value={value} cart={cart} setCart={setCart} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ProductList setValue={setValue} value={value} cart={cart} setCart={setCart} handleClickCartButton={handleClickCartButton} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Cart cart={cart} setCart={setCart} />
                </TabPanel>
            </Box>
        </Page>
    );
}
