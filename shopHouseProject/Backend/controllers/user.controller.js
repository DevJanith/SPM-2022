import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uuid from 'react-uuid';
import mongoose from 'mongoose';
import nodemailer from "nodemailer"
import User from '../models/user.model.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === null || typeof email == "undefined") return res.status(400).json({ code: "02", message: "Email Field Required" })
        if (password === null || typeof password == "undefined") return res.status(400).json({ code: "02", message: "Password Field Required" })

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) return res.status(404).json({ code: "02", message: "User doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ code: "02", message: "Invalid Credentials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ code: "01", result: existingUser, token })
    } catch (error) {
        res.status(500).json({ code: "00", message: "Something went wrong" })
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
        if (type === null || typeof type == "undefined") return res.status(400).json({ code: "02", message: "Type Field Required" })
        if (email === null || typeof email == "undefined") return res.status(400).json({ code: "02", message: "Email Field Required" })
        if (userFirstName === null || typeof userFirstName == "undefined") return res.status(400).json({ code: "02", message: "User First Name Field Required" })
        if (userLastName === null || typeof userLastName == "undefined") return res.status(400).json({ code: "02", message: "User Last Name Field Required" })
        if (userContactNumber === null || typeof userContactNumber == "undefined") return res.status(400).json({ code: "02", message: "User Contact Number Field Required" })

        const existingUser = await User.findOne({ email: email })
        if (existingUser) return res.status(400).json({ code: "02", message: "User already exist" })

        if (type == "buyer") {
            if (password === null || typeof password == "undefined") return res.status(400).json({ code: "02", message: "Password Field Required" })
            if (password !== confirmPassword) return res.status(400).json({ code: "02", message: "Password doesn't match" })
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

            res.status(200).json({ code: "01", result: userResult, token })
        } else if (type == "trader") {
            const userDetails = new User({
                email: email,
                type: type,
                userDetails: {
                    userQNumber: uuid(),
                    userEmail: email,
                    userName: `${userFirstName} ${userLastName}`,
                    userContactNumber: userContactNumber,
                    userAddress: `${userAddressLine1}, ${userAddressLine2}, ${userAddressLine3}`,
                    userType: type,
                },
                states: 2
            })

            const userResult = await userDetails.save()

            const token = jwt.sign({ email: userResult.email, id: userResult._id }, 'test', { expiresIn: "1h" })

            res.status(200).json({ code: "01", result: userResult, token })
        }

    } catch (error) {
        res.status(500).json({ code: "00", message: "Something went wrong" })
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
        res.json({
            code: "01",
            result: user
        });
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}

export const getUserAccordingToType = async (req, res) => {
    const { userType } = req.params;
    try {
        const users = await User.find({ type: userType });

        res.status(200);
        res.json(users);
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ code: "02", message: `No User for this id: ${id}` });
        }

        if (data.type == "buyer" || data.type == "admin") {
            const updateUser = { ...data, _id: id }
            await User.findByIdAndUpdate(id, updateUser, { new: true })

            res.status(200);
            res.json({ code: "01", result: updateUser })

        } else if (data.type == "trader") {

            var password = Math.random().toString(36).slice(-8);
            const hashPassword = await bcrypt.hash(password, 12)
            const updateUser = { ...data, password: hashPassword, _id: id }

            await User.findByIdAndUpdate(id, updateUser, { new: true })

            //call email service

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                    clientId: process.env.OAUTH_CLIENTID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN
                }
            });

            let mailOptions = {
                from: "janithgamage1.ed@gmail.com",
                to: updateUser.email,
                subject: 'Shop House Project',
                text: `You are Successfully Approved, you're username: ${updateUser.email} , you're password : ${password}`
            };

            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email sent successfully");
                }
            });

            res.status(200);
            res.json({ code: "01", result: updateUser })
        }


    } catch (error) {
        res.status(404);
        res.json({ code: "00", "message": error.message });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ code: "02", message: `No User for this id: ${id}` });
        }

        await User.findByIdAndDelete(id);

        res.status(200);
        res.json({ code: "01", "message": "User Deleted Successfully" });
    } catch (error) {
        res.status(404);
        res.json({ code: "00", "message": error.message });
    }
}

