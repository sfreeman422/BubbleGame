//Instantiates a new Phase Game object with a resolution of 800x600, using Phase.auto as a renderer (ues openGL first, if that fails it falls back to canvas), 
//sets the div to bind to to game. Loads the preloader and create functions. 
var game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

var text;
var score = 0;
var counter = 0; 

function preload(){
	//This preloads all of the assets that we will need for our game. 
	//Loads an image that we will call bubble1 from the directory listed in the 2nd parameter. 
	game.load.image('bubble1', '../assets/pics/bubble.svg');

	//This allows the game to fully fit the screen and scale accordingly
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

}

function create(){
	//Creates a variable called bubble1 and sets it equal to the preloaded image bubble1 and places it in the center of our game. 
	var bubble1 = game.add.sprite(game.world.centerX, game.world.centerY, 'bubble1');

	//Enables input for the bubble such as clicks etc. 
	bubble1.inputEnabled = true; 

	//Adds a text field into our game that is blank to start. This will eventually hold the number of times we clicked. 
	text = game.add.text(1, 20, '', { fill: '#ffffff', align: 'center', fontSize: '3vh'});
	//When a bubble is clicked or touched, run the incrememnt function. 
	bubble1.events.onInputDown.add(incrememnt, this);
}

function incrememnt(){
	counter++;
	text.text = " You clicked on the bubble "+counter+" times!";
}

function update(){
	
}