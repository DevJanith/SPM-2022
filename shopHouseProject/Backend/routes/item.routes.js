import express from "express";
import { createItem, deleteItem, getItem, getItems, updateItem, getItemReport } from "../controllers/item.controller.js";

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.get('/:id', getItem);
router.patch('/:id', updateItem);
router.delete('/:id', deleteItem);
router.post("/report", getItemReport);

export default router;
