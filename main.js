function bbox(x,y,height,width){
	$('.bbox').css('transform','translate('+x+'px, '+y+'px)')
	$('.bbox').css('height',(height)+'px')
	$('.bbox').css('width',(width)+'px')
}
function bbox2(x,y,height,width){
	$('.bbox2').css('transform','translate('+x+'px, '+y+'px)')
	$('.bbox2').css('height',(height)+'px')
	$('.bbox2').css('width',(width)+'px')
}
function isBetween(start,stop,number,number2) {
	if(start>stop){
		temp = start
		start = stop
		stop = temp
	}
	if(number>=start & number <=stop){
		return true;
	}
	if(number2>=start & number2 <=stop){
		return true;
	}
	return false;
}
function getCorners(element,element2) {
	var rect = document.getElementById(element).getBoundingClientRect();
	var rect2 = document.getElementById(element2).getBoundingClientRect();
	//console.log(rect);
	bbox(rect.x,rect.y,rect.height,rect.width);
	bbox2(rect2.x,rect2.y,rect2.height,rect2.width);
	if(isBetween(rect.x,rect.width+rect.x,rect2.x,rect2.x+rect2.width)){
		if(isBetween(rect.y,rect.height+rect.y,rect2.y,rect2.y+rect2.height)){
			console.log("Collided");
			alert("Collided")
			return true;
		}
	}
	return false;
}
$(document).ready(function() {
	$('.box1').css('transform','translate('+innerWidth/2+'px, '+innerHeight*3/4+'px)')
	$('.box2').css('transform','translate('+innerWidth/2+'px, '+innerHeight*2/4+'px)')
	console.log('transform','translate('+innerWidth/2+'px, '+innerHeight/2+'px)')
	X = innerWidth/2
	Y = innerHeight*3/4
	Xd = innerWidth/2
	Yd = innerHeight*2/4
	theta = 0
	theta2 = 0
	let keysPressed = {};
	document.addEventListener('keydown', (event) => {
		key  = (String.fromCharCode(event.keyCode))
   		keysPressed[key] = true;
   		
	});
	document.addEventListener('keyup', (event) => {
		key = (String.fromCharCode(event.keyCode))
		//console.log(key)
    	delete keysPressed[key];
 	});
 	
	setInterval(function() {
		
		push  = 10
		if(keysPressed['W']){
    		Y-=push*Math.cos(theta* Math.PI / 180)
    		X-=push*Math.sin(theta* Math.PI / 180)
    	}
    	if(keysPressed['S']){
    		Y+=push*Math.cos(theta* Math.PI / 180)
    		X+=push*Math.sin(theta* Math.PI / 180)
    	}
    	if(keysPressed['A']){
    		theta+=3
    	}
    	if(keysPressed['D']){
    		theta-=3
    	}
    	push  = 10
		if(keysPressed['&']){
    		Yd-=push*Math.cos(theta2* Math.PI / 180)
    		Xd-=push*Math.sin(theta2* Math.PI / 180)
    	}
    	if(keysPressed['(']){
    		Yd+=push*Math.cos(theta2* Math.PI / 180)
    		Xd+=push*Math.sin(theta2* Math.PI / 180)
    	}
    	if(keysPressed['%']){
    		theta2+=3
    	}
    	if(keysPressed["'"]){
    		theta2-=3
    	}
    	getCorners('box1','box2');
    	$('.box1').css('transform','translate('+X+'px, '+Y+'px) rotate('+-1*theta+'deg)')	
    	$('.box2').css('transform','translate('+Xd+'px, '+Yd+'px) rotate('+-1*theta2+'deg)')	
	},20)
})