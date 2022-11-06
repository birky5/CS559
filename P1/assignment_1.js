window.onload = function() { "use strict";
    var canvas = document.getElementById("myCanvas");
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");
    slider1.value = 0;
    slider2.value = 0;

    function drawAll() {
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;
        var dx = slider1.value;
        var dy = slider2.value;

        function drawRectangle() {
            context.rect(50, 75, 100, 100);
            context.fillStyle="#ABC";
            context.fill();
        }

        function drawTriangle() {
            context.beginPath();
            context.moveTo(250, 75);
            context.lineTo(300, 175);
            context.lineTo(200, 175);
            context.closePath();
            context.fillStyle="red";
            context.strokeStyle="black";
            context.lineWidth = 4;
            context.fill();
            context.stroke();
        }

        function drawCircle() {
            context.beginPath();
            context.arc(100, 250, 50, 0, 2 * Math.PI);
            context.stroke();
        }

        function drawAnE() {
            context.beginPath();
            context.moveTo(250, 275);
            context.lineTo(300, 275);
            context.lineTo(300, 300);
            context.lineTo(200, 300);
            context.lineTo(200, 200);
            context.lineTo(300, 200);
            context.lineTo(300, 225);
            context.lineTo(250, 225);
            context.lineTo(250, 245);
            context.lineTo(300, 245);
            context.lineTo(300, 255);
            context.lineTo(300, 255);
            context.lineTo(250, 255);
            context.lineTo(250, 275);
            context.closePath();
            context.fillStyle="brown";
            context.fill();
        }

        var random = Math.floor(Math.random() * 2);
        context.translate((random ? Math.floor(Math.random()) * 60 : Math.floor(Math.random() * -20)), (random ? Math.floor(Math.random()) * 80 : Math.floor(Math.random() * -80)));
        drawRectangle();
        random = Math.floor(Math.random() * 2);
        context.translate((random ? Math.floor(Math.random()) * 60 : Math.floor(Math.random() * -60)), (random ? Math.floor(Math.random()) * 21 : Math.floor(Math.random() * -21)));
        drawTriangle();
        random = Math.floor(Math.random() * 2);
        context.translate((random ? Math.floor(Math.random()) * 60 : Math.floor(Math.random() * -60)), (random ? Math.floor(Math.random()) * 100 : Math.floor(Math.random() * -100)));
        drawCircle();
        random = Math.floor(Math.random() * 2);
        context.translate((random ? Math.floor(Math.random()) * 60 : Math.floor(Math.random() * -60)), (random ? Math.floor(Math.random()) * 41 : Math.floor(Math.random() * -41)));
        drawAnE();
        random = Math.floor(Math.random() * 2);
        context.translate((random ? Math.floor(Math.random()) * 40 : Math.floor(Math.random() * -40)), (random ? Math.floor(Math.random()) * 61 : Math.floor(Math.random() * -61)));
    }

    slider1.addEventListener("input", drawAll);
    slider2.addEventListener("input", drawAll);
    drawAll();
}