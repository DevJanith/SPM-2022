import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

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
    const {
        email,
        password,
        confirmPassword,
        type,
        firstName,
        lastName,
        userQNumber,
        userContactNumber,
        addressNumber,
        addressLine1,
        addressLine2,
        userFaculty,
        userField,
        userSpecializedCriteria
    } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exist" })

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create(
            {
                email,
                password: hashedPassword,
                type,
                userDetails: {
                    userQNumber,
                    userEmail: email,
                    userName: `${firstName} ${lastName}`,
                    userContactNumber,
                    userAddress: `${addressNumber},${addressLine1},${addressLine2}`,
                    userFaculty,
                    userField,
                    userSpecializedCriteria,
                    userType: type
                }
            }
        )

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: result, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200);
        res.json(users);

    } catch (error) {
        console.log(error)

        res.status(404);
        res.json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        res.status(200);
        res.json(user);
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}

export const getUserAccordingToType = async (req, res) => {
    const { userType } = req.body;

    try {
        const users = await User.find({ "type": { $in: userType } })

        res.status(200);
        res.json(users);
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}
