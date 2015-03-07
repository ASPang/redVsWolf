/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: gameTimer.js
 * 
 * Description:
 * This files contains the function that keeps track of the gameplay time.
 * 
 */

var gameTimer;
var startClock;
var endGameFlag = true; //Game isn't running is true
var numGamePlay = 0;
var milSec = 1000;

var cardUp = 1;
var degrees = 0;

function menuScreen() {
   backgroundImg.introScreen();

   /*var oneSec = 30;
   
   
   clearInterval(gameTimer);   
   startClock = new Date().getTime();*/
   
   /*Refresh the screen*/
   //setInterval(function(){backgroundImg.introScreen();}, oneSec);    
   
   //startTimer();
}

/*Start the game when the start button is clicked*/
function startTimer() { 
   var oneSec = 10;
   
   clearInterval(gameTimer);   
   startClock = new Date().getTime();
   
   endGameFlag = false;

//    /*Initiate game*/
    //initGame();
    setupCanvas();
    
   gameTimer = setInterval(function(){updateGame();}, oneSec);  
}


/*Update the game every few milseconds*/
function updateGame() {
    var i;  //Loop counter
    var curColour, curWidth;
    
    /*Clear the canvas*/
    backgroundImg.clearCanvas();
    
    /*Draw the background*/
    backgroundImg.redraw(backgroundImg.xPos, backgroundImg.yPos);
    
    /*Draw the grid*/
    backgroundImg.drawGridLines();
    turnBase();
    
    /*Redraw Character path*/
    // curColour = characterImgColour();
    // curWidth = characterImgLineWidth(curColour);
    // redrawPaths(character, pathC, curColour, curWidth);  //Redraw character path
    
    /*Redraw Enemy path*/
    // curColour = "black";
    // curWidth = characterImgLineWidth(curColour);
    // redrawPaths(enemy[0], pathE, curColour, curWidth);  //Redraw enemy path
    
    /*Draw gameplay information*/
    // backgroundImg.canvasCtx.fillStyle = "Black";
    // backgroundImg.canvasCtx.font = "bold 16px Arial";
    // backgroundImg.canvasCtx.fillText("Elapse Time: " + points, backgroundImg.canvas.width / 2 - 30, 16);
    
    /*Draw the character*/
    // character.xPos += character.dx;
    // character.yPos += character.dy;

    // if (character.canvasWallCollision() != "null") {   //Returns the value which the character collides with the wall
      // character.stopWallCollision();
      // endGameFlag = true;
    // }
    character.redraw(character.xPos, character.yPos);
    
    /*Update Enemy position*/
    moveEnemies();
    // enemyHitLine();
        
    /*Draw any cards*/
    
    if (cardUp == 2) {
      var c = card[0];
      /*var oriPosX = c.oldPosX;
      var oriPosY = c.oldPosY;*/
      
      c.redraw(c.xPos, c.yPos);
      //c.redrawRotate();
      
      //c.oldPosX = oriPosX;
      //c.oldPosX = oriPosY;
      
      window.setTimeout(function() {
         card[0].clearAnimateTimer();
         cardUp += 1;
      }, 1000);
    }
      card[0].redraw(card[0].xPos, card[0].yPos);
    
    /*Check if the image intersects with anything on the canvas*/
    //checkObstacles();
    //characterHit();
    //updatePath();
    //characterHitLine();
    //console.log("ing game timer " + character.xPos);
    // hitLine(character, enemy[0], pathC, pathCCount, 1);
    
    /*Determine if the game over flag as been set*/
    if (endGameFlag == true) { 
        clearInterval(gameTimer);
                
        /*Disable all enemies*/
        for (i = 0; i< enemy.length; i++) {                        
            enemy[i].dx = 0;
            enemy[i].dy = 0;
        }
        
        /*Clear all paths*/
        pathCCount = 0;
        pathC = [];
        pathECount = 0;
        pathE = [];
        lastKey = 37;
        
        /*Stop the character from moving*/
        character.dx = 0;
        character.dy = 0;
        
        /*Set up the option for user to start a new game*/
        screenDisplayed = "gameOver";
        backgroundImg.gameOverScreen();
    }
}

/*Update the enemy position on the screen by pixels*/
function moveEnemies() {
    var i;  //Loop Counter
    
    /*Modify every alien image*/
    for (i = 0; i< enemy.length; i++) {            
        /*Determine if enemy hit another path*/
        //enemyPredictPath(enemy[i]);
        
        
        /*Determine if the enemy will hit a wall */
        //enemyPredictWallColl(enemy[i]);
        
        //enemy[i].redraw(enemy[i].xPos + enemy[i].dx , enemy[i].yPos + enemy[i].dy);
        enemy[i].redraw(enemy[i].xPos , enemy[i].yPos );
        
        /*Determine if the alien is off screen
        if ((enemy[i].xPos) < 0) {
            enemy[i].dx = -enemy[i].dx;
        }
        else if ((enemy[i].xPos + enemy[i].width) > backgroundImg.canvas.width) {
            enemy[i].dx = -enemy[i].dx;
        }
        else if ((enemy[i].yPos + enemy[i].height) >= backgroundImg.canvas.height) {
            endGameFlag = true;
            enemy[i].dy = 0;
            enemy[i].dx = 0;
        }*/
        if (enemy[i].canvasWallCollision() != "null") {
          endGameFlag = true;
        }
    }
}

function moveAliens(speed) {
    var i;  //Loop counter
    
    /*Modify every alien image*/
    for (i = 0; i< aliens.length; i++) {            
        aliens[i].canvasCtx.globalAlpha = alienVisibility;    
        aliens[i].redraw(aliens[i].xPos - speed, aliens[i].yPos);
        
        /*Determine if the alien is off screen*/
        if ((aliens[i].xPos + aliens[i].width) < 0) {
            newAlien(aliens[i]);
        }        
        
        /*Modify the alien's visibility*/
        if (visible == true) {
            alienVisibility -= 0.001;
        }
        else if (visible == false) { 
            alienVisibility += 0.001;
        }
        
        if (alienVisibility >= 1.0) {
            alienVisibility = 1.0;
            visible = true;
        }
        else if (alienVisibility <= 0.0) {
            alienVisibility = 0.0;
            visible = false;
        }
        aliens[i].canvasCtx.globalAlpha = 1;  
    }
}

function addTime() {
    var countDownTime = 60;
    var sec30 = 30 * milSec; 
    
    /*Add 30 seconds of game play*/
    startClock += sec30;
    
    /*Calculate time lapse*/
    var timeRemaining = Math.round(countDownTime - (new Date().getTime() - startClock) / milSec);
    
    if (timeRemaining > 60) {
        startClock = new Date().getTime(); 
    }
}

function candyTime() {
    var powerRemaining = Math.round(powerUpEnd - (new Date().getTime() - powerUp) / milSec);
    
    if (powerRemaining > 0) {
        backgroundImg.canvasCtx.font = "bold 30px Arial";
        backgroundImg.canvasCtx.fillText("Power Up Activated", 150, 110);
    }
    
    return powerRemaining;
}

/*Fill area*/
function fillArea() {
    backgroundImg.grid[1] = "blue";
}

/*Convert Second to millisecond*/
function convertSecToMilSec(sec) {
    var milSec = 1000;
    
    return sec * milSec;
}

/*Convert millisecond to second*/
function convertMilSecToSec(milSec) {
    var sec = 1000;
    
    return milSec / sec;
}

/*Draw object paths*/
function redrawPaths() {
    var i = 0, numPaths;
    
    numPaths = path.length;
    for (i = 0; i < numPaths; i++) {
        path[i].drawLine();
    }
}

/*Draw Character path*/
function redrawPaths(character, path, curColour, curWidth) {
    var i = 0, numPaths;
    var pX1, pY1, pX2, pY2; //points
    /*var curColour = path.rbg;
    var curWidth = path.lineWidth;*/
    
    numPaths = path.length; //Get the number of paths
    
    if (numPaths > 0) {
       /*Draw all previous paths*/
       for (i = 0; i < numPaths - 1; i++) {
           pX1 = path[i].x;
           pY1 = path[i].y;
           
           pX2 = path[i+1].x;
           pY2 = path[i+1].y;
           
           backgroundImg.strokeStyle = path[i+1].rbg;   //Update the line background
           backgroundImg.lineWidth = path[i+1].width;
           backgroundImg.drawLine(pX1, pY1, pX2, pY2);
       }
       
       /*Draw the current path getting built*/
       pX1 = path[numPaths - 1].x;
       pY1 = path[numPaths - 1].y;

       pX2 = centPathX(character.xPos);
       pY2 = centPathY(character.yPos);
       
       backgroundImg.strokeStyle = curColour; //Update the line background
       backgroundImg.lineWidth = curWidth;
       backgroundImg.drawLine(pX1, pY1, pX2, pY2);
       
       /*Revert the colour back to the original colour*/
       backgroundImg.strokeStyle = "black";
    }
}

/*Clear the canvas of items*/
function clearBoard() {
    var i = 0;
    
    /*Remove all Enemies*/
    for (i = 0; i < enemy.length; i++) {
        enemy.pop();
    }
    
    /*Remove all projectiles*/
    for (i = 0; i < projectile.length; i++) {
        projectile.pop();
    }    
}


// function updatePath() {
    // backgroundImg.grid[0] = "";
    // backgroundImg.addGrid();
// }

/*Determine the current player's turn*/
function turnBase() {
   var game = backgroundImg.gameRef;
   
   /*Determine who's turn it is*/
   if (game.turn == "character" && game.move == 0) {// && game.preTurn != "character") {  //Player's turn do nothing if the dice hasn't been rolled
      return game.turn;
   }
   else if (game.turn == "wolf" && game.move == 0) {  //Opponent's turn - roll the dice for them
      /*Roll the dice*/
      backgroundImg.gameRef.move = genNumRange(1, 3);
      
      
      //return game.preTurn;
   }   
   
   /*Update character piece*/
   if (game.turn == "character" && game.move > 0) {
      moveCurChar(character);
   }
   else if (game.turn == "wolf") {
      moveCurChar(enemy[0]);
   }
   
   if (cardUp == 1) {
      //card[0].animateCenter();
      cardUp += 1;
      //card[0].animateTimer = setInterval("card[0].animateCenter();", 1000);  
      card[0].animateTimer = setInterval("card[0].animateImg();", 10);  
      
   }
   else if (cardUp == 5) {
      var c = card[0];
      //console.log(c.frameCount);
      c.image = c.frame["card"+c.frameCount].image;
      c.width = c.frame["card"+c.frameCount].width;
      c.height = c.frame["card"+c.frameCount].height;
      //console.log(c.image);
      c.redraw(c.xPos, c.yPos);
      
      if (c.frameCount >= c.frameNum) {
         c.frameCount = 1;
      }
      else {
         c.frameCount += 1;
      }
   }
   
   /*Determine if character is on a special square*/
   if (game.move == 0) {
      backgroundImg.nextPlayerTurn();  //Update whom the next player is going to be
   }   
}

var characterStop = 1;
//var characterDiffX;
//var characterDiffY;

//var charEndX;
//var charEndY;




/*Move current character piece on the board*/
function moveCurChar(character) {
   var aryPos;
   var cord = [];
   var i;   //Loop counter
   
   /*Determine the character's new area*/
   if (characterStop == 1 && backgroundImg.gameRef.move > 0) {
      /*Get the array position*/
      specialSq(character, character.curGridLoc);
      aryPos = character.curGridLoc + character.dx;
      character.curGridLoc = aryPos;
      
      cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
      
      /*characterDiffX = cord[0] - character.xPos;
      characterDiffY = cord[1] - character.yPos;
      
      charEndX = cord[0];
      charEndY = cord[1];*/
      
      characterStop = 0;
      
      console.log("STart to move charater " + " " + backgroundImg.gameRef.move + " " + cord[0] + " " + cord[1] + " " +  aryPos + " " +  character.dx + " " );
   }  
   else {
      cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
   }   
   
   /***MOVE the character***/
   /*Figure out the direction*/
   
   
   var dx = 1;
   var dy = 1;
   
   /*if (characterDiffX < 0) {
      dx = -1;
   }
   else if (characterDiffX == 0) {
      dx = 0;
   }
   
   if (characterDiffY < 0) {
      dy = -1;
   }
   else if (characterDiffY == 0) {
      dy = 0;
   }   */
   
   if (character.dx == 1) {
      dx = 1;
      dy = 0;
   }
   else if (character.dx == (-1)) {
      dx = -1;
      dy = 0;
   }
      
   else if (character.dx < 1) {
      dx = 0;
      dy = -1;
   }
   else if (character.dx > 1) {
      dx = 0;
      dy = 1;
   }
   else {
      dx = 0;
      dy = 0;
   }
   
   
   
   // console.log("HERE  " + characterStop + " " + characterDiffX + " " + characterDiffY);
   //console.log("---"  + " " + cord[0] + " " + cord[1] + " " + character.xPos + " " + character.yPos);
   //console.log("-------" + " " + dx  + " " + dy);
   //console.log("------------" + " " + backgroundImg.gameRef.move);
   
   if (characterStop == 0 && character.xPos == cord[0] && character.yPos == cord[1] ) {
      //characterDiffX = 0;
      //characterDiffY = 0;
      
      //charEndX = 0;
      //charEndY = 0;
      
      characterStop = 1;
      
      //aryPos = character.curGridLoc + dx;
      //specialSq(character, aryPos);
      if (backgroundImg.gameRef.move > 0) {
         //console.log("HERE!!!!!!!!!!");
         backgroundImg.gameRef.move -= 1;
      }
   }
   else if (characterStop == 0) {// && character.xPos != cord[0] && character.yPos != cord[1] ) {
   if (backgroundImg.gameRef.turn == "character") {
      backgroundImg.canvas.style.transform = "rotate("+degrees+"deg)";
      degrees++;
      if(degrees > 359){ degrees = 1; }
   }
   
   
      character.redraw(character.xPos + dx, character.yPos + dy);
      
      backgroundImg.canvas.style.transform = "rotate("+0+"deg)";
      
      //console.log("HERE - " + character.xPos + " "  +character.yPos);
      /*characterDiffX += dx * -1;
      characterDiffY += dy * -1;*/
      
   }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   // for (i = backgroundImg.gameRef.move; i > 0; i--) {
      // /*Get the array position*/
      // aryPos = character.curGridLoc + character.dx;
      // character.curGridLoc = aryPos;
      
      // cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
      
      // /*Move the character*/
      // console.log(cord[1]);
      // character.animateMove(cord[0], cord[1], 1);
      
      // //cord = backgroundImg.aryPixelPos(aryPos); //Get the pixel location of the starting position 32
      // specialSq(character, aryPos);
   // }
   // //console.log(character.curGridLoc  + " " + character.dx);
   // /*Reset number of moves*/
   // backgroundImg.gameRef.move = 0;
   
   // /*Save player's new location*/
   // cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
   // character.xPos = cord[0];
   // character.yPos = cord[1];
   // //character.redraw(character.xPos, character.yPos);   
}


function moveCurChar2(character) {
   var aryPos;
   var cord = [];
   var i;   //Loop counter
   
   for (i = backgroundImg.gameRef.move; i > 0; i--) {
      /*Get the array position*/
      aryPos = character.curGridLoc + character.dx;
      character.curGridLoc = aryPos;
      
      cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
      
      /*Move the character*/
      console.log(cord[1]);
      character.animateMove(cord[0], cord[1], 1);
      
      //cord = backgroundImg.aryPixelPos(aryPos); //Get the pixel location of the starting position 32
      specialSq(character, aryPos);
   }
   //console.log(character.curGridLoc  + " " + character.dx);
   /*Reset number of moves*/
   backgroundImg.gameRef.move = 0;
   
   /*Save player's new location*/
   cord = backgroundImg.aryPixelPos(character.curGridLoc); //Get the pixel location of the starting position
   character.xPos = cord[0];
   character.yPos = cord[1];
   //character.redraw(character.xPos, character.yPos);   
}

function specialSq(character, aryPos) {
   var grid = backgroundImg.grid
   
   /*Determine the appropriate action*/
   if (grid[aryPos] == "right") {  //Directional change - Right
      character.dx = 1;
   }
   else if (grid[aryPos] == "up") { //Directional change - Up
      character.dx = -backgroundImg.gridCol;
   }
   else if (grid[aryPos] == "left") { //Directional change - Left
      character.dx = -1;
   }
   else if (grid[aryPos] == "down") { //Directional change - Down
      character.dx = backgroundImg.gridCol;
   }
   else if (grid[aryPos] == "end") {  //Reached the end
      character.dx = 0;
      backgroundImg.gridRef.winner.push(character);
   }
}



