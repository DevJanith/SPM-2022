import express from "express";
import { createTutorial, deleteTutorial, getTutorial, getTutorials, updateTutorial } from "../controllers/tutorial.controller.js";

const router = express.Router();

// router.get('/', getTutorials);
router.post('/', createTutorial);
router.get('/:id', getTutorial);
router.patch('/:id', updateTutorial);
router.delete('/:id', deleteTutorial);



/**
 * @swagger
 * /shop-house/tutorial:
 *   get:
 *     description: All Tutorials
 *     responses:
 *       200:
 *         description: Returns all the Tutorials
 */
router.get('/', async (req, res) => {
    let response = await getTutorials();
    if (response.success == true) {
        // res.status(200).json(response)
        res.status(200);
        res.json(response);
    } else {
        res.status(404);
        res.json(response)
    }
})
export default router;