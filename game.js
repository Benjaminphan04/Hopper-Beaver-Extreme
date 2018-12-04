// Use spacebar to jump!

/*
- Added in red negative sticks to reduce the players score if grabbed or touched

- After a certain amount of points, a winning screen will pop up if reached to the required amount of points.

*/


var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
        stick.y = -400;
        this.sticks++;
    }
};

Beaver.prototype.checkForBadGrab = function(badStick) {
    if ((badStick.x >= this.x && badStick.x <= (this.x+40)) &&         (badStick.y >= this.y && badStick.y <= (this.y+40))) {
        badStick.y = -400;
        this.sticks--;
    }
};

var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};

Stick.prototype.draw = function() {
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var badStick = function(x, y) {  
    this.x = x;
    this.y = y;
};

badStick.prototype.draw = function() { 
    fill(255, 0, 0);
    image(getImage("creatures/OhNoes"),this.x,this.y,25,25);
};

var beaver = new Beaver(200, 300);

var sticks = [];
for (var i = 0; i < 230; i++) {  
    sticks.push(new Stick(i * 40 + 300, random(25, 360)));
}

var badSticks = [];
for (var i = 0; i < 200; i++) {
    badSticks.push(new badStick(i * 140 + 300, random(50,250)));
}

var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}

draw = function() {
    
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1; 
    }
    
    for (var i =0; i < badSticks.length; i++) {
        badSticks[i].draw();
        beaver.checkForBadGrab
(badSticks[i]);
        badSticks[i].x -= 10;  
        
    } 
    fill(18, 24, 138);
    textSize(18);
    text("Score: " + beaver.sticks, 175, 30);
    
    if (beaver.sticks/sticks.length >= 0.04) {
        textSize(36);
        fill(0, 0, 0);
        rect( 200,185,220,50 );
        fill(255, 255, 255);
        text("YOU WIN !!!", 100, 200); 
    }
    
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();
};
    
   
