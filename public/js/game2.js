//Instantiates a new Phase Game object with a resolution of 800x600, using Phase.auto as a renderer (ues openGL first, if that fails it falls back to canvas), 
//sets the div to bind to to game. Loads the preloader and create functions. 
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

//Global variables. 
var w = game._width;
var h = game._height; 
var text;
var counter = 0; 
var sprites;
var gameStarted = false; 

//Function to load the sprites before we start the game. 
function preload(){
  //This allows the game to fully fit the screen and scale accordingly
  this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

	//This preloads all of the assets that we will need for our game. 
	//Loads an image that we will call bubble1 from the directory listed in the 2nd parameter. 
	game.load.image('bubble1', '../assets/pics/bubble.png');
	//Loads the pause menu. 
  	game.load.image('menu', '../assets/pics/menu.jpg')

}

//Function to create game elements. 
function create(){
	//start p2 physics and collision groups. 
	game.physics.startSystem(Phaser.Physics.P2JS);
 	game.physics.p2.setImpactEvents(true);
 	game.physics.p2.restitution = 1;
 	game.physics.p2.updateBoundsCollisionGroup();
 	var bubbleCollisionGroup = game.physics.p2.createCollisionGroup();

 	//creates a sprite group for bubbles
	sprites = game.add.group();
	sprites.enableBody = true;
	sprites.physicsBodyType = Phaser.Physics.P2JS;
	
	//runs the createSprite function every second
	game.time.events.loop(1000, createSprite, this);

	//Function that will be used to create bubble sprites for the menu background. 
  	function createSprite(){
    	//variable for bubbles being created
    	var bubble1 = sprites.create(game.world.randomX, game.world.randomY, "bubble1");
    	//Decides random scale for the bubble being created. 
    	var rand = game.rnd.realInRange(.2, .5);
    	//Creates bubble with random size. 
    	bubble1.scale.setTo(rand, rand);
    	//Sets the area in which the object should collide. Similar to hitbox. 
    	bubble1.body.setCircle(50)

    	//enables input on bubble sprites
    	bubble1.inputEnabled = true;

    	//sets bubble collision group and initial velocity
    	bubble1.body.setCollisionGroup(bubbleCollisionGroup);
    	bubble1.body.collides(bubbleCollisionGroup);
    	bubble1.body.velocity.x = 200;    
    	bubble1.body.velocity.y = 200;
    	//If the bubble that was created is to be a 'game' bubble, we make it clickable, poppable and capable of affecting the score. 
    	if(gameStarted == true){
	    	bubble1.events.onInputDown.add(destroySprite, this);
    	}
  	}

  	//Function to destroy a sprite. This will be used to pop bubbles and track the score. 
	function destroySprite(sprites){
  		sprites.destroy();
  		counter++;
  		text.text = "Score: "+counter; 
	}

	//Function that will be used to start the actual game upon clicking start in the game menu. 
	function startGame(){
		//Adds a text field into our game that is blank to start. This will eventually hold the number of times we clicked. 
		text = game.add.text(1, 1, '', { fill: '#ffffff' });
		//The game has started so we begin creating game bubbles. 
		game.time.events.loop(1000, createSprite('game'), this)

  	}
}

function update(){

}