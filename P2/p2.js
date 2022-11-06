function setup() {
    var canvas = document.getElementById('myCanvas');
    //var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');

    //slider1.value = 0;
    slider2.value = 100;
    var x = 20;

    function draw() {
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;

        // use the sliders to get the angles
        var theta1 = -((slider2.value)*0.005*(4*Math.PI));
        var phi1 = (slider2.value*0.005*(4*Math.PI));
        
        var dy = slider2.value;

        function drawMovingItems() {
            context.save(); // save the canvas before the scaling and translating for the lifter
            context.translate(10, 0);
            context.scale(1, 0.74+(dy / 100)); //lifter value goes up between 1 and 2
            context.rotate(-0.60);
            drawLifter("gray");
            context.save();

            context.translate(-30, -71);
            context.scale(.80,.90);
            context.rotate(0.10);
            drawLifter("gray");
            context.restore();

            // restore the context before all the transformations for the lifter mechanism
            context.restore();
            context.translate(-245,0);
            context.rotate(theta1);
            
            drawBoulder(x);
            //drawBed();

            context.translate(0,-190);
            context.rotate(phi1);
            drawBackGate();
            context.restore();
        }

        function drawBoulder(x) {
            context.rect(x, -30, 30, 30);
            context.fillStyle="gray";
            context.fill();
            context.stroke();
        }

        function drawBackGate() {
            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(0, 190);
            context.lineWidth=2;
            context.stroke(); 
        }

        function drawLifter(color) {
            context.beginPath();
            context.moveTo(-16,0);
            context.lineTo(-40, -70);
            context.lineTo(-60, -84);
            context.lineTo(-35,-9);
            context.closePath();
            context.fillStyle= color;
            context.fill();
            context.stroke();
        }

        function drawBed() {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(240, 0);
            context.lineTo(290, -225);
            context.lineTo(290, -225);
            context.lineTo(300, -245);
            context.lineTo(260, -245);
            context.lineTo(225, -225);
            context.lineTo(210, -190);
            context.lineTo(0, -190);
            context.closePath();
            context.strokeStyle="black";
            context.fillStyle="orange";
            context.lineWidth=2;
            context.fill();
            context.stroke();
        }

        function drawStaticItems(color) {
            // first make the 3 wheels of the dumptruck
            makeWheels(90, 300);
            makeWheels(190, 300);
            makeWheels(390, 300);
            // make body
            //makeBody();
            // make cab
            makeCab();
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


        function makeCab() {
            context.beginPath();
            context.moveTo(311, 290);
            context.lineTo(311, 90);
            context.lineTo(370, 90);
            context.quadraticCurveTo(420, 100, 450, 150);
            context.lineTo(450, 290);
            context.closePath();
            context.fillStyle = "#0b5394";
            context.fill();
            context.stroke();

            makeWindow();
        }

        function makeWindow() {
            context.beginPath();
            context.moveTo(450, 150);
            context.lineTo(350, 150);
            context.lineTo(350, 200);
            context.lineTo(450, 200);
            context.closePath();
            context.strokeStyle="black";
            context.fillStyle="#F0F8FF";
            context.fill();
            context.stroke();

        }

        context.translate(150, 150);
        //drawStaticItems("black");
        context.save();
        context.translate(255, 260);
        drawMovingItems();
        drawStaticItems("black");

        setTimeout(() => {
            requestAnimationFrame(draw);
            if (slider2.value == 110) {
                slider2.value = 100;
                x = 20;
            } else {
                slider2.value++;

            }

            x = x - 10;
        }, 1000);
        
        
    }
    draw();
}

window.onload = setup();