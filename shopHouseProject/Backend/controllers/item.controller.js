import mongoose from "mongoose";
import Item from "../models/item.model.js";

// Create and Save a new Item
export const createItem = async (req, res) => {

  const name = req.body.name;
  const description = req.body.description;
  const qty = req.body.qty;
  const price = req.body.price;
  const date = req.body.date;

    // Create a Item
    const itemList = {
        name,
        description,
        qty,
        price,
        date
    };

    console.log(itemList);

    // Save Item in the database
    const newItem = new Item(itemList);

    try {
      await newItem.save();
  
      res.json(newItem);
    } catch (error) {
      res.status(409);
      res.json({ message: error.message });
    }

};

// Retrieve all Items from the database.
export const getItems = async (req, res) => {
    try {
      const getItems = await Item.find();
  
      res.status(200);
      res.json(getItems);
    } catch (error) {
      res.status(404);
      res.json({ message: error.message });
    }
  };

// Find a single Item with an id

export const getItem = async (req, res) => {
    const id = req.params.id;
  
    try {
      const getItem = await Item.findById(id);
  
      res.status(200);
      res.json(getItem);
    } catch (error) {
      res.status(404);
      res.json({ message: error.message });
    }
  };

// Update a Item by the id in the request
export const updateItem = async (req, res) => {
    const { id } = req.params;
    const {name, description, qty, price, date} = req.body;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No Item with id: ${id}`);
      }
      const updateItem = {
        name,
        description,
        qty,
        price,
        date
      };
      const update = await Item.findByIdAndUpdate(id, updateItem);
      res.status(200).send({ message: "Item Details Updated" });
    } catch (error) {
      res.status(404);
      res.json({ message: error.message });
    }
  };


// Delete a Item with the specified id in the request
export const deleteItem = async (req, res) => {
    const id = req.params.id;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No Item with id: ${id}`);
      }
  
      await Item.findByIdAndDelete(id);
      res.status(200);
      res.json({ message: "Item Deleted Successfully" });
    } catch (error) {
      res.status(404);
      res.json({ message: error.message });
    }
  };