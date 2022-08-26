import mongoose from "mongoose";
import Feedback from "../models/feedback.model.js";

//add feedback
export const createFeedback = async (req, res) => {
  //   const feedback = req.body;
  var now = new Date();

  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const description = req.body.description;
  const rating = req.body.rating;
  const date = now;

  const feedback = {
    name,
    email,
    mobile,
    description,
    rating,
    date,
  };
  console.log(feedback);

  const newFeedback = new Feedback(feedback);

  try {
    await newFeedback.save();

    res.json(newFeedback);
  } catch (error) {
    res.status(409);
    res.json({ message: error.message });
  }
};

//get one feedback

export const getFeedback = async (req, res) => {
  const id = req.params.id;

  try {
    const feedback = await Feedback.findById(id);

    res.status(200);
    res.json(feedback);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

//delete feedback
export const deleteFeedback = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Feedback with id: ${id}`);
    }

    await Feedback.findByIdAndDelete(id);
    res.status(200);
    res.json({ message: "Feedback Deleted Successfully" });
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

//get all feedbacks

export const getFeedbacks = async (req, res) => {
  try {
    const Feedbacks = await Feedback.find();

    res.status(200);
    res.json(Feedbacks);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

//get report data
export const getFeedbackReport = async (req, res) => {
  const startDate = req.body.start;
  const endDate = req.body.end;

  try {
    const Feedbacks = await Feedback.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({
      date: 1,
    });

    res.status(200);
    res.json(Feedbacks);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

//update

export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, description, rating } = req.body;

  let date = new Date().toLocaleString({ timeZone: "Asia/Colombo" });

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Feedback with id: ${id}`);
    }
    const updateFeedback = {
      name,
      email,
      mobile,
      description,
      rating,
      date,
    };
    const update = await Feedback.findByIdAndUpdate(id, updateFeedback);
    res.status(200).send({ message: "Feedback Details Updated" });
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};
