let characterY=0+canvasHeight/2;

function draw_one_frame(cur_frac) {
	fill(255,255,255);
	
	rectMode(CORNER);
	rect(0,0,width,height);
	drawCharacter(cur_frac);
	drawGround();
}
function drawCharacter(cur_frac){
	rectMode(CENTER);
	//stroke(0,0,0);
	fill(255,0,255);
	strokeWeight(width/500);
	if(cur_frac>=.1&&cur_frac<=.5){
		characterY=map(cur_frac, 0.1, .5, canvasHeight/2, canvasHeight/4);
	}
	else if(cur_frac>=.5&&cur_frac<=.9){
		characterY=map(cur_frac, 0.5, .9,canvasHeight/4, canvasHeight/2);
	}
	
	console.log(characterY);
	rect(0+2*width/10,characterY,width/20,height/5);
	
	
}
function drawGround(){

}