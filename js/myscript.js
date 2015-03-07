/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: myscripts.js
 * 
 * Description:
 * This files contains the function that deals with starting the game and
 * updating the game windows.
 * 
 */

/*Start the game once the page has been loaded*/
 $(function ()  {     
    initGame();
});

/*Initialize the game*/
function initGame() {
    /*Preload images*/
     preloadGameImages();
     
    /*Display the board*/
    setupCanvas();
    
    /*Add mouse event handlers*/
    backgroundImg.canvas.addEventListener("click", mouseClick, false);
    backgroundImg.canvas.addEventListener("mousemove", mouseLoc, false); 
    
    //startTimer();   ///TEST!!!!!!!!!!!!!!!
    
    /*Display the Menu Screen*/
    //backgroundImg.introScreen();
    menuScreen();
}

/*Initialize the canvas*/
function setupCanvas() {
     /*Setting up the canvas*/
    c = document.getElementById("gameCanvas");
    ctx = c.getContext("2d");
}

/*Preload all the game images*/
function preloadGameImages() {   
    gameImage = new preloadImages()
    
    /*Add image that needs to be preloaded*/
    for (i = 0; i < imgSrc.length; i++) {
        gameImage.setImageAry(imgSrc[i]);
    }
}

/*Set up the canvas*/
function setupCanvas() {
    var gameCanvas = "gameCanvas";
    var height = 50;
    var width = 50;
    var square = 100;
    
    backgroundImg = new imageLib(gameCanvas, width, height, 0, 0);
    
    /*Add background image to canvas*/
    backgroundImg.addImg(gameImage.loadedImg["background"]);
    
    /*Setup interface screens*/
    setupInterfaces();
    
    /*Initiate grid*/
    //backgroundImg.canvasGrid(backgroundImg.canvas.width, backgroundImg.canvas.height);
    backgroundImg.canvasGrid(square);   //Square size
    backgroundImg.gridSqHeight = square;
    backgroundImg.gridSqWidth = square;
    setupGridSpots();
    
    /*Set up the game ref*/
    backgroundImg.gameRef.turn = "character";
    backgroundImg.gameRef.preTurn = "wolf";
    
    backgroundImg.gameRef.players.push("character");
    backgroundImg.gameRef.players.push("wolf");
    
    
    /*Draw the character on the screen*/
    setupCharacter(gameCanvas);
    addEnemy(gameCanvas);
    
    /*Drawing out paths in the game*/
    //setupObstacles();
    
    /*Draw up the cards*/
    setupCard(gameCanvas);
}

/*Set up the different interfaces of the game*/
function setupInterfaces() {
   var centerVer, centerHor;
   
   //centerVer = backgroundImg.canvas.width/2;

   /*Set up the intro/menu interface*/
   backgroundImg.introBackground(gameImage.loadedImg["introMenuBgd"], 0, 0, 800, 500); //Set up the background
   backgroundImg.setTitle("Red vs Wolf", 220, 200, "bold 60px Arial" );//Set up the title
   backgroundImg.setStartButton("Start", 50, 450, "bold 24px Arial" );  //Set up the start button
   
   /*Set up the Game Over Interface screen*/
   backgroundImg.setGameOverMsg("GAME OVER", 125, 160, "bold 60px Arial", "red");
   backgroundImg.setNewGameButton("New Game", 125, 360,"bold 30px Arial", "black", "blue");
}

/*Set up the obstacles for the game*/
function setupObstacles() {
    path[0] = new imageLib(backgroundImg.canvasName, 0, 0, 0, 0);
    path[0].endX = 0,
    path[0].endY = 0;
    path[0].slopeX = 16/13;
    path[0].slopeY = 3410/13;
    path[0].drawLine();

    path[1] = new imageLib(backgroundImg.canvasName, 0, 0, 0, 0);
    path[1].endX = 0; 
    path[1].endY = 0;
    path[1].slopeX = -16/13;
    path[1].slopeY = 3410/13;
    path[1].drawLine();
}

/*Set up the character*/
function setupCharacter(gameCanvas) {
    /*Size of character*/
    var height = 50;
    var width = 50;
    var cord = [], x, y, gridPos;
    
    var colour = "red";
    var lineWidth = height;
    
    var startGridPoint = 32;
    
    cord = backgroundImg.aryPixelPos(startGridPoint); //Get the pixel location of the starting position 32
    
    /*Add the character to the canvas*/
    //character = new physics(gameCanvas, width, height, backgroundImg.canvas.width - width, 210);
    character = new physics(gameCanvas, width, height, cord[0], cord[1]);
    character.oldPosX = cord[0];
    character.oldPosY = cord[1];
    
    /*Save current location on the grid*/
    character.curGridLoc = startGridPoint;
    
    //console.log("Character set up coords "  + cord[0] + " " + cord[1]);
    
    //character.oldPosX = backgroundImg.canvas.width - width;
    //character.oldPosY = 210;
    character.addImg(gameImage.loadedImg["character"]);
    
    /*Character Direction*/
    character.dx = 1;
    character.dy = 0;
    
    /*Set line colour
    backgroundImg.strokeStyle = "red";
    backgroundImg.lineWidth = character.height;*/
        
    // /*Set movement speed*/
    // move = height + height/2;
    // lastKey = 37; //Setting the last key to be left - same direction as the current state
    
    // /*Save enemy initial location*/
    // pathC[pathCCount] = {
            // x: character.oldPosX + Math.floor(character.height/2), 
            // y: character.oldPosY + Math.floor(character.height/2),
            // oX: character.oldPosX, 
            // oY: character.oldPosY,
            // rbg: colour,
            // width: lineWidth
    // };
    
    // pathCCount++
    
}

/*Set up the cards for the board*/
function setupCard(gameCanvas) {
   /*Size of character*/
    var height = 150;
    var width = 150;
    var cord = [], x, y, gridPos;
    var i = 0; //Loop counter
    
    /*Add the card to the canvas*/
    card[0] = new imageLib(gameCanvas, width, height, 150, 200);
    card[0].oldPosX = 150;
    card[0].oldPosY = 200;
    
    /*Save current location on the canvas*/
    card[0].addImg(gameImage.loadedImg["card1"]);
   
    /*Save all frames*/
    card[0].frameNum = 4;
    card[0].frameCount = 1;
    //card[0].frame["card4"].height = 1;
    
    //var w = [0, 150, 350, 150, 350];
    //var h = [0, 350, 150, 350, 150];
    var w = [0, 150, 150, 150, 150];
    var h = [0, 150, 150, 150, 150];
    
    for (i = 1; i <= card[0].frameNum; i++) {
       card[0].frame["card"+i] = {
         image: gameImage.loadedImg["card"+i],
         width: w[i],
         height: h[i]
       };
    }
      
    //console.log(card[0].frame["card4"].height); 
    // for (i = 1; i <= card[0].frameNum; i++) {
      // card[0].frame["card"+i].image = gameImage.loadedImg["card"+i];
      
    // }
    // console.log(card[0].frame["card4"].height); 
    // card[0].frame["card"+1].width = 150;
    // card[0].frame["card"+2].width = 350;
    // card[0].frame["card"+3].width = 150;
    // card[0].frame["card"+4].width = 350
    
    // card[0].frame["card"+1].height = 350;
    // card[0].frame["card"+2].height = 150;
    // card[0].frame["card"+3].height = 350;
    // card[0].frame["card"+4].height = 150;
    
    //console.log(card[0].frame["card4"].height); 
}

/*Set up the enemy*/
function addEnemy(gameCanvas) {
    /*Size of plants
    var height = 40;
    var width = 20;*/
    
    var height = 50;
    var width = 50;
    var colour = "black";
    var lineWidth = Math.floor(15 / 2);
    
    var startGridPoint = 32;
    
    cord = backgroundImg.aryPixelPos(startGridPoint); //Get the pixel location of the starting position 32
        
    /*Setting enemy location*/
    //enemy[0] = new physics(gameCanvas, width, height, 1, 210);
    enemy[0] = new physics(gameCanvas, width, height, cord[0], cord[1]);
    enemy[0].addImg(gameImage.loadedImg["wolf"]);
    
    /*Save current location on the grid*/
    enemy[0].curGridLoc = startGridPoint;
    
    /*Enemy Direction*/
    enemy[0].dx = 1;
    enemy[0].dy = 0;
    
    /*Save enemy initial location*/
    pathE[pathECount] = {
            x: enemy[0].oldPosX + Math.floor(enemy[0].height/2), 
            y: enemy[0].oldPosY + Math.floor(enemy[0].height/2),
            oX: enemy[0].oldPosX, 
            oY: enemy[0].oldPosY,
            rbg: colour,
            width: lineWidth
    };
    
    pathECount++
    
    /*Set line colour*/
    //backgroundImg.strokeStyle = "black";
    //backgroundImg.lineWidth = height/2;
    
    /*
    enemy[0] = new physics(gameCanvas, width, height, 50, 100);
    enemy[0].addImg(gameImage.loadedImg["plant"]);
    enemy[0].dx = 1;
    enemy[0].dy = -0.2;
    
    enemy[1] = new physics(gameCanvas, width, height, 50, -100);
    enemy[1].addImg(gameImage.loadedImg["plant"]);
    enemy[1].dx = 1;
    enemy[1].dy = -0.2;
    
    enemy[2] = new physics(gameCanvas, width, height, 100, 30);
    enemy[2].addImg(gameImage.loadedImg["plant"]);
    enemy[2].dx = 1;
    enemy[2].dy = -0.2;
    
    enemy[3] = new physics(gameCanvas, width, height, 550, 200);
    enemy[3].addImg(gameImage.loadedImg["plant"]);
    enemy[3].dx = 1;
    enemy[3].dy = -0.2;
    
    enemy[4] = new physics(gameCanvas, width, height, 50, -300);
    enemy[4].addImg(gameImage.loadedImg["plant"]);
    enemy[4].dx = 1.5;
    enemy[4].dy = -1;*/
}

function addAliens(gameCanvas) {
    /*Size of aliens*/
    var alienHeight = 50;
    var alienWidth = 50;
    
    /*Add aliens to the canvas*/
    aliens[0] = new physics(gameCanvas, alienWidth, alienHeight, 275, 200);
    aliens[0].addImg(gameImage.loadedImg["alien1"]);
    
    
    aliens[1] = new physics(gameCanvas, alienWidth, alienHeight, 550, 200);
    aliens[1].addImg(gameImage.loadedImg["alien1"]);
    
    aliens[2] = new physics(gameCanvas, alienWidth, alienHeight, 50, 100);
    aliens[2].addImg(gameImage.loadedImg["alien1"]);
    
    aliens[3] = new physics(gameCanvas, alienWidth, alienHeight, 100, 150);
    aliens[3].addImg(gameImage.loadedImg["alien1"]);
}

function addCandy(gameCanvas) {
    /*Size of candy*/
    var width = 50;
    var height = 50;
    
    /*Add aliens to the canvas*/
    candy = new physics(gameCanvas, width, height, 400, 350);
    candy.addImg(gameImage.loadedImg["candy"]);
}

/*Set up the grid*/
function setupGridSpots() {
   /*Direction spots*/
   right = [32, 24, 17];
   up = [39, 30];
   left = [7, 14];
   down = [0, 9];
   
   /*End spot*/
   end = [21];
   
   /*Card spots*/
   card = [32];
   
   /*Fill grid*/
   fillGrid("right", right);
   fillGrid("up", up);
   fillGrid("left", left);
   fillGrid("down", down);
   
   fillGrid("end", end);
   
   fillGrid("card", card);
}

function fillGrid(msg, ary) {
   var i, aryLen, val; 
   var grid = backgroundImg.grid;   
   
   /*Determine the number of squares in the grid*/
   aryLen = ary.length;
   
   for (i = 0; i < aryLen; i++) {
      val = ary[i];
      grid[val] = msg;
   }
}



