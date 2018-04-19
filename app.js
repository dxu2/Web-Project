var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    Csaevent   = require("./models/csaevent"),
    User       = require("./models/user"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds"),
    methodOverride = require("method-override"),
    flash      = require("connect-flash")

var commentRoutes   = require("./routes/comments"),
    csaeventRoutes  = require("./routes/csaevents"),
    indexRoutes     = require("./routes/index")
    
mongoose.connect("mongodb://localhost/csa__lives");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); // seed the database

// passport configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// run for every route
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/csahomepage", csaeventRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server connected!"); 
});