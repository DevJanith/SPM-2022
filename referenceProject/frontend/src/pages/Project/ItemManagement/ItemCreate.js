import {
    Card, Container, Stack, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from '../../../components/Page';
import { ItemCreateForm } from './Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContentStyle = styled('div')(({ theme }) => ({
    margin: '5vh 0',
    display: 'flex',
    flexDirection: 'column',
}));


export default function ItemCreate(props) {

    const {
        items,
        itemData,
        setItemData,
        handleSubmit,
        clear,
        currentId,
        setCurrentId,
        value,
        setValue
    } = props

    const notify = () => {
        toast('Item Creation Success!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <Page title="Item">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Create Item
                    </Typography>
                </Stack>
                <Card>
                    <Container maxWidth="md">
                        <ContentStyle>
                            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter Item details below.</Typography>

                            <ItemCreateForm
                                items={items}
                                itemData={itemData}
                                setItemData={setItemData}
                                handleSubmitForm={handleSubmit}
                                clear={clear}
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                                value={value}
                                setValue={setValue}
                                notify={notify}
                            />
                        </ContentStyle>
                    </Container>
                </Card>
            </Container> 
            {/* <button onClick={notify}>Notify!</button> */}
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
