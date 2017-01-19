//Instantiates a new Phase Game object with a resolution of 800x600, using Phase.auto as a renderer (ues openGL first, if that fails it falls back to canvas), 
//sets the div to bind to to game. Loads the preloader and create functions. 
var game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

var text;
var score = 0;
var counter = 0; 
var sprites;

function preload(){
	//This preloads all of the assets that we will need for our game. 
	//Loads an image that we will call bubble1 from the directory listed in the 2nd parameter. 
	game.load.image('bubble1', '../assets/pics/bubble.svg');

	//This allows the game to fully fit the screen and scale accordingly
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

}

function create(){

  //creates a sprite group for bubbles
  sprites = game.add.group();

  //runs the createSprite function every second
  game.time.events.loop(1000, createSprite, this);

	//Adds a text field into our game that is blank to start. This will eventually hold the number of times we clicked. 
	text = game.add.text(1, 1, '', { fill: '#ffffff' });
}

//function for creating individual bubbles on random map axis
function createSprite(){
  //variable for bubbles being created
  var bubble1 = sprites.create(game.world.randomX, game.world.randomY, "bubble1")
  //enables input on bubble sprites
  bubble1.inputEnabled = true;
  //on click increments our score counter 
  bubble1.events.onInputDown.add(increment, this);
  //on click runs the destroySprite function to remove the sprite
  bubble1.events.onInputDown.add(destroySprite, this);
}

//function to destroy sprite
function destroySprite(sprites){
  sprites.destroy();
}

function incrememnt(){
	counter++;
	text.text = " You clicked on the bubble "+counter+" times!";
}

function update(){
	
}