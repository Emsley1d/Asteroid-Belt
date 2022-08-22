
// /* Required functionality:

// //Start button to start
// //Pause button to pause game??
// //Spaceship to move left/right on press of arrow keys
// //Spaceship to fire on press of spacebar
// //Lazers to move from bottom to top until comet/block hit or move off screen
// //Blocks to move left to right
// //Comets to move left to right

// //Blocks/comets to spawn over height of grid.
// //Blocks/comets to dissapear after hit
// //Blocks to dissapear if complete column on right.

// //Timer for length of round??
// //Score counter:
//         +1 when comet hit or blocks lined up
//         -1 when coment hits blocks or blocks accidently shot
// //Name prompt for scoreboard after lose/win?? */


// //Button mouse over effects ***************************************************************************************
// $('.buttons').mouseover(function () {
//     let box = $(this);
//     box.css({ backgroundColor: 'rgba(225, 225, 225, 0.75)', color: "black", 'border-left': '3px solid white', 'border-bottom': '3px solid white' });
// });

// $('.buttons').mouseleave(function () {
//     let box = $(this);
//     box.css({ backgroundColor: 'rgba(225, 225, 225, 0.5)', color: 'white', 'border-left': '0px', 'border-bottom': '0px' });
// });


// Spaceship movement ************************************************************



// var $div = $('.ship');
// $(document).keydown(function (e) {
//     switch (e.which) {
//         case 37:
//             $div.css('left', $div.offset().left - 15);
//             break;
//         case 39:
//             $div.css('left', $div.offset().left + 15);
//     }
// });

// game window = 1000px;
//if space bar is pushed (which it will be to fire) the left/right movement is stopped

// *********************************************************************************

// MissIle

// Missile fires on space bar press   
$(document).keydown(function (e) {
    $(".missile").animate({
        top: "250"
    })  
    switch (e.which) {
        case 32:     
            $(".missile").animate({
                top: "-=600"
            })
    }
});

// Missle sounds on space bar press
// document.addEventListener('keydown', function(e) {
//     if (e.keycode == 32){
//       document.getElementById('.missleAudio').play();
//     }
//   });


// //     id = setInterval(frame, 5); // calls the function again after every 5 milisecs.

// ***************************************************************************

// COMETS / BLOCKS

// Random comet height
const cometHeight = [310, 110, -110, -310];
const cometRandomHeight = cometHeight[Math.floor(Math.random() * cometHeight.length)];
console.log(cometRandomHeight);

//Random block height  (falling foul of DRY here? )
var blockHeight = [310, 110, -110, -310];
var blockRandomHeight = blockHeight[Math.floor(Math.random() * blockHeight.length)];
console.log(blockRandomHeight);

//Random interval between blocks/comets being called
const interval = [1000, 1500, 2000, 2500];
const randomInterval = interval[Math.floor(Math.random() * interval.length)];
console.log(randomInterval);

//Comet on page load
$(document).ready(function () {
    $(".comet").animate({
        bottom: cometRandomHeight, right: "-=1000",
    }, 2000, "linear")
});

//Comet repeat after interval
$.when( $.ready ).then(function() {
    $(".comet").animate({
        bottom: cometRandomHeight, right: "+=1000",  
    }, 3500, "linear")
  });

//Block on page load
$(document).ready(function () {
    $(".block").animate({
        bottom: blockRandomHeight, right: "-=1000",
    }, 2500, "linear")
});

// How to now call each automatically at seperate intervals



// **************************************

// // countdown timer - new game button press
// var countDown = 6000;
// setInterval(function () {
//     countDown = countDown - 1;
//     const elementCountDown = document.getElementById("countDown");

//     elementCountDown.style.color = "red";
//     elementCountDown.style.color.textAlign = "center";
//     elementCountDown.style.fontSize = "24px";

//     elementCountDown.innerHTML = countDown;
//     if (countDown < 0) {
//         clearInterval(elementCountDown);
//         elementCountDown.innerHTML = "GAME OVER";
//     }
// }, 1000);


// // //onclick of new game button *************************************************************

// // //Game window opens
// // $('.game').on("click", (function ()) {
// //     // window.open("https://www.codexworld.com/", "_self");
// //     window.location.replace("http://www.w3schools.com");
// // });

// // //
// // function newGame() {

// //     let id = null;
// //     const ele = document.getElementById("comet");
// //     let pos = 0;

// //     id = setInterval(frame, 5); // calls the function again after every 5 milisecs.

// //     function frame() {
// //         if (pos == 900) {
// //             clearInterval(id);
// //         }
// //         else {
// //             pos++;
// //             ele.style.left = pos + "px"; // moves left to right
// //         }
// //     }
// // };