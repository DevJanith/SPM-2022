import express from "express";

import {
    createItem,
    getItem,
    getItems,
    updateItem,
    deleteItem,
} from "../controllers/item.controller.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", createItem);
router.get("/:id", getItem);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

export default router;
