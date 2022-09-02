import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    qty: {
        type: String,
        require: true
    },
    price: {
        type: Date,
        default: new Date()
    }
});

const ItemModal = mongoose.model('ItemModal', ItemSchema);

export default ItemModal;

