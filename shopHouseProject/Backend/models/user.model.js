import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    // name: {
    //     type: String, 
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    userDetails: {
        userQNumber: {
            type: String,
            required: true,
            unique: true
        },
        userEmail: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true
        },
        userContactNumber: {
            type: String,
            required: true
        },
        userAddress: {
            type: String
        },
        userType: {
            type: String,
            required: true
        },
    },
    states: {
        type: String,
        default: "1"
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model("Users", userSchema);

export default User;

