const express = require("express");
const router = express.Router();
const Cart = require("../schema/cart.schema");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if(!user){
            return res.status(401).json({message: "User not logged in."});
        }
        const { foodList, totalAmount } = req.body;   //foodList is an array of food objects
        const cart = new Cart({ foodList, totalAmount, creator: user._id });
        const savedCart = await cart.save();
        return res.status(201).json({ message: "Cart added successfully.", cart: savedCart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error. Items could not be added to cart." });
    }
})

router.get("/", authMiddleware,async (req, res) => {
    try {
        if(!req.user){
            return res.status(401).json({message: "User not logged in."});
        }
        const cart = await Cart.findOne({creator: req.user}).select("-__v");
        await cart.populate("foodList.item");
        return res.status(200).json({ cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error. Cart could not be fetched." });
    }
})

router.patch("/", authMiddleware,async (req, res) => {
    try {
        const {foodList, totalAmount} = req.body;  
        if(!req.user){
            return res.status(401).json({message: "User not logged in."});
        }
        const cart = await Cart.findOne({creator: req.user}).select("-__v");
        if(!cart){
            return res.status(401).json({message: "Cart not found."});
        }
        if(foodList){
            const updateCart = await Cart.findByIdAndUpdate(cart._id, {
            foodList, totalAmount
        }, { new: true });
            await updateCart.populate("foodList.item");
            return res.status(200).json({ message: "Cart updated successfully.", cart: updateCart });
        }
        return res.status(200).json({ message: "Cart updated successfully.", cart: cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error. Cart could not be updated." });
    }
})



router.put("/empty/:id", authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, {foodList: [], totalAmount: 0});
        return res.status(200).json({ message: "Cart items deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error. Cart items could not be deleted." });
    }
})

router.delete("/item/:itemId", authMiddleware, async (req, res) => {
    try {
        const { itemId } = req.params;

        // Find the cart associated with the authenticated user
        const cart = await Cart.findOne({ creator: req.user }).populate("foodList.item");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        // Find the item in the cart
        const itemIndex = cart.foodList.findIndex((item) => item.item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Food item not found in the cart." });
        }

        // Extract the item to be removed
        const itemToRemove = cart.foodList[itemIndex];
        const itemPrice = itemToRemove.item.price || 0;

        // Update quantity or remove the item
        if (itemToRemove.quantity > 1) {
            // Decrease quantity if more than 1
            cart.foodList[itemIndex].quantity -= 1;
            cart.totalAmount -= itemPrice;
        } else {
            // Remove the item completely if quantity is 1
            cart.foodList.splice(itemIndex, 1);
            cart.totalAmount -= itemPrice;
        }

        // Revert `foodList` to unpopulated format before saving
        cart.foodList = cart.foodList.map((item) => ({
            item: item.item._id, // Store only the ObjectId
            quantity: item.quantity,
        }));

        // Save the updated cart
        await cart.save();
        return res.status(200).json({ message: "Item removed successfully.", cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error. Could not remove the item from the cart." });
    }
});

module.exports = router;