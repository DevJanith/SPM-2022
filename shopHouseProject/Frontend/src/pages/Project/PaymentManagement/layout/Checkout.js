import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { payment } from '../../../../api';


const Checkout = ({ name, description, amount }) => {

    const dispatch = useDispatch()

    const [product, setProduct] = useState({
        name: "react from FB",
        price: "10",
        productby: "FB"
    })

    const makePayment = async token => {
        // const body = {
        //     token,
        //     product
        // }
        // const header = {
        //     "COntent-Type": "application/json"
        // }
        // return fetch(`https://shop-house-eca5b0c5-2934-4483.herokuapp.com/payment`, {
        //     method: "POST",
        //     headers: header,
        //     body: JSON.stringify(body)
        // }).then(response => {
        //     console.log(response)
        // })
        //     .catch(err => console.log(err))


        await dispatch(
            payment({
                token,
                product
            }).then((response) => {
                console.log(response);
            }).catch((errors) => {
                console.log(errors);
            })
        )

    }

    return (
        <>

            {/* <StripeCheckout
                name={name}
                description={description}
                amount={fromEuroToCent(amount)}
                token={onToken(amount, description)}
                currency={CURRENCY}
                stripeKey={"pk_test_51L45q8LRHo7ESm3Wn35XAOoDtztSN7vEZwRyaj7lcwZ8982JQfoGd7tx3DejGs0ixZVQWzsSbuMT7Y54cFG7cAe200xn5qnyMz"}
            >
                <Button>
                    Pay via Online Portal
                </Button>
            </StripeCheckout> */}
            <StripeCheckout
                stripeKey={"pk_test_51L45q8LRHo7ESm3Wn35XAOoDtztSN7vEZwRyaj7lcwZ8982JQfoGd7tx3DejGs0ixZVQWzsSbuMT7Y54cFG7cAe200xn5qnyMz"}
                token={makePayment}
                description={description}
                amount={amount * 100}
                currency={"LKR"}
                name={name}>
                <Button fullWidth size="large" type="submit" variant="contained" loading={false}>
                    Pay via Payment Portal
                </Button>
            </StripeCheckout>
        </>
    )
}

export default Checkout;