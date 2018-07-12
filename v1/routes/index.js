var express   = require("express"),
    router    = express.Router(),
    passport  = require("passport"),
    User      = require("../models/users")

router.get("/", function(req, res){
    res.render("landing");
});

//AUTH ROUTES

router.get("/register", function(req, res) {
   res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/campgrounds"); 
        });
    });
});

router.get("/login", function(req, res) {
   res.render("login", {page: 'login'}); 
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
});

router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!!");
   res.redirect("/campgrounds");
});

module.exports= router;