import {
    Card, Container, Stack, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { ItemUpdateForm } from './Form';
import { useState } from 'react';


const ContentStyle = styled('div')(({ theme }) => ({
    margin: '5vh 0',
    display: 'flex',
    flexDirection: 'column',
}));

export default function ItemUpdate(props) {

    const {
        items,
        itemData,
        setItemData,
        handleSubmit,
        clear,
        currentId,
        setCurrentId,
        value,
        setValue,
        notify
    } = props;

    // const { id } = useParams();

    // console.log(id)

    // const [idd, setIdd] = useState(id ? id : 5) 

    return (
        <Page title="Item">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Update Item
                    </Typography>
                </Stack>
                <Card>
                    <Scrollbar>
                        <Container maxWidth="md">
                            <ContentStyle>
                                <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter Item details below.</Typography>

                                <ItemUpdateForm
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
                    </Scrollbar>
                </Card>
            </Container>
        </Page>
    );
}
