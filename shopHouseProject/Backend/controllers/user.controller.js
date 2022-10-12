import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uuid from 'react-uuid';

import User from '../models/user.model.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === null || typeof email == "undefined") return res.status(400).json({ message: "Email Field Required" })
        if (password === null || typeof password == "undefined") return res.status(400).json({ message: "Password Field Required" })

        const existingUser = await User.findOne({ email: email });
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
        userFirstName,
        userLastName,
        userContactNumber,
        userAddressLine1,
        userAddressLine2,
        userAddressLine3,
    } = req.body;

    try {
        if (type === null || typeof type == "undefined") return res.status(400).json({ message: "Type Field Required" })
        if (email === null || typeof email == "undefined") return res.status(400).json({ message: "Email Field Required" })
        if (password === null || typeof password == "undefined") return res.status(400).json({ message: "Password Field Required" })
        if (userFirstName === null || typeof userFirstName == "undefined") return res.status(400).json({ message: "User First Name Field Required" })
        if (userLastName === null || typeof userLastName == "undefined") return res.status(400).json({ message: "User Last Name Field Required" })
        if (userContactNumber === null || typeof userContactNumber == "undefined") return res.status(400).json({ message: "User Contact Number Field Required" })

        const existingUser = await User.findOne({ email: email })

        if (existingUser) return res.status(400).json({ message: "User already exist" })
        if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match" })

        const hashPassword = await bcrypt.hash(password, 12)

        const userDetails = new User({
            email: email,
            password: hashPassword,
            type: type,
            userDetails: {
                userQNumber: uuid(),
                userEmail: email,
                userName: `${userFirstName} ${userLastName}`,
                userContactNumber: userContactNumber,
                userAddress: `${userAddressLine1}, ${userAddressLine2}, ${userAddressLine3}`,
                userType: type,
            }
        })

        const userResult = await userDetails.save()

        const token = jwt.sign({ email: userResult.email, id: userResult._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: userResult, token })

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
    const { userType } = req.params; 
    try {
        const users = await User.find({type: userType});

        res.status(200);
        res.json(users);
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}

