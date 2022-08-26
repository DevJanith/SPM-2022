import express from "express";
import { create, findAll, findOne, update, deleteOne, deleteAll } from "../controllers/item.controller.js";
import auth from "../middleware/auth.middleware.js"

const router = express.Router();


router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', deleteOne);
router.delete('/', deleteAll); 

export default router;