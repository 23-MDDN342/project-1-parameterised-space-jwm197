
const jumpStart=.4;
const jumpEnd=.9;
const jumpTop=(jumpStart+jumpEnd)/2;
const jumpHeight=canvasHeight/4;
const groundY=canvasHeight/2;
let characterY=groundY-canvasHeight/10;
function draw_one_frame(cur_frac) {
	fill(255,255,255);
	rectMode(CORNER);
	rect(0,0,width,height);
	//rectMode(CENTER);
	
	push();
	translate(0, canvasHeight/6);
	//fill(0,0,0);
	drawCharacter(cur_frac);
	drawGround(cur_frac);
	drawTree(cur_frac);
	//drawScore(cur_frac);
	pop();
	
}
function drawCloud(){

}

function drawScore(cur_frac){
	fill(0,0,0);
	strokeWeight(width/500);
	let score=floor(map(cur_frac,0,1,0,99));
	textSize(20);
	text('SCORE: '+score, 0+6/8*width, 0+height/10);
}
function drawCharacter(cur_frac){
	rectMode(CENTER);
	//stroke(0,0,0);
	//fill(255,0,255);
	strokeWeight(width/500);
	if(cur_frac>=jumpStart&&cur_frac<=jumpTop){
		characterY=map(cur_frac, jumpStart, jumpTop, groundY-canvasHeight/10, jumpHeight);
	}
	else if(cur_frac>=jumpTop&&cur_frac<=jumpEnd){
		characterY=map(cur_frac, jumpTop, jumpEnd,jumpHeight, groundY-(canvasHeight/10));
	}
	else{
		characterY=groundY-(canvasHeight/10);
	}
	
	//console.log(characterY);
	//console.log(cur_frac);
	//console.log(groundY-height/10);
	rect(width/5,characterY,width/20,canvasHeight/5);
	
	
}
function drawGround(cur_frac){
	line(0, groundY, width, groundY);
}
function drawTree(cur_frac){
	// let treeX=map(cur_frac,0,1,canvasWidth+canvasWidth/20,0-canvasWidth/20);
	// rectMode(CENTER);
	// rect(treeX,groundY-canvasHeight/20,canvasWidth/20,canvasHeight/10);

	
	


	let treeX=map(cur_frac,0,1,canvasWidth/2,0);
	//line()
	rectMode(CENTER);
	rect(treeX,groundY-canvasHeight/20,canvasWidth/20,canvasHeight/10);
	//push();
	//translate(width/2,0);
	rect(treeX+width/2,groundY-canvasHeight/20,canvasWidth/20,canvasHeight/10);
	//pop();

}
