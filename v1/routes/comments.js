var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middlewareObj = require("../middleware");

router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

router.post("/", middlewareObj.isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Something went wrong!");
               console.log(err);
           } else {
               comment.author.id= req.user._id;
               comment.author.username= req.user.username;
               comment.save();
               
               campground.comments.push(comment);
               campground.save();
               req.flash("success", "Comment is created!");
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "Comment not found!");
            res.redirect("back");
            }
                Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err){
                    res.redirect("back");
                } else{
                    res.render("comments/edit", {campground_id: req.params.id, comment:foundComment});
                }
           });
    });
});

router.put("/:comment_id", function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          console.log(err);
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});

router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("/campgrounds/:id/comments");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) 
});

module.exports= router;