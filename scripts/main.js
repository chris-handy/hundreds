/*******************************
setting up the stage/layers
********************************/
window.onload = function(){
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

	//the circles custom properties 
	ball.vx = 0;
    ball.vy = 0;

    //add event listeners for mouseover/out/onclick
    

	/*************************************
		add the circle to the stage
	**************************************/
	//bindingBox.add(circle);
	shapesLayer.add(circle);
	stage.add(shapesLayer);

	var date = new Date();
    var time = date.getTime();
    animate(time, ball);
}

window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();	

function animate(lastTime, circle){
	var stage = circle.getStage();
	var shapesLayer = circle.getLayer();
	var date = new Date();
	var time = date.getTime();
	var timeDiff = time - lastTime;

	// update
	updateCircle(timeDiff, circle);

	// draw
	shapesLayer.draw();

	// request new frame
	requestAnimFrame(function(){
		animate(time, circle);
	});
}
 function updateCircle(timeDiff, circle){
	var stage = circle.getStage();
	var circleX = circle.x;
	var circleY = circle.y;

	// physics variables
	var gravity = 20; // px / second^2
	var speedIncrementFromGravityEachFrame = gravity * timeDiff / 1000;
	var collisionDamper = 0.2; // 20% energy loss
	var floorFriction = 5; // px / second^2
	var floorFrictionSpeedReduction = floorFriction * timeDiff / 1000;

	// if dragging and dropping
	if (circle.drag.moving) {
		var mousePos = stage.getMousePosition();

		if (mousePos !== null) {
			var mouseX = mousePos.x;
			var mouseY = mousePos.y;

			var c = 0.06 * timeDiff;
			circle.vx = c * (mouseX - circle.lastMouseX);
			circle.vy = c * (mouseY - circle.lastMouseY);
			circle.lastMouseX = mouseX;
			circle.lastMouseY = mouseY;
		}
	}
	else {
		// gravity
		circle.vy += speedIncrementFromGravityEachFrame;
		circleX += circle.vx;
		circleY += circle.vy;

		// ceiling condition
		if (circleY < circle.radius) {
			circleY = circle.radius;
			circle.vy *= -1;
			circle.vy *= (1 - collisionDamper);
		}

		// floor condition
		if (circleY > (stage.height - circle.radius)) {
			circleY = stage.height - circle.radius;
			circle.vy *= -1;
			circle.vy *= (1 - collisionDamper);
		}

		// floor friction
		if (circleY == stage.height - circle.radius) {
			if (circle.vx > 0.1) {
				circle.vx -= floorFrictionSpeedReduction;
			}
			else if (circle.vx < -0.1) {
				circle.vx += floorFrictionSpeedReduction;
			}
			else {
				circle.vx = 0;
			}
		}

		// right wall condition
		if (circleX > (stage.width - circle.radius)) {
			circleX = stage.width - circle.radius;
			circle.vx *= -1;
			circle.vx *= (1 - collisionDamper);
		}

		// left wall condition
		if (circleX < (circle.radius)) {
			circleX = circle.radius;
			circle.vx *= -1;
			circle.vx *= (1 - collisionDamper);
		}
	}

	circle.setPosition(circleX, circleY);
}