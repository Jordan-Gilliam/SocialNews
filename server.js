var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// port config
var PORT = process.env.PORT || 8080;

// link mongodb
// mongodb: //heroku_brx4g81f:ftds93eplcc5jv1gad4r5hu1ou@ds245287.mlab.com:45287/heroku_brx4g81f
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/SocialNews";

// Require all models
var db = require("./models");
// Initialize Express
var app = express();


// use morgan for logs 
app.use(logger("dev"));
// use body-parser for handling user form sub
app.use(bodyParser.urlencoded({ extended: false }));
// use express.static to serve the public folder as static
app.use(express.static("public"));

// mongoose es6 setup
mongoose.Promise = Promise;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// routes
var routes = require("./controllers/controller.js");
app.use("/", routes);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
