const express = require("express");
const router = express.Router();
const passport = require("passport");
const {signupPage, signup, loginPage, login, logout} = require("../controllers/user");
const {savedRedirectUrl} = require("../middleware/listing");


router.route("/signup")
    .get(signupPage)
    .post(signup);

router.route("/login")
    .get(loginPage)
    .post(savedRedirectUrl, passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
    }), login);


router.get("/logout", logout);

module.exports = router;
