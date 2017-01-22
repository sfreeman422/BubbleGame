//Instantiates a new Phase Game object with a resolution of 800x600, using Phase.auto as a renderer (ues openGL first, if that fails it falls back to canvas), 
//sets the div to bind to to game. Loads the preloader and create functions. 
var game = new Phaser.Game(3440, 1440, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});
var w = 3440;
var h = 1440; 
var text;
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
    /*
        Code for the pause menu
    */

    // Create a label to use as a button
    pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        game.paused = true;

        // Then add the menu
        menu = game.add.sprite(w/2, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    // And finally the method that handels the pause menu
    function unpause(event){
        // Only act if paused
        if(game.paused){
            // Calculate the corners of the menu
            var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                y1 = h/2 - 180/2, y2 = h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                // Display the choice
                choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiseLabel.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
    };


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