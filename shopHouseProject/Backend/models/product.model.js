import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
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
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: new Date()
    },
});

const ProductModal = mongoose.model('ProductModal', ProductSchema);

export default ProductModal;

