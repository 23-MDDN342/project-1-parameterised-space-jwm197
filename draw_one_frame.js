const groundY=canvasHeight/2;
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
	pop();
	
}
function drawCloud(){

}
function drawCharacter(){
	const jumpStart=7;
	const jumpEnd=18;
	const jumpTop=(jumpStart+jumpEnd)/2;
	const jumpHeight=canvasHeight/4;
	
	let characterY=groundY-canvasHeight/10;
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

	
	ellipse(width/5.2,characterY+canvasHeight/18,canvasHeight/20,width/24);
	//push();
	// translate (0,0);
	// rotate(-45);
	// rect(width/5,characterY,width/20,canvasHeight/20,20);
	// pop();
// 	beginShape();

// curveVertex(width/5,characterY);
// curveVertex(84, 91);
// curveVertex(68, 19);
// curveVertex(21, 17);
// curveVertex(32, 91);
// curveVertex(32, 91);
// endShape();
	
rect(width/5,characterY,width/24,canvasHeight/20,20);
	ellipse(width/5-width/80, characterY, width/80);
	ellipse(width/5-width/80, characterY, width/200);
	line(width/5,characterY+canvasHeight/50,(width/5)+(width/63), characterY+canvasHeight/50);

//rect(width/5,characterY,width/20,canvasHeight/5);
}
function drawGround(cur_frac){
	line(0, groundY, width, groundY);

	let mainColor = color(255,255,255); // white
	let backupColor = color(230,230,230); // black
	
	
	let noiseColor;
	let noiseyColor; 
	let moveXMap;
	
	
	let orbSize = width / 20
	let spacingSize = width/100;
	
	//////////////////////////////////////////////
	fill(mainColor);
	rectMode(CORNER);
	for(let accross = 0; accross <=width/spacingSize; accross++ ){
		for(let down = 0; down +1 < height /spacingSize; down++){		
			
		noiseColor = getNoiseValue(spacingSize*accross,spacingSize*down, 0.8, "noiseColor",0,1, 200 );
		noiseyLerp = lerpColor(mainColor,backupColor,noiseColor);  // https://p5js.org/reference/#/p5/lerpColor
		fill(noiseyLerp);
		noStroke();
		rect(spacingSize*accross,groundY+spacingSize*down ,spacingSize);
		}
	}
}
function drawTree(){
	rectMode(CENTER);
	let trunkHeight=canvasHeight/30;
	let treeX=map(frameNo,0,24,canvasWidth/2,0-canvasWidth/20);
	strokeWeight(width/500);
	stroke(0,0,0);
	line(treeX,groundY,treeX,groundY-trunkHeight);
	push();
	translate(treeX,groundY);
	drawBranch(trunkHeight,0);
	pop();
	push();
	translate(width/2+canvasWidth/20,0);
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
	if(numOfBranches<4){
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

