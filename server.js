var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 8080;

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


// TODOO:--------------------------------------------------------------
mongoose.connect("add hyper link here", {
    useMongoClient: true
});
// TODOO:--------------------------------------------------------------


// db creation stuff

// routes

























// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
