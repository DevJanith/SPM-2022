import mongoose from 'mongoose';
import { Stripe } from "stripe";
import uuid from 'react-uuid';

// export const createPayment = async (req, res) => {
//   const { product, token } = req.body;

//   const idImpotencyKey = uuid();

//   await Stripe.customers.create({
//     email: token.email,
//     source: token.id
//   })
//     .then(customer => {
//       Stripe.charger.create({
//         amount: product.price * 100,
//         currency: 'usd',
//         customer: customer.id,
//         receipt_email: token.email,
//         description: `purchase of $(product.name)`,
//         shipping: {
//           name: token.card.name,
//           address: {
//             country: token.card.address_country
//           }
//         }
//       }, { idImpotencyKey })
//     })
//     .then(result => res.status(200).json(result))
//     .catch(err => { console.log(err) })}
// }
