import express from "express";

import {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
