//jshint esversion:6

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "We need a name Morty!!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 3,
  review: "Peaches are the best, mostly for Moonshine."
});

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit"
});

const mango = new Fruit({
  name: "Mango",
  rating: 8,
  review: "Best fruit on the world, yummí!"
});

// mango.save();
// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37,
  favouriteFruit: mango
});
// person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "hairy ball"
});

const orange = new Fruit({
  name: "Orange",
  score: 10,
  review: "Annoying"
});

const banana = new Fruit({
  name: "Banana",
  score: 10,
  review: "Curvy"
});

/* Fruit.insertMany([kiwi, orange, banana], function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log("Successfully saved all the fruits to fruitsDB")
  }
}) */

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(fruit => {
      console.log(fruit.name);
    });
  }
});

Person.updateOne({ name: "Taki" }, { favouriteFruit: mango }, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Fruit Updated");
  }
});

Fruit.deleteOne({ name: "Peach" }, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Entry has been deleted");
  }
});

// Person.deleteMany({ name: "Taki" }, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Entries has been deleted");
//   }
// });
