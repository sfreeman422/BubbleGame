//Instantiates a new Phase Game object with a resolution of 800x600, using Phase.auto as a renderer (ues openGL first, if that fails it falls back to canvas), 
//sets the div to bind to to game. Loads the preloader and create functions. 
var game = new Phaser.Game(window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, Phaser.AUTO, 'game', { preload: preload, create: create});

//Global variables. 
var w = game._width;
var h = game._height; 
var scaleRatio = window.devicePixelRatio/3;
var scoreText;
var counter = 0; 
var sprites;
var gameStarted = false; 
var headline;
var startButton;
var loginButton;
var menuBubblesOnScreen = [];
var line1;
var lineLoop; 

//Function to load the sprites before we start the game. 
function preload(){
	//This allows the game to fully fit the screen and scale accordingly
	this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

	//This preloads all of the assets that we will need for our game. 
	game.load.image('bubble1', '../assets/pics/bubble.png');
	game.load.image('line1', '../assets/pics/line.png');
	game.load.image('menu', '../assets/pics/menu.jpg')
	game.load.image('startButton', '../assets/pics/startbutton.png');
	game.load.image('loginButton', '../assets/pics/login.png');
	game.load.image('bubble2', '../assets/pics/bubble2.png');
	game.load.image('bubble3', '../assets/pics/bubble3.png');
}

//Function to create game elements. 
function create(){
	//Will hold our score value. 
	scoreText = game.add.text(1, 1, '', { fill: '#ffffff' });
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
	
	//runs the createSprite function every second for our background.
	var createMenuBubbles = game.time.events.loop(1000, createSprite, this);


	//Show a headline for our game. This will likely be changed to a sprite for a real logo. 
	headline = game.add.text(game.world.centerX, game.world.centerY-(game.world.centerY*0.1), 'Bubble Game', {fill: '#ffffff', font: '72px arial'});
	headline.anchor.setTo(0.5);

	//Show a start game sprite, that when clicked will allow us to start the game. 
	startButton = game.add.sprite(game.world.centerX, game.world.centerY+(game.world.centerY*0.15), 'startButton');
	startButton.anchor.setTo(0.5);
	startButton.scale.setTo(scaleRatio, scaleRatio);
	startButton.inputEnabled = true; 
	startButton.events.onInputUp.add(startGame, this);

	//Show a login to game sprite, that when clicked will allow us to login. 
	loginButton = game.add.sprite(game.world.centerX, game.world.centerY+(game.world.centerY*0.3), 'loginButton');
	loginButton.anchor.setTo(0.5);
	loginButton.scale.setTo(scaleRatio, scaleRatio);
	loginButton.inputEnabled = true; 
	loginButton.events.onInputUp.add(login);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////Function Declarations////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	//Function that will be used to create bubble sprites for the menu background. 
	//THIS SHOULD BE REPLACED WITH A CONSTRUCTOR CUZ THIS IS HORRIBLY INEFFICIENT!!!
  	function createSprite(){
  		//Decides random scale for the bubble being created. 
    	var rand = game.rnd.realInRange(.2, .5);
  		if(rand <= .3){
  			var bubble1 = sprites.create(game.world.randomX, game.world.randomY, "bubble1");
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
	    	else{
	    		//If we are still loading menu bubbles, push them to an array so that we can easily count them and remove them from the game upon start.
	    		menuBubblesOnScreen.push(bubble1);
	    	}
  		}
  		else if(rand >=.301 && rand <=.4){
  			var bubble2 = sprites.create(game.world.randomX, game.world.randomY, "bubble2");
  			//Creates bubble with random size. 
    		bubble2.scale.setTo(rand, rand);
    		//Sets the area in which the object should collide. Similar to hitbox. 
    		bubble2.body.setCircle(50)
    		//enables input on bubble sprites
    		bubble2.inputEnabled = true;
    		bubble2.body.setCollisionGroup(bubbleCollisionGroup);
	    	bubble2.body.collides(bubbleCollisionGroup);
	    	bubble2.body.velocity.x = 200;    
	    	bubble2.body.velocity.y = 200;
	    	//If the bubble that was created is to be a 'game' bubble, we make it clickable, poppable and capable of affecting the score. 
	    	if(gameStarted == true){
		    	bubble2.events.onInputDown.add(destroySprite, this);
	    	}
	    	else{
	    		//If we are still loading menu bubbles, push them to an array so that we can easily count them and remove them from the game upon start.
	    		menuBubblesOnScreen.push(bubble2);
	    	}
  		}
    	else if(rand >=.401){
    		var bubble3 = sprites.create(game.world.randomX, game.world.randomY, "bubble3");
    		//Creates bubble with random size. 
    		bubble3.scale.setTo(rand, rand);
    		//Sets the area in which the object should collide. Similar to hitbox. 
    		bubble3.body.setCircle(50)
    		//enables input on bubble sprites
    		bubble3.inputEnabled = true;
    		bubble3.body.setCollisionGroup(bubbleCollisionGroup);
	    	bubble3.body.collides(bubbleCollisionGroup);
	    	bubble3.body.velocity.x = 200;    
	    	bubble3.body.velocity.y = 200;
	    	//If the bubble that was created is to be a 'game' bubble, we make it clickable, poppable and capable of affecting the score. 
	    	if(gameStarted == true){
		    	bubble3.events.onInputDown.add(destroySprite, this);
	    	}
	    	else{
	    		//If we are still loading menu bubbles, push them to an array so that we can easily count them and remove them from the game upon start.
	    		menuBubblesOnScreen.push(bubble3);
	    	}
    	}
    	else{
    		console.log("Number generated was not between .2 and .5, it was: "+rand);
    	}

    	
  	}

  	//Function to destroy a sprite. This will be used to pop bubbles and track the score. 
	function destroySprite(sprites){
		console.log(sprites);
		sprites.destroy();
  		if(sprites.key == 'bubble1'){
  			counter++;
  			lineDown(1);
  		}
  		else if (sprites.key == 'bubble2'){
  			counter+=2;
  			lineDown(2);
  		}
  		else if (sprites.key == 'bubble3'){
  			counter+=3; 
  			lineDown(3);
  		}
  		scoreText.text = "Score: "+counter; 
	}

  //function to destroy line
  function destroyLine(line){
      line.destroy();
      game.time.events.remove(lineLoop);
  }

  //moves line and checks loss condition every movement
  function lineMove(){
      line1.y-=(game.world._height*.001);
      lossCheck();
  }

  //function to push line down 20 pixels * the multiplier provided by the bubble in destroySprite.
  function lineDown(multiplier){
  	console.log("The lines current position is "+line1.y);
  	console.log("Plan to move: "+((window.innerWidth*.01)*multiplier));
  	console.log("This value is: "+(typeof ((window.innerWidth*.01)*multiplier)));
    line1.y+=((window.innerWidth*.01)*multiplier);
    console.log("Line moved "+(window.innerWidth*.01)+" pixels.");
    console.log("Lines new position is "+line1.y);
  }

  //function for checking loss condition (if line is greater than game height)
  function lossCheck(){
    if (line1.y <= 0)
        {
            console.log("Sorry Game Over!")
            console.log("Score: " + counter)
            destroyLine(line1);
        }
  }


	//Function that will be used to start the actual game upon clicking start in the game menu. 
	function startGame(sprite){
		game.time.events.remove(createMenuBubbles);
		for(var i = 0 ; i < menuBubblesOnScreen.length; i++){
			menuBubblesOnScreen[i].destroy();
		}
		gameStarted = true; 
		sprite.destroy();
		loginButton.destroy();
		headline.destroy();
		//Adds a text field into our game that is blank to start. This will eventually hold the number of times we clicked. 
		scoreText = game.add.text(1, 1, '', { fill: '#ffffff' });
		//The game has started so we begin creating game bubbles. 
		game.time.events.loop(500, createSprite, this)

    //creates the line and begins to move it up.
    line1 = game.add.sprite(0, 1050, 'line1');
    game.world.sendToBack(line1);
    line1.scale.setTo(game.width, 1);
    lineLoop = game.time.events.loop(1, lineMove, 'line1');


  }

  	//Function that will allow our users to login via a modal. 
  	function login(){
  		//This code should send a request to our login page in the form of a modal so that we can have the user login and keep track of their saved games etc. 
  		//1. Get request to our login route.
  		//2. Post request to our login route. 
  		//3. Redirect back to main page. 
  		//4. Ensure that scores are being saved to the users profile. 
  		console.log("testing functionality of the login function.,");
  		window.open = "https://www.google.com";
  	}
}


