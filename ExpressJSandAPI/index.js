//jshint esversion:6
const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    var crypto=req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;
    var baseURL="https://apiv2.bitcoinaverage.com/convert/global";
    var options={
        url:baseURL,
        method:"GET",
        qs: {
            from:crypto,
            to:fiat,
            amount: amount,
        }
    };
    request(options, function(error, response, body){
        var data = JSON.parse(body);
        var price = data.price;
        var currentDate = data.time;

        res.write("<p> The current date is" + currentDate + "</p>");
        res.write("<h1>" + amount +" "+ fiat + " is equal to " + price + " "  + crypto + "</h1>");
        res.send();
    });
});

app.listen(3000);