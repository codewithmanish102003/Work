const jwt = require("jsonwebtoken")
const ownerModel = require("../models/owners_model")
const userModel = require("../models/user_model")

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "you need to login first")
        return res.redirect("/")
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password")
            if (!user) {
                let owner = await ownerModel.findOne({ email: decoded.email }).select("-password")
                if (!owner) {
                    req.flash("error", "User not found")
                    return res.redirect("/")
                }
                req.user = owner
                return next()

            }else{
                req.user = user
                return next()
            }
    } catch (err) {
       req.flash("error","something went wrong")
       res.redirect("/")
    }
}