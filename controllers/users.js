const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
        })
        req.flash("success", "Welcom to Wanderlust!");
        res.redirect("/listings");
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.local.currURL = req.session.redirectUrl;
    }
    else {
        res.locals.currURL = "/listings";
    }
    next();
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You're logged out");
        res.redirect("/listings");
    })
};