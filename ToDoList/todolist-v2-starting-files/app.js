//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://admin-taki:takacslacimongofb9307@todolist-r1nh9.mongodb.net/todolistDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const Cooking = new Item({
  name: "Cooking"
});
const Shopping = new Item({
  name: "Shopping"
});
const Cleaning = new Item({
  name: "Cleaning"
});

const defaultItems = [Cooking, Shopping, Cleaning];

const listSchema = {
  name: String, 
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);


// Default data load in
app.get("/", function (req, res) {

  Item.find(function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Defult items has been saved")
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }
    


    

  })
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item ({
    name: itemName
  });
  
  if (listName === "Today"){
    item.save()
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName)
    })
  }

  

});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (err) {
      "Item has not been deleted"
    } else {
      "Item has been deleted"
    }
  });
  res.redirect("/");
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
      if (!err) {
        res.redirect("/" + listName);
      }
    });
  }
  

})

app.get("/:customListName", function(req,res){
  const customListName = _.capitalize(req.params.customListName)
  List.findOne({name:customListName},function(err, customList){
    if (!err){
      if (!customList) {

        // Add new list 
        // console.log("Does not exist")
          const list = new List({
            name: customListName,
            items: defaultItems
          });

          list.save();
          res.redirect("/" + customListName)
      } else {
        //Show list 
        // console.log("Exist")
        res.render("list", {
          listTitle: customList.name,
          newListItems: customList.items
        });
      }
    }
  });

})

app.get("/about", function (req, res) {
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function () {
  console.log("Server started succesfully");
});

