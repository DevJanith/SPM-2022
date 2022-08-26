import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
            type: String,
            required: true
        },
        userFaculty: {
            type: String
        },
        userField: {
            type: String
        },
        // tags: e.target.value.split(',')
        userSpecializedCriteria: [
            String
        ],
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
    // id: {
    //     type: String
    // }
});

const User = mongoose.model("User", userSchema);

export default User;