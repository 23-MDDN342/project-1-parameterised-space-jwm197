
const jumpStart=9;
const jumpEnd=20;
const jumpTop=(jumpStart+jumpEnd)/2;
const jumpHeight=canvasHeight/4;
const groundY=canvasHeight/2;
let characterY=groundY-canvasHeight/10;
let frameNo=0;
function draw_one_frame(cur_frac) {
	angleMode(DEGREES);
	frameNo=map(cur_frac,0,1,0,24);
	fill(255,255,255);
	rectMode(CORNER);
	rect(0,0,width,height);
	//rectMode(CENTER);
	
	push(); 
	translate(0, canvasHeight/6);
	//fill(0,0,0);
	drawCharacter();
	drawGround();
	drawTree();
	//drawScore();
	pop();
	
}
function drawCloud(){

}

// function drawScore(){
// 	fill(0,0,0);
// 	strokeWeight(width/500);
// 	let score=floor(map(frameNo,0,24,0,99));
// 	textSize(20);
// 	text('SCORE: '+score, 0+6/8*width, 0+height/10);
// }
function drawCharacter(){
	rectMode(CENTER);
	//stroke(0,0,0);
	//fill(255,0,255);
	strokeWeight(width/500);
	if(frameNo>=jumpStart&&frameNo<=jumpTop){
		characterY=map(frameNo, jumpStart, jumpTop, groundY-canvasHeight/10, jumpHeight);
	}
	else if(frameNo>=jumpTop&&frameNo<=jumpEnd){
		characterY=map(frameNo, jumpTop, jumpEnd,jumpHeight, groundY-(canvasHeight/10));
	}
	else{
		characterY=groundY-(canvasHeight/10);
	}
	
	//console.log(characterY);
	//console.log(cur_frac);
	//console.log(groundY-height/10);
	rect(width/5,characterY,width/20,canvasHeight/5);
	
	
}
function drawGround(){
	line(0, groundY, width, groundY);
}
function drawTree(){
	// let treeX=map(cur_frac,0,1,canvasWidth+canvasWidth/20,0-canvasWidth/20);
	// rectMode(CENTER);
	// rect(treeX,groundY-canvasHeight/20,canvasWidth/20,canvasHeight/10);

	
	
	let trunkHeight=canvasHeight/30;

	let treeX=
	//width/2;
	map(frameNo,0,24,canvasWidth/2,0);
	
	line(treeX,groundY,treeX,groundY-trunkHeight);
	push();
	translate(treeX,groundY);
	drawBranch(trunkHeight,0);
	pop();

	
	//rectMode(CENTER);
	//rect(treeX,groundY-canvasHeight/20,canvasWidth/20,canvasHeight/10);
	push();
	translate(width/2,0);
	// line(treeX,groundY,treeX,groundY-canvasHeight/trunkHeightDivider);
	// drawBranch(treeX,groundY-canvasHeight/trunkHeightDivider,25,trunkHeightDivider,1,1);
	// drawBranch(treeX,groundY-canvasHeight/trunkHeightDivider,25,trunkHeightDivider,1,-1);
	// //rect(treeX+width/2,groundY-canvasHeight/20,canvasWidth/20,canvasHeight/10);
	line(treeX,groundY,treeX,groundY-trunkHeight);
	push();
	translate(treeX,groundY);
	drawBranch(trunkHeight,0);
	pop();
	pop();

}
function drawBranch(branchLength,numOfBranches){
	let angle=340;
	line(0,0,0,-branchLength);
	translate(0,-branchLength);
	if(numOfBranches<5){
		push();
		rotate(angle);
		drawBranch(branchLength*.8,numOfBranches+1);
		pop();
		push();
		rotate(-angle);
		drawBranch(branchLength*.8,numOfBranches+1);
		pop();
	}
}
// function drawTree(){
// 	// let treeX=map(cur_frac,0,1,canvasWidth+canvasWidth/20,0-canvasWidth/20);
// 	// rectMode(CENTER);
// 	// rect(treeX,groundY-canvasHeight/20,canvasWidth/20,canvasHeight/10);

	
	
// 	let trunkHeightDivider=20;

// 	let treeX=
// 	//width/2;
// 	map(frameNo,0,24,canvasWidth/2,0);
	
// 	line(treeX,groundY,treeX,groundY-canvasHeight/trunkHeightDivider);
// 	drawBranch(treeX,groundY-canvasHeight/trunkHeightDivider,25,trunkHeightDivider,1,1);
// 	drawBranch(treeX,groundY-canvasHeight/trunkHeightDivider,25,trunkHeightDivider,1,-1);


	
// 	//rectMode(CENTER);
// 	//rect(treeX,groundY-canvasHeight/20,canvasWidth/20,canvasHeight/10);
// 	push();
// 	translate(width/2,0);
// 	line(treeX,groundY,treeX,groundY-canvasHeight/trunkHeightDivider);
// 	drawBranch(treeX,groundY-canvasHeight/trunkHeightDivider,25,trunkHeightDivider,1,1);
// 	drawBranch(treeX,groundY-canvasHeight/trunkHeightDivider,25,trunkHeightDivider,1,-1);
// 	//rect(treeX+width/2,groundY-canvasHeight/20,canvasWidth/20,canvasHeight/10);
// 	pop();

// }
// function drawBranch(x,y,rotation,branchDivider,depth,direction){
// 	//push();
// 	//translate(0,0);
// 	//rotate(rotation);
// 	let x2=x+direction*(sin(rotation)*(y-canvasHeight/branchDivider));
// 	let y2=cos(rotation)*y-canvasHeight/branchDivider;
// 	line(x,y,x2,y2);
// 	if(depth<4){
// 		drawBranch(x2,y2,rotation+25,branchDivider*2, depth+1,-1);
// 		drawBranch(x2,y2,rotation+25,branchDivider*2,depth+1,+1);
// 	}
	
// 	//pop();
// }
