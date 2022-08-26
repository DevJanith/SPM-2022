import express from "express";
import cors from 'cors'
import db from "./models/index.js"

import tutorialRoutes from "./routes/tutorial.routes.js"
import userRoutes from "./routes/user.routes.js"
import itemRoutes from "./routes/item.routes.js"
import paymentRoutes from "./routes/payment.routes.js"

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


// // route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Farm Portal Server" })
})
app.use('/tutorial', tutorialRoutes);
app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/payment', paymentRoutes);


db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server is Running on PORT : " + PORT)
})