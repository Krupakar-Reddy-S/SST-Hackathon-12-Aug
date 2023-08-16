window.addEventListener('load', ()=>{
		
	resize();
	document.addEventListener('mousedown', startPainting);
	document.addEventListener('mouseup', stopPainting);
	document.addEventListener('mousemove', sketch);
	window.addEventListener('resize', resize);
});
	
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

clearCanvas = document.querySelector(".clear-canvas");
saveImg = document.querySelector(".save-img");

ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, ctx.width, ctx.height);

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();
});
	
function resize(){
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
}
	
let coord = {x:0 , y:0};

let paint = false;
	
function getPosition(event){
coord.x = event.clientX - canvas.offsetLeft;
coord.y = event.clientY - canvas.offsetTop;
}

function startPainting(event){
paint = true;
getPosition(event);
}
function stopPainting(){
paint = false;
}
	
function sketch(event){
if (!paint) return;
ctx.beginPath();

let width = document.getElementById('range');
ctx.lineWidth = width.value;

ctx.lineCap = 'round';

let color = document.getElementById('colorChoice');	
ctx.strokeStyle = color.value;

	
ctx.moveTo(coord.x, coord.y);

getPosition(event);

ctx.lineTo(coord.x , coord.y);
	
ctx.stroke();
}