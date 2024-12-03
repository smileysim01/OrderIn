const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./category.schema");
const Food = require("./food.schema");

const restaurantSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    offers: {
        type: String
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: "Category"
    },
    foodList: {
        type: [Schema.Types.ObjectId],
        ref: "Food"
    }
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;