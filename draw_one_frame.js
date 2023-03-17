const groundY=canvasHeight/2;
let frameNo=0;
function draw_one_frame(cur_frac) {
	angleMode(DEGREES);
	frameNo=map(cur_frac,0,1,0,24);
	fill(255,255,255);
	rectMode(CORNER);
	rect(0,0,width,height);
	
	push(); 
	translate(0, canvasHeight/6);
	
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
	
	let shipX=width/5;
	let shipWidth=width/10;
	let lightDomewidth=width/50;
	ellipse(shipX,characterY+canvasHeight/50,lightDomewidth,width/60);//bottom dome
	ellipse(shipX,characterY,shipWidth,canvasHeight/30);//main body
	arc(shipX,characterY-canvasHeight/60,width/30,width/30,160,20,CHORD);//top dome
	
	//small circles on the body:
	ellipse(shipX,characterY+canvasHeight/180,width/150);// centre small circle
	ellipse(shipX-width/40,characterY,width/150);//left
	ellipse(shipX+width/40,characterY,width/150);//right

	// //fill(242, 226, 5);
	// beginShape();

	// endShape();
	let scanlineY;
	if(frameNo<12){
		scanlineY=map(frameNo, 0, 11, 0, canvasHeight/25);
	}
	else {
		scanlineY=map(frameNo, 12, 24,canvasHeight/25,0);
	}
	line(shipX+shipWidth/2,characterY,shipX+shipWidth,characterY+scanlineY);
	line(shipX+shipWidth/2,characterY,shipX+shipWidth,characterY-scanlineY);


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
		for(let y = 0; y +1 < (height-groundY-canvasHeight/7) /pixelSize; y++){		
			
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

