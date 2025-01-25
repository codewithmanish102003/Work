const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!value.includes('@')) {
                throw new Error('Invalid email');
            }
        }
    },

    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
        },
})

const user=mongoose.model("user",userSchema)

module.exports=user;  //exporting the user model