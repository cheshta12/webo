//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")

const homeStartingContent = "Everyone has something that inspires them to do their best in life. Quotes that inspire you do not have to come from a famous individual. They can simply be something that motivates you to do your best. Write about the quote and the deeper meaning that it holds in your life. ";
const aboutContent = "i am a computer science student";
const contactContent = "contact me on mail :cheshtagoyal20@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://ches:cool.1234@cluster0.3fgnf.mongodb.net/todo", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const postSchema = {
  title: String,
  content: String
 };

 const Post = mongoose.model("Post", postSchema);
 

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });



  post.save(function(err){

    if (!err){
      return
      res.redirect("/");
      }}    
 
  );



  res.redirect("/");

});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
  Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
  });
  

 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port , function() {
  console.log("Server started");
});

//You can visit the website at : https://radiant-falls-95130.herokuapp.com