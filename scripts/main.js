/*******************************
	setting up the stage/layers
********************************/
var stage = new Kinetic.Stage({
	container : 'stage',
	width : 900,
	height : 600
});
var shapesLayer = new Kinetic.Layer();

/**********************************
	creating the circle object
*************************************/
var circle = new Kinetic.Circle({
	x : stage.getWidth() / 2,
	y : stage.getHeight() / 2,
	radius : 50,
	fill : 'grey',
	stroke : 'black',
	strokeWidth : 1
});

/************************************************
	create the binding box group for the circle
**********************************************/
/*var bindingBox = new Kinetic.Group({
	x : stage.getWidth(),
	y : stage.getHeight(),
	dragBoundFunc: function(pos){
		var x = stage.getWidth();
		var y = stage.getHeight();
		if(pos.x < 0){newX = 0}
		if(pos.x > stage.getWidth()){newX = stage.getWidth()}
		if(pos.y < 0){newY = 0}
		if(pos.y > stage.getHeight()){newY = stage.getHeight()}

	}
});
*/
/*************************************
	add the circle to the stage
**************************************/
//bindingBox.add(circle);
shapesLayer.add(circle);
stage.add(shapesLayer);

/************************************************
	creating the animation to move the circle
*************************************************/
var velocity = 50;

var anim = new Kinetic.Animation(function(frame) {
	var dist = velocity * (frame.timeDiff / 100);
	//console.log('adfasdf');
	console.log(circle.getY());
	circle.move(dist, 0);
	if(circle.getX() - 50 < 0){
		console.log('passed 0 stage width');
		//circle.setX(0);
		circle.move(0, 0);
	}
	if(circle.getX() + 50 > stage.getWidth() ){
		console.log('passed max stage width');
		circle.setX(stage.getWidth()-50);
	}
	if(circle.getY() - 50 < 0){
		console.log('passed 0 stage height');
		circle.setY(0);
	}
	if(circle.getY() + 50 > stage.getHeight()){
		console.log('passed max stage height');
		circle.setY(stage.getHeight()-50);
		//throw 'staahp';

	}
	
}, shapesLayer);

anim.start();

//http://www.html5canvastutorials.com/labs/html5-canvas-interactive-ball-physics/