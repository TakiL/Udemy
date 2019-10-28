//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // declare app first
let items = ["Buy Food", "Eat Food", "Cook Food"];
let workItems= [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');



app.get("/", function (req, res) {

    let options = {weekday: 'long', year: 'numeric', month:'long', day:'numeric'};
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options);


    res.render("list", {
        listTitle: day, newListItems: items
    });
})

app.post("/", function(req, res){
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
    console.log(req.body);
});


app.get("/work", function(req,res){
    res.render("list", { listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function () {
    console.log("Server running on port 3000");
}); 
