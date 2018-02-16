var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
  title: String,
  date: String,
  url: String,
});


var Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;