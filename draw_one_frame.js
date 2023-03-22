const ease = new p5.Ease();
const groundY=canvasHeight/2;
let frameNo=0;
function draw_one_frame(cur_frac) {
	angleMode(DEGREES);
	frameNo=map(cur_frac,0,1,0,24);//convert cur fract to a number between 0 and 24 to make it eaiser to  do keyframing 
	fill(255);
	rectMode(CORNER);
	rect(0,0,width,height);//background
	push(); 
	
	translate(0, canvasHeight/6);
	drawTree();
	drawShip(cur_frac);
	drawGround();
	pop();
	drawCloud();
}
function drawCloud(){
	let numOfClouds=4;
	let cloudY=canvasHeight/4;
	fill(150);
	noStroke();
	

	for(let i=-1;i<numOfClouds;i++){
		let cloudX=map(frameNo,0,24,canvasWidth/numOfClouds+i*canvasWidth/numOfClouds,+i*canvasWidth/numOfClouds);
		push();
		translate(cloudX,cloudY);
		ellipse(+width/40,-canvasHeight/200,canvasHeight/30);
		ellipse(+width/75,-canvasHeight/200,canvasHeight/40);
		rect(0,0,width/25,canvasHeight/35,20);
		pop();
	}
	

}
function drawShip(cur_frac){
	const jumpStart=9;
	const jumpEnd=18;
	const jumpTop=(jumpStart+jumpEnd)/2-1;
	const jumpHeight=canvasHeight/4;
	let shipY=groundY-canvasHeight/10;
	const ease_amount_across = ease.circularInOut(cur_frac*1.5);
	rectMode(CENTER);
	//work out ship height:
	if(frameNo>=jumpStart&&frameNo<=jumpTop){
	// 	shipY=map(frameNo, jumpStart, jumpTop, groundY-canvasHeight/10, jumpHeight);
		shipY=map(ease_amount_across, 0, 1, groundY-canvasHeight/10, jumpHeight);
	}
	else if(frameNo>=jumpTop&&frameNo<=jumpEnd){
		shipY=map(frameNo, jumpTop, jumpEnd,jumpHeight, groundY-(canvasHeight/10));
	}
	else{
		shipY=groundY-(canvasHeight/10);
	}
	
	
	
	let shipX=width/5;
	let shipWidth=width/10;
	let lightDomewidth=width/50;
	noStroke();
	//inner light
	fill(242, 226, 5,200);
	beginShape();
	vertex(shipX-lightDomewidth/2,shipY+canvasHeight/50);
	vertex(shipX+lightDomewidth/2,shipY+canvasHeight/50);
	vertex(shipX+width/30,shipY+height/4);
	vertex(shipX-width/30,shipY+height/4);
	endShape(CLOSE);
	//wider light
	fill(242, 226, 5,100);
	vertex(shipX-lightDomewidth/2,shipY+canvasHeight/50);
	vertex(shipX+lightDomewidth/2,shipY+canvasHeight/50);
	vertex(shipX+width/20,shipY+height/4);
	vertex(shipX-width/20,shipY+height/4);
	endShape(CLOSE);

	//draw the ship
	stroke(0);
	strokeWeight(width/500);
	fill(255);
	ellipse(shipX,shipY+canvasHeight/50,lightDomewidth,width/60);//bottom dome
	ellipse(shipX,shipY,shipWidth,canvasHeight/30);//main body
	arc(shipX,shipY-canvasHeight/60,width/30,width/30,160,20,CHORD);//top dome
	
	//small circles on the body:
	ellipse(shipX,shipY+canvasHeight/180,width/150);// centre small circle
	ellipse(shipX-width/40,shipY,width/150);//left
	ellipse(shipX+width/40,shipY,width/150);//right
}
function drawGround(){
	let voronoiSegments=200;
	noSmooth();
	voronoiCellStrokeWeight(width/700);
	voronoiCellStroke(0);
	voronoiSiteFlag(false);

	randomSeed(6);
	//code adapted from the in class noise example 
	let noiseColor;
	let pixelSize = width/100;
	rectMode(CORNER);
	let x=0;
	let y=0;
	for (var i = 0; i < voronoiSegments; i++) {
		x=random(0, width);
		y=random(0,canvasHeight-groundY);
		noiseColor = getNoiseValue(pixelSize*x,pixelSize*y, 0.1, "noiseColor",0,1, width/5 );
		noiseLerp = lerpColor(color(255),color(200),noiseColor);
		voronoiSite(x,y,noiseLerp);
	}
	
	
	
	voronoiJitterStepMax(20);
	voronoiJitterStepMin(5);
	voronoiJitterFactor(3);
	voronoiJitterBorder(false);
	voronoi(width, canvasHeight-groundY-canvasHeight/6, false);
	push();
	
	let treeX=map(frameNo,0,24,canvasWidth/4,0-canvasWidth/20);
	
	
	voronoiDraw(treeX, groundY, true, false);
	
	push();
	translate(width/2+canvasWidth/20,0);
	voronoiDraw(treeX, groundY, true, false);
	
	pop();


	//translate(tx,0);
	//voronoiDraw(0, groundY, true, false);
	//voronoiDraw(width/2, groundY, true, false);
	pop();
	
	//drawn ground line:
	stroke(0);
	strokeWeight(width/500);
	line(0, groundY, width, groundY);
	
}
function drawTree(){
	rectMode(CENTER);
	let trunkHeight=canvasHeight/30;
	let treeX=map(frameNo,0,24,canvasWidth/2,0-canvasWidth/20);
	strokeWeight(width/500);
	stroke(0);
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

