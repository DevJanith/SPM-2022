import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTutorials } from '../../../actions/tutorial.action';
import Page from '../../../components/Page';


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

export default function TutorialManagement() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        // console.log(newValue)
        setValue(newValue);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(getTutorials());
        } catch (error) {
            console.log(error);
        }
    }, [value]);

    const tutorial = useSelector((state) => state.tutorialReducer);

    console.log(tutorial)
    return (
        <Page title="Tutorial Management">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Tutorial" {...a11yProps(0)} />
                        <Tab label="Tutorial Create" {...a11yProps(1)} />
                        <Tab label="Tutorial Update" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {/* <Item
                        items={items}
                        itemData={itemData}
                        setItemData={setItemData}
                        handleSubmit={handleSubmit}
                        clear={clear}
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        value={value}
                        setValue={setValue}
                    /> */}
                </TabPanel>
                <TabPanel value={value} index={1}>
                </TabPanel>
                <TabPanel value={value} index={2}>
                </TabPanel>
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
        </Page>
    );
}
