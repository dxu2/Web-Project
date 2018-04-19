var express = require("express");
var router = express.Router();
var Csaevent = require("../models/csaevent");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

// ========================
// Comments routes
// ========================
router.get("/csahomepage/:id/comments/new", middleware.isLoggedIn, function(req, res){
    //find event by id
    Csaevent.findById(req.params.id, function(err, csaLive){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {csaLive: csaLive});
        }
    });
});

router.post("/csahomepage/:id/comments", middleware.isLoggedIn, function(req, res){
    Csaevent.findById(req.params.id, function(err, csaLive) {
        if(err){
            console.log(err);
            res.redirect("/csahomepage");
        }else{
            Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else{
                  // add username and id to comment
                  // save comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username
                  comment.save();
                  csaLive.comments.push(comment._id);
                  csaLive.save();
                  res.redirect('/csahomepage/' + csaLive._id);
              }
            });
            
        }
    })
});
module.exports = router;