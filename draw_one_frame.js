let characterY=height/2;

function draw_one_frame(cur_frac) {
	fill(255,255,255);
	
	rectMode(CORNER);
	//rect(0,0,width,height);
	drawCharacter();
	drawGround();
}
function drawCharacter(){
	stroke(0,0,0);
	fill(255,0,255);
	strokeWeight(1);
	rectMode(CENTER);
	rect(width/10,characterY,width/20,height/5);
}
function drawGround(){

}