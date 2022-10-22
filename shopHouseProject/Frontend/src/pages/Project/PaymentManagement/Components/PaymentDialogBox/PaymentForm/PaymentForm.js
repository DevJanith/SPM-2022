import * as React from 'react';
import { useState } from 'react';
import InitialPayment from './InitialPayment';
import MobilePayment from './MobilePayment';
import OnlinePayment from './OnlinePayment';


export default function PaymentForm() {
    const [paymentType, setPaymentType] = useState("initial")

    const props = {
        paymentType,
        setPaymentType
    }

    switch (paymentType) {
        case "mobile":
            return (
                //mobile
                <><MobilePayment {...props} /></>
            )
            break;
        case "online":
            return (
                //online
                <><OnlinePayment {...props} /></>
            )
            break;
        default:
            return (
                <InitialPayment  {...props} />
            )
            break;
    }

}
