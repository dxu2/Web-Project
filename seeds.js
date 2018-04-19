var mongoose = require("mongoose");
var Csaevent = require("./models/csaevent");
var Comment  = require("./models/comment");

var data = [
    {
        name: "Clouds rest", 
        image: "https://wallpaperscraft.com/image/dumplings_plate_cutlery_crockery_87899_1920x1080.jpg",
        description: "a plan or drawing produced to show the look and function or workings of a building, garment, or other object before it is built or made. he has just unveiled his design for the new museum synonyms	plan, blueprint, drawing, sketch, outline, map, plot, diagram, draft, representation, scheme, model a design for the offices"
    },
    {
        name: "Clouds rest", 
        image: "https://wallpaperscraft.com/image/dumplings_plate_cutlery_crockery_87899_1920x1080.jpg",
        description: "This is good"
    },
    {
        name: "Clouds rest", 
        image: "https://wallpaperscraft.com/image/dumplings_plate_cutlery_crockery_87899_1920x1080.jpg",
        description: "This is good"
    },
]
function seedDB(){
    //Remove all events
    Csaevent.remove({}, function(err){
    // if(err){
    //     console.log(err);
    // }
    // console.log("remove events!");
    // Comment.remove({}, function(err){
    //   if(err){
    //       console.log(err);
    //   } else{
    //       console.log("delete all the comments");
    //   }
    // });
    
    // // add a few events
    // data.forEach(function(seed){
    //     Csaevent.create(seed, function(err, csaevent){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             console.log("add new event");
    //             //create a comment
    //             Comment.create(
    //             {
    //                 text: "This is great!",
    //                 author: "Homer"
    //             }, function(err, comment){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     csaevent.comments.push(comment._id);
    //                     csaevent.save();
    //                     console.log("create new comment");
    //                 }
                    
    //             });
    //         }
    //     });
    // });
    });
}

module.exports = seedDB;