const mongoose = require("mongoose");
const Order = require("./order.schema");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
