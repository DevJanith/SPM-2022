import express from "express";
import { signUp, signIn, findAll } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.get('/', findAll);


export default router;