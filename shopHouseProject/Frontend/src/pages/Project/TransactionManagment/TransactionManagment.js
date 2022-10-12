import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import Page from '../../../components/Page';
import Transaction from './Transaction';

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

export default function TransactionManagement() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Page title="Transaction Management">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Transaction" {...a11yProps(0)} />
                        {/* <Tab label="Create Transaction" {...a11yProps(1)} />
                        <Tab label="Update Transaction" {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Transaction />
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    <h1>Transaction Create</h1>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <h1>Transaction Update</h1>
                </TabPanel> */}
            </Box>
        </Page>
    );
}
