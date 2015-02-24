/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: imageLib.js
 * 
 * Description:
 * This files contains the class and function that manipulates 
 * and draws on the HTML canvas.
 * 
 */
 
imageLib.prototype.constructor = imageLib;

/*Constructor for the imbLib library*/
function imageLib(canvasName, width, height, xPos, yPos) {    
    this.canvasName = canvasName;
    this.canvas = document.getElementById(this.canvasName);
    this.canvasCtx = this.canvas.getContext("2d"); 
    this.width = width;
    this.height = height;
    this.xPos = xPos;
    this.yPos = yPos;
    this.oldPosX = xPos;
    this.oldPosY = yPos;
    
    /*Original Start and End Position*/
    this.startX = xPos;
    this.startY = yPos;
    this.endX = null;
    this.endY = null;
    this.slopeX = 0;
    this.slopeY = 0;
       
    this.image = "";
    this.repeatHor = false;
    this.repeatVer = false;
    this.loopHor = false;
    this.loopVer = false;
    
    this.spaceBuffer = 0;
    
    this.visible = true;
    
    /*Drawing a line*/
    this.lineWidth = 10;
    this.strokeStyle = "black";
    
    /*Drawing a circle*/
    this.radius = 5;
    
    /*Colour*/
    this.fillStyle = "#0000ff"; 
    
    /*Canvas grid*/
    this.grid = [];
    this.gridRow = 0;
    this.gridCol = 0;
    this.gridSqWidth = 0;
    this.gridSqHeight = 0;
    
    /***Font***/
    this.fontDefault = "normal 12px Arial";
    
    /***Interface***/
    this.button = {};
    this.buttonName = [];
    
    /*Intro/Menu Screen*/
    this.introImg = {};
    this.introTitle = ""
    
    /*Game Over*/
    this.gameOverMessage = [];
};

/*Add image to the canvas*/
imageLib.prototype.addImg = function(image) {
    this.image = image; 
    this.canvasCtx.drawImage(image, this.xPos, this.yPos, this.width, this.height);
    
    /*Determine if the image needs to be repeated*/
    this.backgroundRepeat();
    
    this.oldPosX = this.xPos;
    this.oldPosY = this.yPos;
};

/*Clear entire canvas*/
imageLib.prototype.clearCanvas = function() {
    this.canvasCtx.clearRect(0, 0,  this.canvas.width, this.canvas.height);
};

/*Canvas Width*/
imageLib.prototype.canvasWidth = function() {
    return this.canvas.width;
};

/*Canvas Height*/
imageLib.prototype.canvasHeight = function() {
    return this.canvas.height;
};

/*Redraw the object/character based on its new coordinates*/
imageLib.prototype.redraw = function(newPosX, newPosY) {
    /*Redraw new image*/
    this.canvasCtx.drawImage(this.image, newPosX, newPosY,  this.width, this.height);
    
    /*Update related image information*/
    this.oldPosX = this.xPos;
    this.oldPosY = this.yPos;
    this.xPos = newPosX;
    this.yPos = newPosY;   
    
    /*Determine if the image needs to be repeated*/
    this.backgroundRepeat();
};

/*Repeat the background displayed on the canvas*/
imageLib.prototype.backgroundRepeat = function() {
    //console.log(this.canvas.width);
    var newPosX = this.xPos + this.width;
    var newPosY = this.yPos + this.width;
    var repeat = 0;
    
    if(this.repeatHor == true) {
        /*Repeat image from current position to the right*/
        while (newPosX < this.canvas.width) {
            this.canvasCtx.drawImage(this.image, newPosX, this.yPos,  this.width, this.height);
            newPosX = newPosX + this.width;
            repeat++;
        }
        
        /*Repeat image from current position to the left*/
        var newPosX = this.xPos - this.width;
        while (newPosX > (this.width * (-1))) {
            this.canvasCtx.drawImage(this.image, newPosX, this.yPos,  this.width, this.height);
            newPosX = newPosX - this.width;
            repeat++;
        }
        
        /*loop the image*/
        if (this.xPos >= this.canvas.width) {
            this.xPos = 0;
        }
        else if (this.xPos <= 0) {
            this.xPos = this.canvas.width;
        }
    }
};

imageLib.prototype.drawLine = function() {  
    this.canvasCtx.beginPath();
    this.canvasCtx.lineWidth= this.lineWidth;
    this.canvasCtx.strokeStyle= this.strokeStyle; //Setting path colour
    
    /*Draw out the path*/
    this.canvasCtx.moveTo(this.startX,this.startY);
    this.canvasCtx.lineTo(this.endX,this.endY);
    this.canvasCtx.stroke(); 
};

/*Draw a line based on its start and ending point*/
imageLib.prototype.drawLine = function(startX, startY, endX, endY) {  
    this.canvasCtx.beginPath();
    this.canvasCtx.lineWidth= this.lineWidth;
    this.canvasCtx.strokeStyle= this.strokeStyle; //Setting path colour
    
    /*Draw out the path*/
    this.canvasCtx.moveTo(startX,startY);
    this.canvasCtx.lineTo(endX,endY);
    this.canvasCtx.stroke(); 
};

/*Draw the a circle projectile*/
imageLib.prototype.drawProjectile = function() {
    var radius = this.radius;
    
    this.canvasCtx.beginPath();
    this.canvasCtx.fillStyle= this.fillStyle;
    this.canvasCtx.arc(this.xPos,this.yPos,radius,0,Math.PI*2,true);
    this.canvasCtx.closePath();
    this.canvasCtx.fill();    
    
    this.xPos += this.dx;
    this.yPos += this.dy;
    
    this.width = radius;
    this.height = radius;
};

/*Determine if the image intersects with another image on the canvas*/
imageLib.prototype.intersect =  function(image) { 
    var x1 = image.xPos;
    var x2 = image.xPos + image.width;
    var y1 = image.yPos;
    var y2 = image.yPos + image.height;

    /*Check to see if the image intersects with another image*/
    if ((x2 >= this.xPos) && (x1 <= (this.xPos + this.width)) && (y2 >= this.yPos) && (y1 <= (this.yPos + this.height))){
        return true;
    }
    
    return false;
};


/*Create a canvas grid based on the number of columns or rows*/
imageLib.prototype.canvasGrid = function(col, row) {
    var pos = 0;
    var numSq = col * row + 1;
     
    for (pos = 0; pos < numSq; pos++) {
        this.grid[pos] = 0;
    }
    
    this.gridRow = row;
    this.gridCol = col;
};

/*Create the canvas grid*/
imageLib.prototype.canvasGrid = function(squSize) {
    var pos = 0;
    var numSq;
    
    //var numSq = squSize + 1;
    var colNumSq = this.canvas.width / squSize;
    var rowNumSq = this.canvas.height / squSize;
     
    numSq = colNumSq * rowNumSq;
     
    for (pos = 0; pos < numSq; pos++) {
        this.grid[pos] = 0;
    }
    console.log(colNumSq + " " + rowNumSq + " " + numSq);
    
    this.gridRow = rowNumSq;
    this.gridCol = colNumSq;
};

/* Convert 2D array coordinate to a single 1D array number,
 * Starting at 1,1.
 * 
 * x = column number
 * y = row number
 */
imageLib.prototype.xyCordToAryNum = function(x, y) {
    var num;
    num = (y - 1) * this.gridCol + x;
    return num;
};

/* Convert 1D array to a two dimensional cordinate.
 * Starting at 1,1
 */
imageLib.prototype.aryNumToXYCord = function(num) {
    var temp = 0;   //temporary variable storage
    var cord = [];  //position 0 = x cordinate, 1 = y coordinate
    
    /*Determine the column number*/
    cord[0] = num % this.gridCol;
    
    /*Determine the row number*/
    cord[1] = Math.floor(num / this.gridCol);
    
    /*Modify the column number if it's the last column in the row*/
    if (cord[0] == 0 && num != 0) {
        cord[0] = this.gridCol;
        cord[1] -= 1;
    }
    
    console.log(num + " " + cord[0] + " " + cord[1]);
    
    return cord;
};


imageLib.prototype.aryPixelPos = function(num) {
    var cord = []; //position 0 = x cordinate, 1 = y coordinate
    //var x, y;
    //var pixel = [];
    
    cord = this.aryNumToXYCord(num);
    cord[0] = this.getGridXPos(cord[0]);
    cord[1] = this.getGridYPos(cord[1]);
    
    return cord;
};


/*Determine the y-pixel coordinate of the block*/
imageLib.prototype.getGridYPos = function(col) {
    var yPos;
    
    /*Getting the y coordinate pixel location of the block*/
    yPos = col *  this.gridSqHeight;
    
    return yPos;
};

/*Determine the x-pixel coordinate of the block*/
imageLib.prototype.getGridXPos = function(row) {
    var xPos;
    
    /*Getting the y coordinate pixel location of the block*/
    xPos = row *  this.gridSqWidth;
    
    return xPos;
};

/*Add information to grid*/
imageLib.prototype.addToGrid = function(pos, data){
    this.grid[pos] = data;
};







 
 