const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.schema");
const Food = require("./food.schema");

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [{
        foodId: {
            type: Schema.Types.ObjectId,
            ref: "Food",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    deliveryAddress: {
        type: String,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Delivered", "Cancelled"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
