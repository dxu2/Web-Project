var Csaevent = require("../models/csaevent");
var middlewareObj = {};

middlewareObj.checkOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Csaevent.findById(req.params.id, function(err, foundCsaevent){
            if(err){
                req.flash("error", "event not found...")
                res.redirect("back");
            }else{
                if(foundCsaevent.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back");
    }
}
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("/login");
    }
}

module.exports = middlewareObj;