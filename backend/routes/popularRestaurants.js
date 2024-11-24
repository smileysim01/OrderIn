const express = require("express");
const router = express.Router();
// const Order = require("../schema/order");
const Category = require("../schema/category.schema");
const Food = require("../schema/food.schema");
const Restaurant = require("../schema/restaurant.schema");
// const User = require("../schema/user");
// const authMiddleware = require("../middlewares/auth");

router.post("/", async (req,res) => {
    try {
        const {name, address, phone, email, image, offers, categories, foodList} = req.body;
        const restaurant = new Restaurant({name, address, phone, email, image, offers, categories, foodList});
        const savedRestaurant = await restaurant.save();
        res.status(201).json({message: "Restaurant added successfully.", restaurant: savedRestaurant});
    } catch (error) {
        res.status(500).json({message: "Internal server error. Restaurant could not be added."});
    }
})

router.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find().select("-__v");
        res.status(200).json({restaurants});
    } catch (error) {
        res.status(500).json({message: "Internal server error. Restaurant could not be fetched."});
    }
})

module.exports = router;