array of 10 "holes" 
each hole is either on or off
if "on" display a color
if clicked and on, score goes up

at random times boxes will be activated for a random time span


var boxes;
var boxSize;
var boxLoc;
var timer;
var score;

function setup() {
	createCanvas(400, 400);
	rectMode(CENTER);
	score = 0;
	boxSize = 50;
	boxes = [];
	boxLoc = createVector(boxSize*2, boxSize*2);
	timer = int(random(10,50));
	for(var i = 0; i < 10; i++) {
		var b = new hitBox(boxLoc.x,boxLoc.y,false);
		boxes.push(b);
		
		boxLoc.x = boxLoc.x+boxSize+boxSize;
		if(i == 2) { 
			boxLoc.x = boxSize;
			boxLoc.y = boxLoc.y + boxSize*2; 
		}
		if(i == 6) { 
			boxLoc.x = boxSize*2;
			boxLoc.y = boxLoc.y + boxSize*2; 
		}
	}
	console.log(boxes);
}

function draw() {
	background(220);
	fill(0);
	textSize(36);
	text(score,50,50);
	var chosenBox = -1;
	// pick random box to activate
	if(timer <= 0) {
		chosenBox = int(random(0,10));
		timer = int(random(20,75));
	}
	timer = timer - 1;

	for(var i = 0; i < boxes.length; i++) 
	{
		if(i == chosenBox && !boxes[i].isActive) 
		{
			boxes[i].isActive = true;
			boxes[i].timer = int(random(20,75));
		}
		if(boxes[i].isActive) 
		{
			stroke(255);
			fill(255,0,0);
			rect(boxes[i].x,boxes[i].y,boxSize,boxSize);
			boxes[i].timer = boxes[i].timer - 1;
			if(boxes[i].timer <= 0) {
				boxes[i].isActive = false;
			}
		}
		else 
		{
			noStroke();
			fill(255,255,255);
			rect(boxes[i].x,boxes[i].y,boxSize,boxSize);
		}
	}
}

function mousePressed() {
	for(var i = 0; i < boxes.length; i++) 
	{
		if(mouseX > boxes[i].x - boxSize/2 && mouseX < boxes[i].x + boxSize/2) {
			if(mouseY > boxes[i].y - boxSize/2 && mouseY < boxes[i].y + boxSize/2) {
				if(boxes[i].isActive) {
					//console.log("ACTIVE BOX CLICKED!");
					score = score + 100;
					boxes[i].isActive = false;
				}
			}
		}
	}
}

class hitBox {
	constructor(_x,_y,_a) {
		this.x = _x;
		this.y = _y;
		this.isActive = _a;
		this.timer = 0;
	}
}