import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    itemID: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    qty: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    createdQRCode: {
        type: String,
        require: true,
    },
    updatedQRCode: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Number,
        default: 1
    }
});

const Item = mongoose.model("Items", itemSchema);

export default Item;
