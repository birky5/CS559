function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = -25;

    function draw() {
	canvas.width = canvas.width;
	// use the sliders to get the angles
	var tParam = slider1.value*0.01;
	
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawCar(color,Tx) {
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-.10,-.08],Tx);
	    lineToTx([-.10,.05],Tx);
	    lineToTx([.10,.05],Tx);
	    lineToTx([.10,-.08],Tx);
	    context.closePath();
	    context.fill();

		context.beginPath();
		moveToTx([-.07,-.09],Tx);
		lineToTx([-.07,-.05],Tx);
		lineToTx([-.04,-.05],Tx);
		lineToTx([-.04,-.09],Tx);
		context.fillStyle = "black";
		context.closePath();
		context.fill();

		context.beginPath();
		moveToTx([.07,-.09],Tx);
		lineToTx([.07,-.05],Tx);
		lineToTx([.04,-.05],Tx);
		lineToTx([.04,-.09],Tx);
		context.fillStyle = "black";
		context.closePath();
		context.fill();
	}

	var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec2.create();
	    vec2.scale(result,P[0],b[0]);
	    vec2.scaleAndAdd(result,result,P[1],b[1]);
	    vec2.scaleAndAdd(result,result,P[2],b[2]);
	    vec2.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0=[0,0];
	var d0=[0,0]; 
	var p1=[1,1];
	var d1=[0,0];
	var p2=[2,2];
	var d2=[2,0];
	var p3=[3,0];
	var d3=[-3,0];
	var p4=[2,1];
	var d4=[-2,-4];
	var p5 = [0.5,-1];
	var d5 = [-4,3];

	var P2 = [p2,d2,p3,d3];
	var P3 = [p3,d3,p4,d4];
	var P4 = [p4,d4,p5,d5];
	var P5 = [p5,d5,p0,d0];

	var C0 = function(t) {
		var x = t;
		var y = t*t;
		return [x,y];
	}
	var C1 = function(t) {
		var x = t;
        var y = -t*t+4*t-2;
        return [x,y];
	}
	// C0 and C1 are two connected piecewise continuous curves
	var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
	var C3 = function(t_) {return Cubic(Hermite,P3,t_);};
	var C4 = function(t_) {return Cubic(Hermite,P4,t_);};
	var C5 = function(t_) {return Cubic(Hermite,P5,t_);};
	// C2 through C5 are continuous hermite curves

	var Ccomp = function(t) {
        if (t<1){
            return C0(t);
        } else if (t<2) {
            return C1(t);
        } else if (t<3){
			var u = t-2.0;
			return C2(u);
		} else if (t<4) {
			var u = t-3.0;
			return C3(u);
		} else if (t<5){
			var u = t-4.0;
			return C4(u);
		} else {
			var u = t-5.0;
			return C5(u);
		}
	}

	function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
        moveToTx(C(t_begin),Tx);
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t),Tx);
        }
        context.stroke();
	}
	
	var curves = mat3.create();
	mat3.fromTranslation(curves,[50,350]);
	mat3.scale(curves,curves,[150,-150]); // Flip the Y-axis

	if (document.getElementById("checkbox").checked) {
		drawTrajectory(0.0,1.0,100,C0,curves,"red");
		drawTrajectory(1.0,2.0,100,C1,curves,"blue");
		drawTrajectory(0.0,1.0,100,C2,curves,"green");
		drawTrajectory(0.0,1.0,100,C3,curves,"black");
		drawTrajectory(0.0,1.0,100,C4,curves,"purple");
		drawTrajectory(0.0,1.0,100,C5,curves,"brown");
	}

	var car = mat3.create();
	mat3.fromTranslation(car,Ccomp(tParam));
	var Tcar = mat3.create();
	mat3.multiply(Tcar, curves, car);
	drawCar("red",Tcar);

	setTimeout(() => {
        requestAnimationFrame(draw);
        if (slider1.value == 600) {
            slider1.value = 0;
        } else {
            slider1.value++;
        }

        }, 12);      
    }    
    
    //slider1.addEventListener("input",draw);
    draw();
}
window.onload = setup;
