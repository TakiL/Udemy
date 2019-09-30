//alert("Hello");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
//$(element).on("click mousedown mouseup focus blur keydown change", function (e) {
//    console.log(e);
//});

function nextSequence() {
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
var audio = new Audio ("sounds/" + randomChosenColour + ".mp3");
audio.play();
$("button").on('click', function() {
    alert('alert');
})


}
