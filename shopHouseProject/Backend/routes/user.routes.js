import express from "express";
import { signIn, signUp, getUser, getUsers, getUserAccordingToType } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.get('/all', getUsers);
router.get('/:id', getUser);
router.post('/', getUserAccordingToType);



export default router;