import express from "express";
import { create, findAll, findOne, update, deleteOne, deleteAll, findAllPublished } from "../controllers/tutorial.controller.js";
import auth from "../middleware/auth.middleware.js"

const router = express.Router(); 

router.post('/', auth, create);
router.get('/', findAll);
router.get('/:id', findOne);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteOne);
router.delete('/', auth, deleteAll);
router.get('/published', findAllPublished);

export default router;