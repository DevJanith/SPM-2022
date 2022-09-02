import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    itemID: {
        type: String,
        require: true
    },
    itemName: {
        type: String,
        require: true
    },
    itemCategory: {
        type: String,
        require: true,
      },
    itemQuantity: {
        type: Number,
        require: true
    },
    itemPrice: {
        type: number,
        require: true
    },
    itemDescription: {
        type: String,
        require: true,
    },
    itemImage: {
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
    }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;