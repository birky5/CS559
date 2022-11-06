function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 100;
    var x = -50;

    function draw() {
	canvas.width = canvas.width;
	// use the sliders to get the angles
	var theta1 = -((slider1.value)*0.005*(4*Math.PI));
    var phi1 = (slider1.value*0.005*(4*Math.PI));
	
	function moveToTx(x,y,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(x,y,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.lineTo(res[0],res[1]);}
	
	function drawStaticItems(color,Tx) {
        makeWheels(180, 300);
        makeWheels(280, 300);
        makeWheels(500, 300);
            // make body
        makeBody(Tx);
            // make cab
        makeCab(Tx);
	}

    function makeWheels(x, y) {
        context.beginPath();
        // x, y, start angle, end angle
        context.arc(x, y, 35, 0, 2 * Math.PI);
        context.fillStyle = "gray";
        context.lineWidth="2";
        context.fill();
        context.stroke();
    }

    function makeBody(Tx) {
        context.beginPath();
        moveToTx(0,0,Tx);
        lineToTx(300,0,Tx);
        lineToTx(300,-35,Tx);
        lineToTx(0,-35,Tx);
        context.closePath();
        context.fillStyle = "#0b5394";
        context.fill();
        context.stroke();
    }

    function makeCab(Tx) {
        context.beginPath();
        moveToTx(300, 0,Tx);
        lineToTx(300, -250, Tx);
        lineToTx(450, -250, Tx);
        lineToTx(450, 0, Tx);
        context.closePath();
        context.fillStyle = "#0b5394";
        context.fill();
        context.stroke();
        makeWindow(Tx);
    }

    function makeWindow(Tx) {
        context.beginPath();
        moveToTx(350, -200, Tx);
        lineToTx(350, -150, Tx);
        lineToTx(450, -150, Tx);
        lineToTx(450, -200, Tx);
        context.closePath();
        context.strokeStyle="black";
        context.fillStyle="#F0F8FF";
        context.fill();
        context.stroke();
    }

    function drawLifters(Tx) {
        context.beginPath();
        moveToTx(0, 0, Tx);
        lineToTx(-35, -90, Tx);
        lineToTx(-55, -90, Tx);
        lineToTx(-20, 0, Tx);
        context.closePath();
        context.lineWidth=2;
        context.strokeStyle="black";
        context.stroke();
        context.fillStyle="gray";
        context.fill();
    }

    function drawBoulder(x, Tx) {
        //context.rect(x, -30, 30, 30);
        console.log(x);
        context.beginPath();
        moveToTx(-x, -5, Tx);
        lineToTx(30 - x, -5, Tx);
        lineToTx(30 - x, -35,Tx);
        lineToTx(-x, -35, Tx);
        context.closePath();
        context.fillStyle="gray";
        context.fill();
        context.stroke();
    }

    function drawDumper(Tx) {
        context.beginPath();
        moveToTx(0,0,Tx);
        lineToTx(285, 0, Tx);
        lineToTx(285, -200, Tx);
        lineToTx(255, -200, Tx);
        lineToTx(255, -170, Tx);
        lineToTx(30, -170, Tx);
        lineToTx(30,-200,Tx);
        lineToTx(0,-200,Tx);
        context.closePath();
        context.fillStyle="red";
        context.fill();
        context.stroke();
    }

    function drawBackGate(Tx) {
        context.beginPath();
        moveToTx(0,0, Tx);
        lineToTx(0, 200, Tx);
        context.lineWidth=3;
        context.stroke();
    }
	
    var drawStatic = mat3.create();
	mat3.fromTranslation(drawStatic,[100,300]);
    // 100,300
	drawStaticItems("blue",drawStatic);

    var drawMyLifters = mat3.create();
    mat3.fromTranslation(drawMyLifters,[220, -35]);
    // 220, -35
    var T_drawMyLifters = mat3.create();
    mat3.multiply(T_drawMyLifters, drawStatic, drawMyLifters);
    drawLifters(T_drawMyLifters);

    var drawMyLifter2 = mat3.create();
    mat3.fromTranslation(drawMyLifter2,[-39,-91]);
    // -39, -91
    mat3.scale(drawMyLifter2, drawMyLifter2,[0.65,0.70]);
    var T_drawMyLifter2 = mat3.create();
    mat3.multiply(T_drawMyLifter2, T_drawMyLifters, drawMyLifter2);
    drawLifters(T_drawMyLifter2);
    // Static items above

	var drawMyBoulder = mat3.create();
    mat3.fromTranslation(drawMyBoulder,[100,265]);
    // 100, 265
    mat3.rotate(drawMyBoulder, drawMyBoulder, theta1);
    drawBoulder(x, drawMyBoulder);

    var drawMyDumper = mat3.create();
    mat3.fromTranslation(drawMyDumper,[0,0]);
    // 0, 0
    var T_drawMyDumper = mat3.create();
    mat3.multiply(T_drawMyDumper, drawMyBoulder, drawMyDumper);
    drawDumper(T_drawMyDumper);

    var drawMyBackGate = mat3.create();
    mat3.fromTranslation(drawMyBackGate,[0,-200]);
    // 0, -200
    mat3.rotate(drawMyBackGate, drawMyBackGate, phi1);
    var T_drawMyBackGate = mat3.create();
    mat3.multiply(T_drawMyBackGate, drawMyBoulder, drawMyBackGate);
    drawBackGate(T_drawMyBackGate);
    // Moving items, the boulders children are the back gate and the bed of the truck
	
    setTimeout(() => {
        requestAnimationFrame(draw);
        if (slider1.value == 108) {
            slider1.value = 100;
            x = -50;
        } else {
            slider1.value++;
        }

        x = x + 12;
        }, 1000);
        
    }

    slider1.addEventListener("input",draw);
    draw();
}
window.onload = setup;