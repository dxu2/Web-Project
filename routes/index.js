var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
router.get("/", function(req, res){
    res.render("landing"); 
});

// =====================
// Auth Routes
// =====================

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/csahomepage");
        });
    });
});


// show login form
router.get("/login", function(req, res) {
    res.render("login", {message: req.flash("error")});
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/csahomepage",
        failureRedirect: "/login"
    }), function(req, res){
    
});

// log out route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("error", "Logged you out");
    res.redirect("/csahomepage");
})

module.exports = router;