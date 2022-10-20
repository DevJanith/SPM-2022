import router from "./feedback.routes";
import { Stripe } from "stripe"

router.post("/pay", (req, res) => {
    console.log(req.body.token);
    const { token, amount } = req.body

    return Stripe.CustomersResource.call({
        email: token.email,
        source: token
    }).then(customer => {
        Stripe.ChargesResource.call
    })
}) 