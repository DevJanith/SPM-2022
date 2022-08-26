import {
    Card, Container, Stack, Typography
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Page from '../../../components/Page';
import { PaymentCardForm, PaymentGateway, PaymentPhoneForm } from "./Form";
import PaymentInvoice from './PaymentInvoice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContentStyle = styled('div')(({ theme }) => ({
    margin: '5vh 0',
    display: 'flex',
    flexDirection: 'column',
}));


export default function Payment(props) {

    const {
        cartData,
        setCartData,
        userData,
        setUserData
    } = props

    const [value, setValue] = React.useState('online');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');

    const handleRadioChange = (event) => {
        setValue(event.target.value);

        setHelperText(' ');
        setError(false);
    };

    const [paymentID, setPaymentID] = React.useState(null)

    const notify = () => {
        toast(`${paymentID} Online order Payment Success!`, {
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
        <Page title="payment">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Payment
                    </Typography>
                </Stack>
                <Card>
                    <Container maxWidth="md">
                        <ContentStyle>
                            <form style={{ marginBottom: "20px" }}>
                                <FormControl sx={{ m: 1 }} error={error} variant="standard">
                                    <RadioGroup
                                        aria-labelledby="demo-error-radios"
                                        name="quiz"
                                        value={value}
                                        onChange={handleRadioChange}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            <FormControlLabel value="card" control={<Radio />} label="Card Payment" />
                                            <FormControlLabel value="phone" control={<Radio />} label="Phone Payment" />
                                            <FormControlLabel value="online" control={<Radio />} label="Online Payment" />
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </form>
                            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter Payment details below.</Typography>
                            {value == "card" ? <PaymentCardForm /> : ""}
                            {value == "phone" ? <PaymentPhoneForm /> : ""}
                            {value == "online" ?
                                <PaymentGateway
                                    cartData={cartData}
                                    setCartData={setCartData}
                                    userData={userData}
                                    setUserData={setUserData}
                                    value={value}
                                    setValue={setValue}
                                    notify={notify}
                                    setPaymentID={setPaymentID}
                                /> : ""}
                        </ContentStyle>
                    </Container>
                </Card>
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
            </Container>
        </Page>
    );
}
