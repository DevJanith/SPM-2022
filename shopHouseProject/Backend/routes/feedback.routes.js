import express from "express";

import {
  createFeedback,
  deleteFeedback,
  getFeedback,
  getFeedbackReport,
  getFeedbacks,
  updateFeedback,
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.get("/", getFeedbacks);
router.post("/", createFeedback);
router.get("/:id", getFeedback);
router.delete("/:id", deleteFeedback);
router.put("/:id", updateFeedback);
router.post("/report", getFeedbackReport);

export default router;
