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
	//ellipse(width/5,characterY-canvasHeight/50,width/30);//top dome
	
	ellipse(width/5,characterY+canvasHeight/50,width/50,width/60);//bottom dome
	ellipse(width/5,characterY,width/10,canvasHeight/30);//main body
	arc(width/5,characterY-canvasHeight/60,width/30,width/30,160,20,CHORD);//top dome
	//ellipse()
// 	ellipse(width/5.2,characterY+canvasHeight/18,canvasHeight/20,width/24);//body 
// 	curve(width, 5, 26, 73, 24, 73, 61);
	
// //head:
// rect(width/5,characterY,width/24,canvasHeight/20,20);//head outline
// 	ellipse(width/5-width/80, characterY, width/80);//outer eye
// 	ellipse(width/5-width/80, characterY, width/200);//inner eye
// 	line(width/5,characterY+canvasHeight/50,(width/5)+(width/63), characterY+canvasHeight/50);//mouth

// //rect(width/5,characterY,width/20,canvasHeight/5);
}
function drawGround(cur_frac){
	line(0, groundY, width, groundY);

	//code adapted from the in class noise example 
	let mainColor = color(255,255,255); // white
	let backupColor = color(230,230,230); // grey
	let noiseColor;
	let pixelSize = width/50;//100
	fill(mainColor);
	rectMode(CORNER);
	for(let x = 0; x <=width/pixelSize; x++ ){
		for(let y = 0; y +1 < height /pixelSize; y++){		
			
		noiseColor = getNoiseValue(pixelSize*x,pixelSize*y, 0.8, "noiseColor",0,1, 200 );
		noiseLerp = lerpColor(mainColor,backupColor,noiseColor);
		fill(noiseLerp);
		noStroke();
		rect(pixelSize*x,groundY+pixelSize*y ,pixelSize);
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

