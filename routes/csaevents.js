var express = require("express");
var router = express.Router();
var Csaevent  = require("../models/csaevent");
var middleware = require("../middleware");

//index route
router.get("/", function(req, res){
    Csaevent.find({}, function(err, allcsaEvents){
        if(err){
            console.log("err");
        }else{
            res.render("csaevents/index", {csaLives:allcsaEvents});
        }
    });
});

//create new to database
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPost = {name: name, image:image, description:desc, author: author};
    
    Csaevent.create(newPost, function(err, newPost){
        if(err){
            console.log(err);
        }else{
            res.redirect("/csahomepage")
        }
    });
});

//show form to create new post
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("csaevents/new");
});


router.get("/:id", function(req, res) {
    Csaevent.findById(req.params.id).populate("comments").exec(function(err, foundCsaevent){
        if(err){
            console.log(err);
        }else{
            res.render("csaevents/show", {csaLive:foundCsaevent});
        }
    });
    
});

// Edit 
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {
    Csaevent.findById(req.params.id, function(err, foundCsaevent){
        res.render("csaevents/edit", {csaLive: foundCsaevent});
    })
});


// update
router.put("/:id", middleware.checkOwnership, function(req, res){
   // find and update the correct csa event
   Csaevent.findByIdAndUpdate(req.params.id, req.body.csaLive, function(err, updateCsaevent){
       if(err){
           res.redirect("/csahomepage");
       }else{
           res.redirect("/csahomepage/" + req.params.id);
       }
   });
});


// Destroy route
router.delete("/:id", middleware.checkOwnership, function(req, res){
    Csaevent.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/csahomepage");
       } else{
           res.redirect("/csahomepage");
       }
    });
});

module.exports = router;