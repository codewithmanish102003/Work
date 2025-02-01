const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    role:{
        type:String,
        default:"owner"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    picture: String,
    gstno: String,
});

module.exports = mongoose.model("owner", ownerSchema);