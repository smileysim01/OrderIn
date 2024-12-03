const express = require("express");
const router = express.Router();
const Food = require("../schema/food.schema");

router.post("/", async (req, res) => {
    try {
        const { name, description, price, category, image, availability } = req.body;
        console.log(req.body);
        const food = new Food({ name, description, price, category, image, availability });
        const savedFood = await food.save();
        res.status(201).json({ message: "Food added successfully.", food: savedFood });
    } catch (error) {
        res.status(500).json({ message: "Internal server error. Food could not be added." });
    }
})

router.get("/", async (req, res) => {
    try {
        const food = await Food.find().select("-__v");
        res.status(200).json({ food });
    } catch (error) {
        res.status(500).json({ message: "Internal server error. Food could not be fetched." });
    }
})

router.get("/:name", async (req, res) => {
    try {
        const food = await Food.findOne({name: req.params.name});
        if(!food){
            return res.status(404).json({message: "Food not found."});
        }
        res.status(200).json({food: food});
    } catch (error) {
        res.status(500).json({message: "Internal server error. Food could not be fetched."});
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Food not found." });
        }
        const { name, description, price, category, image, availability } = req.body;
        const updateFood = await Food.findByIdAndUpdate(req.params.id, {
            name, description, price, category, image, availability
        }, { new: true });
        res.status(200).json({ message: "Food updated successfully.", food: updateFood });
    } catch (error) {
        res.status(500).json({ message: "Internal server error. Food could not be updated." });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Food deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error. Food could not be deleted." });
    }
})

module.exports = router;