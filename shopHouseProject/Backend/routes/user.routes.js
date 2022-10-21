import express from "express";
import { deleteUser, getUser, getUserAccordingToType, getUsers, signIn, signUp, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.get('/all', getUsers);
router.get('/:id', getUser);
router.get('/test/:userType', getUserAccordingToType);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;