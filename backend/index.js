const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const healthRouter = require("./routes/health");
const userRouter = require("./routes/user");
const restaurantsRouter = require("./routes/popularRestaurants");
const categoriesRouter = require("./routes/categories");
const foodRouter = require("./routes/food");
const cartRouter = require("./routes/cart");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors({
    origin: "*",
    methods: ["GET,PUT,PATCH,POST,DELETE"],
    headers: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/OrderIn/api/v1/health", healthRouter);
app.use("/OrderIn/api/v1/user", userRouter);
app.use("/OrderIn/api/v1/popularRestaurants", restaurantsRouter);
app.use("/OrderIn/api/v1/category", categoriesRouter);
app.use("/OrderIn/api/v1/food", foodRouter);
app.use("/OrderIn/api/v1/user/cart", cartRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB Server.");
    }).catch((err) => {
        console.log("MongoDB connection error: ", err);
    });
})