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

router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate("categories").populate("foodList");
        if(!restaurant){
            return res.status(404).json({message: "Restaurant not found."});
        }
        res.status(200).json({restaurant});
    } catch (error) {
        res.status(500).json({message: "Internal server error. Restaurant could not be fetched."});
    }
})

router.patch("/:id", async (req,res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found."});
        }
        const {name, address, phone, email, image, offers, categories, foodList} = req.body;
        const updateRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, {
            name, address, phone, email, image, offers, categories, foodList
        }, {new: true});
        res.status(200).json({message: "Restaurant updated successfully.", restaurant: updateRestaurant});
    } catch (error) {
        res.status(500).json({message: "Internal server error. Restaurant could not be updated."});
    }
})

module.exports = router;