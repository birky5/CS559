var val1 = 0;
var val2 = 0;

function checkBoxChecked() {
    if (document.getElementById("checkbox").checked) {
        val1 = 1;
    } else {
        val1 = 0;
    }
}

function check3d() {
    if (document.getElementById("check3d").checked) {
        val2 = 1;
    } else {
        val2 = 0;
    }
}

function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;

    var context = cameraContext; // default to drawing in the camera window

    function draw() {
      
    // clear both canvas instances
	observerCanvas.width = observerCanvas.width;
	cameraCanvas.width = cameraCanvas.width;

	// use the sliders to get the angles
	var tParam = slider1.value*0.01;
    var viewAngle = slider2.value*0.02*Math.PI;
     
	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawCar(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
        context.fillStyle = color;
        moveToTx([-15,-18,0],Tx);
        lineToTx([-15,15,0],Tx);
        lineToTx([-15,15,15],Tx);
        lineToTx([-15,-18,15],Tx);
        context.closePath();
	    context.fill();

        context.beginPath();
        context.fillStyle = color;
        moveToTx([15,-18,0],Tx);
        lineToTx([15,15,0],Tx);
        lineToTx([15,15,15],Tx);
        lineToTx([15,-18,15],Tx);
        context.closePath();
	    context.fill();

        context.beginPath();
	    context.fillStyle = color;
        moveToTx([-15,-18,0],Tx);
	    lineToTx([-15,15,0],Tx);
	    lineToTx([15,15,0],Tx);
	    lineToTx([15,-18,0],Tx);
	    context.closePath();
	    context.fill();

        context.beginPath();
	    context.fillStyle = color;
        moveToTx([-15,-18,15],Tx);
	    lineToTx([-15,15,15],Tx);
	    lineToTx([15,15,15],Tx);
	    lineToTx([15,-18,15],Tx);
	    context.closePath();
	    context.fill();

        context.beginPath();
		moveToTx([-6,-17,0],Tx);
		lineToTx([-6,-11,0],Tx);
		lineToTx([-12,-11,0],Tx);
		lineToTx([-12,-17,0],Tx);
		context.fillStyle = "black";
		context.closePath();
		context.fill();

        context.beginPath();
		moveToTx([-6,-17,15],Tx);
		lineToTx([-6,-11,15],Tx);
		lineToTx([-12,-11,15],Tx);
		lineToTx([-12,-17,15],Tx);
		context.fillStyle = "black";
		context.closePath();
		context.fill();

        context.beginPath();
		moveToTx([6,-17,0],Tx);
		lineToTx([6,-11,0],Tx);
		lineToTx([12,-11,0],Tx);
		lineToTx([12,-17,0],Tx);
		context.fillStyle = "black";
		context.closePath();
		context.fill();

        context.beginPath();
		moveToTx([6,-17,15],Tx);
		lineToTx([6,-11,15],Tx);
		lineToTx([12,-11,15],Tx);
		lineToTx([12,-17,15],Tx);
		context.fillStyle = "black";
		context.closePath();
		context.fill();
	}
	
    function drawCamera(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
	    context.strokeStyle = color;
        // Twelve edges of a cropped pyramid
        moveToTx([-3,-3,-2],Tx);lineToTx([3,-3,-2],Tx);
        lineToTx([3,3,-2],Tx);lineToTx([-3,3,-2],Tx);
        moveToTx([3,-3,-2],Tx);lineToTx([2,-2,0],Tx);
        lineToTx([2,2,0],Tx);lineToTx([3,3,-2],Tx);
        moveToTx([2,-2,0],Tx);lineToTx([-2,-2,0],Tx);
        lineToTx([-2,2,0],Tx);lineToTx([2,2,0],Tx);
        moveToTx([-2,-2,0],Tx);lineToTx([-3,-3,-2],Tx);
        lineToTx([-3,3,-2],Tx);lineToTx([-2,2,0],Tx);
        context.stroke();
    }
      
    function draw3DAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
	    // Arrowheads
	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
	    // X-label
	    moveToTx([1.3,-.05,0],Tx);lineToTx([1.4,.05,0],Tx);
	    moveToTx([1.3,.05,0],Tx);lineToTx([1.4,-.05,0],Tx);
        // Y-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.35,0],Tx);lineToTx([.05,1.4,0],Tx);
        moveToTx([0,1.35,0],Tx);lineToTx([0,1.28,0],Tx);
	    // Z-label
	    moveToTx([-.05,0,1.3],Tx);
	    lineToTx([.05,0,1.3],Tx);
	    lineToTx([-.05,0,1.4],Tx);
	    lineToTx([.05,0,1.4],Tx);

	    context.stroke();
	}

    function drawUVWAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
	    // Arrowheads
	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
	    // U-label
        moveToTx([1.3,.05,0],Tx);lineToTx([1.3,-.035,0],Tx);lineToTx([1.35,-.05,0],Tx);
        lineToTx([1.4,-.035,0],Tx);lineToTx([1.4,.05,0],Tx);
        // V-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.3,0],Tx);lineToTx([.05,1.4,0],Tx);
	    // W-label
	    moveToTx([-.1,0,1.3],Tx);lineToTx([-.05,0,1.4],Tx);lineToTx([-0,0,1.3],Tx);
	    lineToTx([.05,0,1.4],Tx);lineToTx([.1,0,1.3],Tx);

	    context.stroke();
	}

    function drawUpVector(color,vecUp,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // A single line segment in the "up" direction
	    moveToTx([0,0,0],Tx);
        lineToTx(vecUp,Tx);
	    context.stroke();
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
	    var result=vec3.create();
	    vec3.scale(result,P[0],b[0]);
	    vec3.scaleAndAdd(result,result,P[1],b[1]);
	    vec3.scaleAndAdd(result,result,P[2],b[2]);
	    vec3.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0=[0,0,-10];
	var d0=[300,400,40];
	var p1=[200,100,60];
	var d1=[-100,300,80];
	var p2=[200,200,-200];
	var d2=[0,300,120];
    var p3=[200,300,130];
    var d3=[100,350,140];
    var p4=[-100,200, -150];
    var d4=[-300,-200,160];
    var p5=[-200,100,170];
    var d5=[25,-110,180];

	var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents   /* mine
    var P2 = [p2,d2,p3,d3];
	var P3 = [p3,d3,p4,d4];
	var P4 = [p4,d4,p5,d5];
	var P5 = [p5,d5,p0,d0];

	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
    var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
    var C3 = function(t_) {return Cubic(Hermite,P3,t_);};
	var C4 = function(t_) {return Cubic(Hermite,P4,t_);};
	var C5 = function(t_) {return Cubic(Hermite,P5,t_);};

    var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } else if (t<2) {
            var u = t-1.0;
            return C1(u);
        } else if (t<3) {
            var u = t-2.0;
            return C2(u);
        } else if (t<4) {
            var u = t-3.0;
            return C3(u);
        } else if (t<5) {
            var u = t-4.0;
            return C4(u);
        } else {
            var u = t-5.0;
            return C5(u);
        }
	}

    var CameraCurve = function(angle) {
        var distance = 180.0;
        var eye = vec3.create();
        eye[0] = distance*Math.sin(viewAngle);
        eye[1] = 100;
        eye[2] = distance*Math.cos(viewAngle);  
        return [eye[0],eye[1],eye[2]];
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

    // create two lookAt transforms; one for the camera
    // and one for the "external observer"

    // Create Camera (lookAt) transform
    var eyeCamera = CameraCurve(viewAngle);
    var targetCamera = vec3.fromValues(0,0,0); // Aim at the origin of the world coords
    var upCamera = vec3.fromValues(0,100,0); // Y-axis of world coords to be vertical
	var TlookAtCamera = mat4.create();
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);
      
    // Create Camera (lookAt) transform
    var eyeObserver = vec3.fromValues(500,300,500);
    var targetObserver = vec3.fromValues(0,50,0); // Observer still looks at origin
    var upObserver = vec3.fromValues(0,0,0); // Y-axis of world coords to be vertical
	var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);
      
    // Create ViewPort transform (assumed the same for both canvas instances)
    var Tviewport = mat4.create();
	mat4.fromTranslation(Tviewport,[300,400,0]);  // Move the center of the
                                                  // "lookAt" transform (where
                                                  // the camera points) to the
                                                  // canvas coordinates (200,300)
	mat4.scale(Tviewport,Tviewport,[100,-100,1]); // Flip the Y-axis,
                                                  // scale everything by 100x
    // make sure you understand these    

    context = cameraContext;

    // Create Camera projection transform
    // (orthographic for now)
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);

    // Create Observer projection transform
    // (orthographic for now)
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);
     
    // Create transform t_VP_PROJ_CAM that incorporates
    // Viewport, projection and camera transforms
    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
    mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);
      
	// Create model(ing) transform
    // (from moving object to world)
    var Tmodel = mat4.create();
	mat4.fromTranslation(Tmodel,Ccomp(tParam));

    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
	var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera,TlookAtCamera);
    mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);
    context = cameraContext;

    if (val2 == 1) {
        draw3DAxes("grey",tVP_PROJ_VIEW_Camera,100.0);
    }

    if (val1 == 1) {
	    drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Camera,"red");
        drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Camera,"blue");
        drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_VIEW_Camera,"green");
        drawTrajectory(0.0,1.0,100,C3,tVP_PROJ_VIEW_Camera,"grey");
        drawTrajectory(0.0,1.0,100,C4,tVP_PROJ_VIEW_Camera,"black");
        drawTrajectory(0.0,1.0,100,C5,tVP_PROJ_VIEW_Camera,"purple");
    }

    drawCar("red",tVP_PROJ_VIEW_MOD_Camera,1.0);

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
    //slider2.addEventListener("input",draw);
    draw();
}
window.onload = setup;