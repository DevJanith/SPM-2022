import express from "express";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/item.controller.js";

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.get('/:id', getItem);
router.patch('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;