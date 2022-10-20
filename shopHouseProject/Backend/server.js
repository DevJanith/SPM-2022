import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { Stripe } from "stripe";

//import routes
import feedbackRoutes from "./routes/feedback.routes.js";
import itemRoutes from "./routes/item.routes.js";
import tutorialRoutes from "./routes/tutorial.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
dotenv.config();

//stripe implementation
const stripe = Stripe("sk_test_51L45q8LRHo7ESm3WbBWnMoykN3km7eS8OjPASjNE3lViFXubXmGMJMVTOL3whVoL21AghocUo5rAOZWNR7iy91qU00oN1kaRVy")

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//swagger
// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Shop House REST API",
//       description:
//         "A REST API built with Express and MongoDB. This API provides Shop House Rest API's.",
//       version: "0.0.1",
//     },
//     servers: [
//       {
//         url: "http://localhost:8000/",
//         description: "Shop House API's",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };
// const swaggerDocs = swaggerJSDoc(swaggerOptions);
// app.use(
//   "/shop-house/swagger-ui",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocs)
// );

// app.get("/shop-house/swagger-doc", (req, res) => {
//   res.send(swaggerDocs);
// });
//end

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Farm Portal Server" });
});

app.use("/shop-house/tutorial", tutorialRoutes);
app.use("/shop-house/user", userRoutes);
app.use("/shop-house/feedback", feedbackRoutes);
app.use("/shop-house/item", itemRoutes);

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.46vukap.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on port : ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
  });
