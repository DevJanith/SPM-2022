import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  userID: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
    // default: new Date().toLocaleString({ timeZone: "Asia/Colombo" }),
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
