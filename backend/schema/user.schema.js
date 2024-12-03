const mongoose = require("mongoose");
const Order = require("./order.schema");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
    },
    country:{
        type: String,
    },
    img:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    orders: {
        type: [Schema.ObjectId],
        ref: "Order"
    },
    cart: {
        type: [Schema.ObjectId],
        ref: "Cart"
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
