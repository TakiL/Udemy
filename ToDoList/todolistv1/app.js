//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // declare app first
var items = ["Buy Food", "Eat Food", "Cook Food"];
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {

    var options = {weekday: 'long', year: 'numeric', month:'long', day:'numeric'};
    var today = new Date();
    var day = today.toLocaleDateString("en-US", options);


    res.render("list", {
        kindOfDay: day, newListItems: items
    });
})

app.post("/", function(req, res){
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server running on port 3000");
}); 
