const express = require('express');
const isLoggedInUser = require('../middlewares/isLoggedInUser');
const productModel = require('../models/product_model');
const userModel = require('../models/user_model');
const ownerModel = require('../models/owners_model');
const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error, success, loggedin: false });
});

router.get('/shop', isLoggedInUser, async (req, res) => {
    try {
        let products = await productModel.find({});
        let error = req.flash("error");
        let success = req.flash("success");
        res.render("shop", { products, error, success, loggedin: true });
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
});

router.get('/addtocart/:id', isLoggedInUser, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.id);
        await user.save();
        req.flash("success", "Product added to cart");
        res.redirect('/shop');
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/shop");
    }
});

router.get('/cart', isLoggedInUser, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        let total = user.cart.reduce((acc, product) => acc + product.price, 0) + 20 - user.cart.reduce((acc, product) => acc + product.discount, 0);
        let error = req.flash("error");
        let success = req.flash("success");
        res.render("cart", { user, error, success, total, loggedin: true });
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
});

router.get('/profile', isLoggedInUser, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        console.log("User found:", user); // Log the user object

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/");
        }

        let total = user.cart.reduce((acc, product) => acc + product.price, 0) + 20 - user.cart.reduce((acc, product) => acc + product.discount, 0);
        let error = req.flash("error");
        let success = req.flash("success");
        res.render("profile", { user, error, success, total, loggedin: true });
    } 
    catch (err) {
        console.error("Error fetching user profile:", err); // Log the error
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
});

// Owner Profile Route
router.get('/owner-profile', isLoggedInUser , async (req, res) => {
    console.log("Owner profile route hit");
    try {
        // Fetch the owner details
        const owner = await ownerModel.findOne({ email: req.user.email });
        console.log("Owner found:", owner);
        if (!owner) {
            req.flash("error", "Owner not found");
            return res.redirect("/owners/admin");
        }

        // Fetch products created by the owner
        const products = await productModel.find({ owner: owner._id });

        // Fetch users who have added these products to their cart
        const usersWithProductsInCart = await userModel.find({ cart: { $in: products.map(p => p._id) } }).populate('cart');

        // Render the owner profile page with the necessary data
        res.render("owner-profile", { 
            owner, 
            products, 
            usersWithProductsInCart, 
            success: req.flash("success"), 
            error: req.flash("error"), 
            loggedin: true 
        });
    } catch (err) {
        console.error("Error fetching owner profile:", err);
        req.flash("error", "Something went wrong");
        res.redirect("/owners/admin");
    }
});


module.exports = router;