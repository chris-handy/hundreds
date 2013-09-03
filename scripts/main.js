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
	stage.add(shapesLayer);
	/**********************************
		creating the circle object
	*************************************/
	var circle = new Kinetic.Circle({
		x : stage.getWidth() / 2,
		y : stage.getHeight() / 2,
		radius : 10,
		fill : 'grey',
		stroke : 'black',
		strokeWidth : 1
	});

	//circle properties 
	circle.X = stage.getWidth() / 2;
	circle.Y = stage.getHeight() / 2;
	circle.VX = 5;
	circle.VY = 5;
	circle.RAF;
	//make the circle move
	circle.move=function(){
	    // calc new balloon position
	    this.X+=this.VX;
	    this.Y+=this.VY;
	    console.log(stage);
	    
	    // reverse if colliding
	    var radius=this.getRadius();
	    if(this.X < radius){ this.VX *= -1; this.X = radius; }
	    if(this.X > stage.getWidth()-radius){ this.VX *= -1; this.X = stage.getWidth()-radius; }
	    if(this.Y < radius){ this.VY *= -1; this.Y = radius; }
	    if(this.Y > stage.getHeight()-radius){ this.VY *= -1; this.Y = stage.getHeight()-radius; }

	    // set the new balloon position
	    this.setPosition(this.X,this.Y);
	    // draw it
		shapesLayer.draw();
	    // request a new animation loop
	    var b=this;
	    this.RAF=requestAnimationFrame(function(){ b.move();});
	}
	//make the circle expand when clicked on
	circle.tw;
	circle.on("mousedown",function(){
		cancelAnimationFrame(this.RAF);
	    this.tw=new Kinetic.Tween({
	        node:this,
	        duration:3,
	        radius:100
	    });
	    this.tw.play();
	});
	//make the circle stop expanding and return moving;
	circle.on("mouseup",function(){
	    this.tw.pause();
	    this.move();
	});

	//add the circle to the shapelayer and make it move
	shapesLayer.add(circle);
	circle.move()
	shapesLayer.draw();
}
	

