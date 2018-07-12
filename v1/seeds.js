var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
     {
        name:"Land of adventure",
        image: "http://www.venturemagazine.me/wp-content/uploads/2017/10/25523d1dd0bc14d734c6dbc676f23471-770x375.jpg",
        description: "blah blah blah"
    },
    {
        name:"Traveling",
        image: "http://positiveworldtravel.com/wp-content/uploads/2017/06/109-800x400-768x384.jpg",
        description: "blah blah blah"
    },
    {
        name:"Fun Fun Fun",
        image: "https://www.dpreview.com/files/p/articles/8237669263/Benjamin_Von_Wong_www.vonwong.com__2_.jpeg",
        description: "blah blah blah"
    }
]

function seedDB(){
   //Remove all campgrounds
//   Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//          //add a few campgrounds
//         data.forEach(function(seed){
//             Campground.create(seed, function(err, campground){
//                 if(err){
//                     console.log(err)
//                 } else {
//                     console.log("added a campground");
//                     //create a comment
//                     Comment.create(
//                         {
//                             text: "This place is great, but I wish there was internet",
//                             author: "Homer"
//                         }, function(err, comment){
//                             if(err){
//                                 console.log(err);
//                             } else {
//                                 campground.comments.push(comment);
//                                 campground.save();
//                                 console.log("Created new comment");
//                             }
//                         });
//                 }
//             });
//         });
//     }); 
    //add a few comments
}

module.exports = seedDB;
