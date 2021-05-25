const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    /*
        clientX, clientY는 전체 화면의 마우스 위치를 나타내고 offsetX, offsetY는 캔버스안의 마우스 위치를 나타낸다.
    */
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        // 마우스 클릭을 하지 않고 그냥 움직일 때 path만 그린다.
        ctx.beginPath();
        ctx.moveTo(x,  y);
    } else {
        // 마우스를 클릭하고 있을 때 선을 그린다.
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function onMouseDown(event){
    painting = true;

}

function onMouseUp(event) {
    stopPainting();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}