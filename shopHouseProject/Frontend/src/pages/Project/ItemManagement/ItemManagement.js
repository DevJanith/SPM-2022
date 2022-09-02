import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, getItems, updateItem } from "../../../actions/item.action";
import Page from '../../../components/Page';
import Item from './Item';
import ItemCreate from './ItemCreate';
import ItemUpdate from './ItemUpdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

export default function ItemManagement() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        // console.log(newValue)
        setValue(newValue);
    };

    const dispatch = useDispatch();
    const [itemData, setItemData] = useState({
        name: '',
        qty: '',
        price: '',
        description: '',
    });
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        if (currentId != 0) {
            setValue(2)
        }
    }, [currentId])

    useEffect(() => {
        try {
            dispatch(getItems());
        } catch (error) {
            console.log(error);
        }
    }, [value]);

    const items = useSelector((state) => state.itemReducer);

    const itemFormData = useSelector((state) => (currentId ? state.itemReducer.find((data) => data.id === currentId) : null));

    useEffect(() => {
        if (itemFormData) {
            setItemData(itemFormData);
        }
    }, [itemFormData]);

    // console.log(currentId)
    // console.log(itemData)

    const clear = () => {
        setCurrentId(0);
        setItemData({
            name: '',
            qty: '',
            price: '',
            description: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createItem(itemData));
            clear();
        } else {
            dispatch(updateItem(currentId, itemData));
            clear();
        }
    };

    const notify = () => {
        toast('Item Update Success!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    };

    return (
        <Page title="Item Management">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Item" {...a11yProps(0)} />
                        <Tab label="Item Create" {...a11yProps(1)} />
                        <Tab label="Item Update" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Item
                        items={items}
                        itemData={itemData}
                        setItemData={setItemData}
                        handleSubmit={handleSubmit}
                        clear={clear}
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        value={value}
                        setValue={setValue}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ItemCreate
                        itemData={itemData}
                        setItemData={setItemData}
                        handleSubmit={handleSubmit}
                        clear={clear}
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        value={value}
                        setValue={setValue}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ItemUpdate
                        itemData={itemData}
                        setItemData={setItemData}
                        handleSubmit={handleSubmit}
                        clear={clear}
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        value={value}
                        setValue={setValue}
                        notify={notify}
                    />
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
