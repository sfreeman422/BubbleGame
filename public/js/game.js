//Instantiates a new Phase Game object with a resolution of 800x600, using Phase.auto as a renderer (ues openGL first, if that fails it falls back to canvas), 
//sets the div to bind to to game. Loads the preloader and create functions. 
var game = new Phaser.Game(3440, 1440, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

var text;
var score = 0;
var counter = 0; 
var sprites;

function preload(){
	//This preloads all of the assets that we will need for our game. 
	//Loads an image that we will call bubble1 from the directory listed in the 2nd parameter. 
	game.load.image('bubble1', '../assets/pics/bubble.png');

	//This allows the game to fully fit the screen and scale accordingly
	this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

}

function create(){

  //start physics
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

	//Adds a text field into our game that is blank to start. This will eventually hold the number of times we clicked. 
	text = game.add.text(1, 1, '', { fill: '#ffffff' });
  pause = game.add.text(3330, 10, 'Pause', {fill: '#ffffff'});


  //function for creating individual bubbles on random map axis
  function createSprite(){
    //variable for bubbles being created
    var bubble1 = sprites.create(game.world.randomX, game.world.randomY, "bubble1")
    var rand = game.rnd.realInRange(.2, .5);
    bubble1.scale.setTo(rand, rand);
    bubble1.body.setCircle(50)
    //enables input on bubble sprites
    bubble1.inputEnabled = true;
    

    //sets bubble collision group and initial velocity
   
    bubble1.body.setCollisionGroup(bubbleCollisionGroup);
    bubble1.body.collides(bubbleCollisionGroup);
    bubble1.body.velocity.x = 200;    
    bubble1.body.velocity.y = 200;



    //on click increments our score counter 
    bubble1.events.onInputDown.add(increment, this);

    //on click runs the destroySprite function to remove the sprite
    bubble1.events.onInputDown.add(destroySprite, this);
   
  }

}

//function to destroy sprite
function destroySprite(sprites){
  sprites.destroy();
}

function increment(){
	counter++;
	text.text = "Score: "+counter;
}

function update(){
}