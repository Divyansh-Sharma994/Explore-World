const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
module.exports.signupPage = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = wrapAsync(async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome back to Explore World!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

module.exports.loginPage = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome to Explore Word! You are logged in!");
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout = (req, res,next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You are Logged Out!");
        res.redirect("/listings");
    });
};