//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: {
    type: Number,

  }
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 4,
  review: "Not red but rather brown."
});


//fruit.save();//

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const People = mongoose.model("Person", personSchema);

const person = new People({
  name: "Taki",
  age: 26
})

//person.save();//

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "hairy ball"
})

const orange = new Fruit({
  name: "Orange",
  score: 10,
  review: "Annoying"
})

const banana = new Fruit({
  name: "Banana",
  score: 10,
  review: "Curvy"
})

/* Fruit.insertMany([kiwi, orange, banana], function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log("Successfully saved all the fruits to fruitsDB")
  }
}) */

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err)
  } else {
    mongoose.connection.close()
    fruits.forEach(fruit => {
      console.log(fruit.name)
    });
  }

});