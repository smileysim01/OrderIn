const express = require("express");
const router = express.Router();
const Category = require("../schema/category.schema");

router.post("/", async (req,res) => {
    try {
        const {name, description} = req.body;
        const category = new Category({name, description});
        const savedCategory = await category.save();
        res.status(201).json({message: "Category added successfully.", category: savedCategory});
    } catch (error) {
        res.status(500).json({message: "Internal server error. Category could not be added."});
    }
})

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().select("-__v");
        res.status(200).json({categories});
    } catch (error) {
        res.status(500).json({message: "Internal server error. Categories could not be fetched."});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Category deleted successfully."});
    } catch (error) {
        res.status(500).json({message: "Internal server error. Category could not be deleted."});
    }
})

module.exports = router;