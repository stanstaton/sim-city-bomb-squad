var time, interval;


document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("reset").addEventListener("click", start);
})

function start() {
	
	//start the siren sound
	document.getElementById("siren").play();
	document.getElementById("success").pause();
	//set initial time, display time to user
time = 30;
document.getElementById("timer").style.color = "chartreuse";
document.getElementById("timer").textContent = time;


//change background to explosion picture
	document.getElementsByTagName("body")[0].classList.remove("exploded");
	document.getElementsByTagName("body")[0].classList.add("unexploded");
	//change button text to "reset game"
	this.textContent = "Restart Game";

	//change message to something while they're playing 
	document.getElementById("message").textContent = "Please don't let us die";

	//Stop Old Timers
	clearInterval(interval);
	//Start a timer 
	interval = setInterval(tick, 1000);
	//Set up event listeners for wires
	removeWireListeners();
	addWireListeners();
}

function removeWireListeners() {
	var wireImages = document.querySelectorAll("#box img");

	//loop through the wire images
	for (var i = 0; i < wireImages.length; i++) {
		wireImages[i].removeEventListener("click", cutWire);
	}
}


function addWireListeners() {
	//grab all images we want to add listeners to
	var wireImages = document.querySelectorAll("#box img");

	//loop through the wire images
	for (var i = 0; i < wireImages.length; i++) {
		//make sure each image is uncut (in case this is being called on reset button)
		wireImages[i].src = `./img/uncut-${wireImages[i].id}-wire.png`;

		//assign (randomly) whether wire should or should not be cut
		var shouldBeCut = (Math.random() > 0.5).toString();
		wireImages[i].setAttribute("data-cut", shouldBeCut);


		//add the click event listener
		wireImages[i].addEventListener("click", cutWire);

		//print it out (for cheat mode)
		console.log(wireImages[i]);
	}

	if (checkWin()) {
		winGame();
	}
}

function cutWire() {
	
	//change wire to the cut wire image
	this.src = `./img/cut-${this.id}-wire.png`;

	//remove the click event now that it's already been clicked
	this.removeEventListener("click", cutWire);

	//check if i was supposed to cut the wire or not
	if(this.getAttribute("data-cut") === "true") {
		//yes i was supposed to cut it
		//play buzz sound
		document.getElementById("electricity").play();

		//change data-cut to false
		this.setAttribute("data-cut", "false");

		//check if i win the game
		if (checkWin()) {
			winGame();
		}
		
	} else {
		//nope wasn't supposed to cut that one
		loseGame();
	}
}

function checkWin() {
	var wireImages = document.querySelectorAll("#box img");

	//loop through the wire images
	for (var i = 0; i < wireImages.length; i++) {
		//if there are ANY true wires found, must keep playing
		if(wireImages[i].getAttribute("data-cut") === "true") {
			return false;
		}

	}
	//went through all wire images and found no trues. I win!
	return true;
}


function tick() {
	time -= 1;
	document.getElementById("timer").textContent = time;
	if(time === 19) {
		document.getElementById("timer").style.color = "goldenrod";
	} else if (time === 9) {
		document.getElementById("timer").style.color = "crimson";
	} else if (time === 3) {
		document.getElementById("timer").style.color = "purple";
	} else if (time <=0) {
		// //lose the game
		loseGame();
	}
}


function loseGame(){
	//stop the game
	endGame("Our blood is on your hands");
	
	//play explosion
	document.getElementById("bldgexplode").play();
	//change background to explosion picture
	document.getElementsByTagName("body")[0].classList.remove("unexploded");
	document.getElementsByTagName("body")[0].classList.add("exploded");

	// Give a snarky message to the loser


}

function winGame() {
	endGame("You are our savior. We will worship you!");

	//play the cheer sound followed by the success music

	var yayCheer = document.getElementById("crowdyay");
	yayCheer.addEventListener("ended", function() {
		//this is the code that runs when the cheer sound is done
		document.getElementById("success").play();

	})
	yayCheer.play();
	

}

function endGame(theMessage){
	//stop timer
	clearInterval(interval);

	//turn off siren
	document.getElementById("siren").pause();

	//remove ability to click wire after game is over
	removeWireListeners();

	//change button text to "play again" once game is not running
	document.getElementById("reset").textContent = "Play again?";

	//give a snarky message
	document.getElementById("message").textContent = theMessage;
}




