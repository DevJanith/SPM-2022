import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import Page from '../../../components/Page';
import Invoice from './Invoice';
import Payment from "./Payment";

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

export default function PaymentManagement() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [cartData, setCartData] = React.useState([])
    const [userData, setUserData] = React.useState(null)

    React.useEffect(() => {
        try {
            setCartData(JSON.parse(sessionStorage.getItem("cartData")))
            setUserData(JSON.parse(sessionStorage.getItem("token")))

        } catch (error) {
            console.log(error)
        }
    }, []) 

    return (
        <Page title="Payment Management">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Invoice" {...a11yProps(0)} />
                        <Tab label="Payment" {...a11yProps(1)} />
                        {/* <Tab label="Cart" {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Invoice
                        cartData={cartData}
                        setCartData={setCartData}
                        userData={userData}
                        setUserData={setUserData}
                        value={value}
                        setValue={setValue}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Payment
                        cartData={cartData}
                        setCartData={setCartData}
                        userData={userData}
                        setUserData={setUserData}
                        value={value}
                        setValue={setValue}
                    />s
                </TabPanel>
                {/* <TabPanel value={value} index={2}>
                <Cart cart={cart} setCart={setCart} />
            </TabPanel> */}
            </Box>
        </Page>
    );
}
