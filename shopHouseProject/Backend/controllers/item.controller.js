import mongoose from 'mongoose';

import Item from "../models/item.models.js";

export const getItems = async () => {
    try {
        const Items = await Item.find();

        return {
            success: true,
            data: Items
        }

        // res.status(200);
        // res.json(Tutorials);

    } catch (error) {
        console.log(error)

        // res.status(404);
        // res.json({ message: error.message })

        return {
            success: false,
            data: { message: error.message }
        }
    }
}

export const createItem = async (req, res) => {
    const item = req.body;

    const newItem = new Item(item);
    try {
        await newItem.save();

        res.status(201);
        res.json(newItem);

    } catch (error) {
        res.status(409);
        res.json({ message: error.message });
    }
}

export const getItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findById(id);

        res.status(200);
        res.json(item);
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { itemCategory,itemName,itemPrice,itemQuantity,itemDescription } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No Item with id: ${id}`);
        }

        const updatedItem = { itemCategory,itemName,itemPrice,itemQuantity,itemDescription, _id: id };

        await Item.findByIdAndUpdate(id, updatedItem, { new: true });

        res.status(200);
        res.json(updatedItem);
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}

export const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No Item with id: ${id}`);
        }

        await Item.findByIdAndDelete(id);
        res.status(200);
        res.json({ "message": "Item Deleted Successfully" });
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}
