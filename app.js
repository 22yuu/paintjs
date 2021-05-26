const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave"); 
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); // 기본 캔바스의 배경색을 하얀색으로 디폴트 해준다.
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

}

function handleCM(event) {
    event.preventDefault(); // 우클릭 방지
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[❤]";
    console.log(link)
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); // 페이지를 우클릭했을 때 나타나는 메뉴를 contextmenu라고 한다.
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick))

if(range) {
    range.addEventListener("input", handleRangeChange)
}

if(mode) {
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}