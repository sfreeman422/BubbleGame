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
var lineSpeed=.001;

//Function to load the sprites before we start the game. 
function preload(){
	//This allows the game to fully fit the screen and scale accordingly
	this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

	//This preloads all of the assets that we will need for our game. 
	game.load.image('bubble1', '../assets/pics/greensprite.png');
	game.load.image('line1', '../assets/pics/line.png');
	game.load.image('menu', '../assets/pics/menu.jpg')
	game.load.image('startButton', '../assets/pics/startbutton.png');
	game.load.image('loginButton', '../assets/pics/login.png');
	game.load.image('bubble2', '../assets/pics/yellowsprite.png');
	game.load.image('bubble3', '../assets/pics/redsprite.png');
	game.load.image('bubble4', '../assets/pics/tealsprite.png');
	game.load.image('bubble5', '../assets/pics/purplesprite.png');
  game.load.image('logo', '../assets/pics/logo.png');
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
	headline = game.add.sprite(game.world.centerX, game.world.centerY-(game.world.centerY*0.2), 'logo');
	headline.anchor.setTo(0.5);
  headline.scale.setTo(window.devicePixelRatio/6, window.devicePixelRatio/6);

	//Show a start game sprite, that when clicked will allow us to start the game. 
	startButton = game.add.sprite(game.world.centerX, game.world.centerY+(game.world.centerY*0.18), 'startButton');
	startButton.anchor.setTo(0.5);
	startButton.scale.setTo(scaleRatio, scaleRatio);
	startButton.inputEnabled = true; 
	startButton.events.onInputUp.add(startGame, this);

	//Show a login to game sprite, that when clicked will allow us to login. 
	loginButton = game.add.sprite(game.world.centerX, game.world.centerY+(game.world.centerY*0.5), 'loginButton');
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
    	var rand = game.rnd.realInRange(.3, .6);
  		if(rand <= .35){
  			var bubble1 = sprites.create(game.world.randomX, game.world.randomY, "bubble1");
  			//Creates bubble with random size. 
    		bubble1.scale.setTo(rand, rand);
    		//Sets the area in which the object should collide. Similar to hitbox. 
    		bubble1.body.setCircle(bubble1.width/2)
    		//enables input on bubble sprites
    		bubble1.inputEnabled = true;
    		//sets bubble collision group and initial velocity
	    	bubble1.body.setCollisionGroup(bubbleCollisionGroup);
	    	bubble1.body.collides(bubbleCollisionGroup);
	    	bubble1.body.velocity.x = 200;    
	    	bubble1.body.velocity.y = 200;
	    	bubble1.hitPoints = 1; 
	    	//If the bubble that was created is to be a 'game' bubble, we make it clickable, poppable and capable of affecting the score. 
	    	if(gameStarted == true){
		    	bubble1.events.onInputDown.add(destroySprite, this);
	    	}
	    	else{
	    		//If we are still loading menu bubbles, push them to an array so that we can easily count them and remove them from the game upon start.
	    		menuBubblesOnScreen.push(bubble1);
	    	}
  		}
  		else if(rand >=.351 && rand <=.400){
  			var bubble2 = sprites.create(game.world.randomX, game.world.randomY, "bubble2");
  			//Creates bubble with random size. 
    		bubble2.scale.setTo(rand, rand);
    		//Sets the area in which the object should collide. Similar to hitbox. 
    		bubble2.body.setCircle(bubble2.width/2)
    		//enables input on bubble sprites
    		bubble2.inputEnabled = true;
    		bubble2.body.setCollisionGroup(bubbleCollisionGroup);
	    	bubble2.body.collides(bubbleCollisionGroup);
	    	bubble2.body.velocity.x = 200;    
	    	bubble2.body.velocity.y = 200;
	    	bubble2.hitPoints = 1; 
	    	//If the bubble that was created is to be a 'game' bubble, we make it clickable, poppable and capable of affecting the score. 
	    	if(gameStarted == true){
		    	bubble2.events.onInputDown.add(destroySprite, this);
	    	}
	    	else{
	    		//If we are still loading menu bubbles, push them to an array so that we can easily count them and remove them from the game upon start.
	    		menuBubblesOnScreen.push(bubble2);
	    	}
  		}
    	else if(rand >=.401 && rand <= .450){
    		var bubble3 = sprites.create(game.world.randomX, game.world.randomY, "bubble3");
    		//Creates bubble with random size. 
    		bubble3.scale.setTo(rand, rand);
    		//Sets the area in which the object should collide. Similar to hitbox. 
    		bubble3.body.setCircle(bubble3.width/2)
    		//enables input on bubble sprites
    		bubble3.inputEnabled = true;
    		bubble3.body.setCollisionGroup(bubbleCollisionGroup);
	    	bubble3.body.collides(bubbleCollisionGroup);
	    	bubble3.body.velocity.x = 200;    
	    	bubble3.body.velocity.y = 200;
	    	bubble3.hitPoints = 2; 
	    	//If the bubble that was created is to be a 'game' bubble, we make it clickable, poppable and capable of affecting the score. 
	    	if(gameStarted == true){
		    	bubble3.events.onInputDown.add(destroySprite, this);
	    	}
	    	else{
	    		//If we are still loading menu bubbles, push them to an array so that we can easily count them and remove them from the game upon start.
	    		menuBubblesOnScreen.push(bubble3);
	    	}
    	}
    	else if(rand >=.451 && rand <=.500){
    		var bubble4 = sprites.create(game.world.randomX, game.world.randomY, "bubble4");
    		//Creates bubble with random size. 
    		bubble4.scale.setTo(rand, rand);
    		//Sets the area in which the object should collide. Similar to hitbox. 
    		bubble4.body.setCircle(bubble4.width/2)
    		//enables input on bubble sprites
    		bubble4.inputEnabled = true;
    		bubble4.body.setCollisionGroup(bubbleCollisionGroup);
	    	bubble4.body.collides(bubbleCollisionGroup);
	    	bubble4.body.velocity.x = 200;    
	    	bubble4.body.velocity.y = 200;
	    	bubble4.hitPoints = 3; 
	    	//If the bubble that was created is to be a 'game' bubble, we make it clickable, poppable and capable of affecting the score. 
	    	if(gameStarted == true){
		    	bubble4.events.onInputDown.add(destroySprite, this);
	    	}
	    	else{
	    		//If we are still loading menu bubbles, push them to an array so that we can easily count them and remove them from the game upon start.
	    		menuBubblesOnScreen.push(bubble4);
	    	}
    	}
    	else if(rand >=.501 && rand <=.550){
    		var bubble5 = sprites.create(game.world.randomX, game.world.randomY, "bubble5");
    		//Creates bubble with random size. 
    		bubble5.scale.setTo(rand, rand);
    		//Sets the area in which the object should collide. Similar to hitbox. 
    		bubble5.body.setCircle(bubble5.width/2)
    		//enables input on bubble sprites
    		bubble5.inputEnabled = true;
    		bubble5.body.setCollisionGroup(bubbleCollisionGroup);
	    	bubble5.body.collides(bubbleCollisionGroup);
	    	bubble5.body.velocity.x = 200;    
	    	bubble5.body.velocity.y = 200;
	    	bubble5.hitPoints = 4; 
	    	//If the bubble that was created is to be a 'game' bubble, we make it clickable, poppable and capable of affecting the score. 
	    	if(gameStarted == true){
		    	bubble5.events.onInputDown.add(destroySprite, this);
	    	}
	    	else{
	    		//If we are still loading menu bubbles, push them to an array so that we can easily count them and remove them from the game upon start.
	    		menuBubblesOnScreen.push(bubble5);
	    	}
    	}
    	else{
    		console.log("Number generated was not between .3 and .550, it was: "+rand);
    		console.log("This should generate a red bubble that hurts the user if they click it. ")
    	}

    	
  	}

  	//Function to destroy a sprite. This will be used to pop bubbles and track the score. 
  	//Each bubble is popped and adjusts score/lineDown based on how big the bubble was. 
	function destroySprite(sprites){
		console.log(sprites);
  		if(sprites.key == 'bubble1'){
  			counter++;
  			sprites.destroy();
  			lineDown(1);
  		}
  		else if (sprites.key == 'bubble2'){
  			if(sprites.hitPoints > 0){
  				sprites.hitPoints -= 1; 
  			}
  			else if(sprites.hitPoints <= 0){
  				counter+=2;
  				sprites.destroy();
  				lineDown(2);
  			}
  		}
  		else if (sprites.key == 'bubble3'){
  			if(sprites.hitPoints > 0){
  				sprites.hitPoints -= 1; 
  			}
  			else if(sprites.hitPoints <= 0){
  				counter+=3; 
  				sprites.destroy();
  				lineDown(3);
  			}
  		}
  		else if (sprites.key == 'bubble4'){
  			if(sprites.hitPoints > 0){
  				sprites.hitPoints -= 1; 
  			}
  			else if(sprites.hitPoints <= 0){
  				counter+=4; 
  				sprites.destroy();
  				lineDown(4);
  			}
  		}
  		else if (sprites.key == 'bubble5'){
  			if(sprites.hitPoints > 0){
  				sprites.hitPoints -= 1; 
  			}
  			else if(sprites.hitPoints <= 0){
  				counter+=5; 
  				sprites.destroy();
  				lineDown(5);
  			}
  		}
  		scoreText.text = "Score: "+counter; 
	}

  //function to destroy line and the loop that causes the line to move. 
  function destroyLine(line){
      line.destroy();
      game.time.events.remove(lineLoop);
  }

  //moves line up .1% and checks loss condition every movement
  function lineMove(){
      line1.y-=(window.innerHeight*lineSpeed);
      lossCheck();
  }

  //function to push line down 1% * the multiplier provided by the bubble in destroySprite.
  function lineDown(multiplier){
    if (line1.y>=window.innerHeight*window.devicePixelRatio){
      line1.y=window.innerHeight*window.devicePixelRatio-5
    }
    else{
    line1.y+=((window.innerHeight*.02)*multiplier);
    }
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

  function lineSpeedIncrease(){
    lineSpeed+=.001
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
		game.time.events.loop(1000, createSprite, this)

    //creates the line and begins to move it up.
    line1 = game.add.sprite(0, window.innerHeight*window.devicePixelRatio, 'line1');
    game.world.sendToBack(line1);
    line1.scale.setTo(game.width, 1);
    lineLoop = game.time.events.loop(1, lineMove, 'line1');

    game.time.events.loop(5000, lineSpeedIncrease)
  }

  	//Function that will allow our users to login via a modal. 
  	function login(){
  		//This code should send a request to our login page in the form of a modal so that we can have the user login and keep track of their saved games etc. 
  		//1. Get request to our login route.
  		//2. Post request to our login route. 
  		//3. Redirect back to main page. 
  		//4. Ensure that scores are being saved to the users profile. 
  		console.log("testing functionality of the login function.,");
  		$('#myModal').modal('show');
  		
  	}
}


