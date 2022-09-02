import { LoadingButton } from "@mui/lab";
import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { useDispatch } from "react-redux";
import { createPayment } from "../../../../actions/payment.action";

export default function App(props) {

    const {
        cartData,
        setCartData,
        userData,
        setUserData,
        notify,
        setPaymentID
    } = props

    const Razorpay = useRazorpay();

    const [paymentDetails, setPaymentDetails] = useState(null)
    const [rzId, setRzId] = useState(null)


    const handlePayment = useCallback(async () => {
        // const order = await createOrder(params);

        const options = {
            key: "rzp_test_D3W4p7Cxnhcr7W",
            amount: "105864",
            currency: "LKR",
            name: "DS_Product Store",
            description: "products",
            // order_id: order.id,
            handler: (res) => {
                console.log(res);
                setRzId(res)
            },
            prefill: {
                name: "Janith Gamage",
                email: "janith1.ed@example.com",
                contact: "+94768523525",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };


        const rzpay = new Razorpay(options);

        setPaymentDetails(rzpay.options)

        rzpay.open();
    }, [Razorpay]);

    console.log(paymentDetails)
    console.log(rzId)

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            paymentDetails.paymentGatewayId = rzId.razorpay_payment_id
            paymentDetails.buyerId = userData.result.buyerId
            paymentDetails.paymentType = "online"
            paymentDetails.total = paymentDetails.amount
            dispatch(createPayment(paymentDetails));
            setPaymentID(rzId.razorpay_payment_id)
            notify()
        } catch (error) {
            console.log(error)
        }
    }, [rzId])

    return (
        // <div className="App">
        //     <button onClick={handlePayment}>Click</button>
        // </div>

        <div style={{ display: "flex", direction: "row", marginTop: "2%" }}>
            <LoadingButton style={{ margin: "2%" }} fullWidth size="large" type="button" onClick={handlePayment} variant="contained" >
                Online Pay
            </LoadingButton>
        </div>
    );
}