import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express"

//import routes
import tutorialRoutes from "./routes/tutorial.routes.js";
import userRoutes from "./routes/user.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            "title": "Shop House REST API",
            "description": "A REST API built with Express and MongoDB. This API provides Shop House Rest API's.",
            "version": "0.0.1"
        },
        servers: [
            {
                "url": "http://localhost:8000/",
                "description": "Shop House API's"
            }
        ]
    },
    apis: ["./routes/*.js"]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/shop-house/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/shop-house/swagger-doc', (req, res) => {
    res.send(swaggerDocs)
})
//end

app.use('/shop-house/tutorial', tutorialRoutes);
app.use('/shop-house/user', userRoutes);

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
