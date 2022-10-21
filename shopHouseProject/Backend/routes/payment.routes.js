import express from "express";
import uuid from 'react-uuid';
import { Stripe } from "stripe";

const router = express.Router();
const stripe = Stripe("sk_test_51L45q8LRHo7ESm3WbBWnMoykN3km7eS8OjPASjNE3lViFXubXmGMJMVTOL3whVoL21AghocUo5rAOZWNR7iy91qU00oN1kaRVy")

 
router.post("/", (req, res) => {
    const { product, token } = req.body;
    console.log("Product", product);
    console.log("Price", product.price);
    // To avoid duplication for payments
    const idImpotencyKey = uuid();
    return stripe.customers.create({
      email: token.email,
      source: token.id
    })
      .then(customer => {
        stripe.charger.create({
          amount: product.price * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of $(product.name)`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country
            }
          }
        }, { idImpotencyKey })
      })
      .then(result => res.status(200).json(result))
      .catch(err => { console.log(err) })
  })

export default router;
