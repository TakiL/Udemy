//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");



const app = express();



app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.use(express.static("Public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// app.get("/articles", function (req, res) {
//   Article.find(function (err, foundArticles) {
//     if (!err) {
//       // console.log(foundArticles);
//       res.send(foundArticles);
//     } else {
//       res.send(err);
//     }
//   });
// });

// app.post("/articles", function (req, res) {
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });

//   newArticle.save(function (err) {
//     if (!err) {
//       res.send("Article has been added")
//     } else {
//       res.send(err)
//     }
//   });

// });


// app.delete("/articles", function(req,res){
// Article.deleteMany({},function(err){
//   if (!err) {
//     res.send("Content has been deleted")
//   } else (res.send(err));
// });
// });



app.route("/articles")
  .get(function(req,res){
    Article.find(function(err,foundArticles){
      if (!err){
        res.send(foundArticles);
      } else {res.send(err)}
    })
  })
  .post(function (req, res) {
    const newArticle = new Article({
      content: req.body.content,
      title: req.body.title
    });
    newArticle.save(function (err) {
      if (!err) {
        res.send("Article has been saved")
      } else(res.send(err));
    })
  })
  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("Articles has been deleted")
      } else(res.send(err))
    });
  });


  //Requests targeting specific articles 

app.route("/articles/:articleTitle")
.get(function(req,res){
  
  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
    if (foundArticle) {
      res.send(foundArticle)
    } else {res.send("No matching article has been found")};
  });
});


////// Port and other settings///////////////////////////
app.listen(3000, function () {
  console.log("App is up and running");
});