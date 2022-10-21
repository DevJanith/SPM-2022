import express from "express";

import {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductReport
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.post("/report", getProductReport);

export default router;
