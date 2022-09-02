import { Card, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { React, useEffect, useState } from 'react';
import PaymentInvoice from './PaymentInvoice';

const ContentStyle = styled('div')(({ theme }) => ({
    margin: '5vh 0',
    display: 'flex',
    flexDirection: 'column',
}));

const Invoice = (props) => {

    const {
        cartData,
        setCartData,
        userData,
        setUserData,
        value,
        setValue
    } = props

    return (
        <>
            <Card>
                <Container maxWidth="md">
                    <ContentStyle>
                        <PaymentInvoice
                            cartData={cartData}
                            setCartData={setCartData}
                            userData={userData}
                            setUserData={setUserData}
                            value={value}
                            setValue={setValue}
                        />
                    </ContentStyle>
                </Container>
            </Card>
        </>
    )
}

export default Invoice