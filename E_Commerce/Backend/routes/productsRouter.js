const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners_model');
const upload = require('../config/multer_config');
const productModel = require('../models/product_model');
const isLoggedInUser= require('../middlewares/isLoggedInUser');

router.post('/create', isLoggedInUser , upload.single('image'), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        // Extract the owner ID from the logged-in user
        const ownerId = req.user._id;

        // Get the uploaded image file
        const image = req.file ? req.file.buffer : null; // Store the image buffer

        let product = await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            owner: ownerId,
            image, // Add the image field
        });

         // Update the owner's products array
         await ownerModel.findByIdAndUpdate(ownerId, {
            $push: { products: product._id }
        });

        req.flash("success", "Product created successfully");
        res.status(201).redirect("/owners/admin");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;