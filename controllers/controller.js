var express = require("express");
var app = express();

// var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


app.get("/", function(req, res) {
    res.render("index");
});

app.get("/scrape", function(req, res) {
    axios.get("https://www.reddit.com/r/learnprogramming/").then(function(response) {
        var $ = cheerio.load(response.data);

        $("p.title").each(function(i, element) {

            var result = {};
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Link using "result object"
            db.Article
                .create(result)
                .then(function(dbArticle) {
                    res.send("Scrape Complete");
                })
                .catch(function(err) {
                    return res.json(err);
                });
        });
        res.redirect("/articles");
    });
});

// Route for getting saved Reddit links from the db
app.get("/articles", function(req, res) {
    db.Article
        .find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.post("/saved/", function(req, res) {
    db.Article
        .find({ saved: true })
        .then(function(dbArticle) {
            res.render("saved");
        })
        .catch(function(err) {
            res.json(err);
        });
});


module.exports = app;
