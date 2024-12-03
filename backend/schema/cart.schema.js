const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Food = require("./food.schema");
const User = require("./user.schema");

const CartSchema = new Schema({
    foodList: {
        type: [
            {
                item: { type: Schema.Types.ObjectId, ref: "Food", required: true },
                quantity: { type: Number, required: true, min: 1 }
            }
        ],
        default: [],
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;