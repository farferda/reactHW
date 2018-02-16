var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var db = require("./models")
var axios = require("axios");
var cheerio = require("cheerio");
// var orm = require("./config/orm.js")


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/nytreact", {
});

app.get("/find", function(req,res){
    db.Article.find({}).then(function(thingsFromdb){
        res.json(thingsFromdb);
    })
})

app.post("/save", function(req,res){
    console.log("post save", req.body)
    var thingTosave = {title: req.body.title, link: req.body.link}
    console.log("thing to save", thingTosave)
    db.Article.create(thingTosave).then(function(thingsFromdb){
        console.log(thingsFromdb)
    })
})

// A GET route for scraping the echojs website
app.get("/scrape", function(req, res) {
    var articles = [];
    // First, we grab the body of the html with request
    axios.get("https://www.reddit.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
        console.log("about to loop thru titles")
        
      // Now, we grab every h2 within an article tag, and do the following:
      $(".title").each(function(i, element) {
          console.log("inside title loop");
        // Save an empty result object
        var result = {};
        
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
          console.log(result)
          if(result.title.length>0){
            if(result.link.charAt(0)=== "/"){
                result.link = "www.reddit.com"+ result.link;
            }
            articles.push(result)
        };
      })
      res.json(articles)
    })
    
})
          

app.listen(PORT, function(){
    console.log("backend on")
})


