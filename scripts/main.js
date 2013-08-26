/***********************************
	initial variables 
**************************************/
var canvas = document.getElementById('stage');
var circle = canvas.getContext('2d');
var circleX = canvas.width/2;
var circleY = canvas.height/2;
var radius = 50;
var dx = 3;
var dy = 3;

/********************************************
	Load when the document does.
*******************************************/
	window.onload = function(e){
		init();
		console.log('hello');
	}
/******************************************
	Having the circle move around randomly
*********************************************/

function init(){
	setInterval(drawCircle, 10);
}


function drawCircle(){
//draw the circle and have it move
	circle.clearRect(0, 0, 900, 600);
	circle.beginPath();
	circle.arc(circleX, circleY, radius, 0, 2 * Math.PI, false);
	circle.closePath();
	circle.fillStyle = 'grey';
	circle.fill();
	circle.lineWidth = 1;
	circle.strokeStyle = '#000';
	circle.stroke();
	circleX += dx;
	circleY += dy;
//boundary logic
	if (circleX - 50 < 0 || circleX + 50 > 900) dx =- dx;
	if (circleY - 50 < 0 || circleY + 50 > 600) dy =- dy;
}

