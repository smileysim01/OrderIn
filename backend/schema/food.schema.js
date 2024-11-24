const mongoose = require("mongoose");
const Category = require("./category.schema");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    image: {
        type: String    //attach url of food image
    },
    availability: {
        type: Boolean,
        default: true
    }
});

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;