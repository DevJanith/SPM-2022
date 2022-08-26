import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from "../models/index.js"

const User = db.users;
const Trader = db.trader;
const Buyer = db.buyer;

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email: email } });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token })


    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}


export const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, type } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email: email } });

        if (existingUser) return res.status(400).json({ message: "User already exist" })

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" })

        const hashedPassword = await bcrypt.hash(password, 12)

        if (type != null) {
            switch (type) {
                case "buyer":
                    const buyerResult = await Buyer.create({ email, name: `${firstName} ${lastName}` })

                    // console.log("check here ---------------------------------------------")
                    // console.log(buyerResult)

                    const userResultBuyer = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, type: type, buyerId: buyerResult.id })

                    const tokenBuyer = jwt.sign({ email: userResultBuyer.email, id: userResultBuyer._id }, 'test', { expiresIn: "1h" })

                    res.status(200).json({ result: userResultBuyer, tokenBuyer })
                    break;

                case "trader":
                    const traderResult = await Trader.create({ email, name: `${firstName} ${lastName}` })

                    const userResultTrader = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, type: type, traderId: traderResult.id })

                    const tokenTrader = jwt.sign({ email: userResultTrader.email, id: userResultTrader._id }, 'test', { expiresIn: "1h" })

                    res.status(200).json({ result: userResultTrader, tokenTrader })
                    break;

                default:
                    break;
            }
        } else {
            return res.status(400).json({ message: "type Can not be null" })
        }

        // const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, type: type })

        // const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })

        // res.status(200).json({ result: result, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

// Retrieve all Tutorials from the database.
export const findAll = (req, res) => {  
    User.findAll( )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};