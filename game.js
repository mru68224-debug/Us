let canvas=document.getElementById("gameCanvas");

let ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

let basket={

x:canvas.width/2,

y:canvas.height-100,

w:100,

h:20

};

let hearts=[];

let score=0;

let speed=3;

document.addEventListener("mousemove",e=>{

basket.x=e.clientX;

});

function spawn(){

hearts.push({

x:Math.random()*canvas.width,

y:0,

size:20

});

}

setInterval(spawn,1000);

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="pink";

ctx.fillRect(basket.x,basket.y,basket.w,basket.h);

hearts.forEach((h,i)=>{

h.y+=speed;

ctx.beginPath();

ctx.arc(h.x,h.y,h.size,0,Math.PI*2);

ctx.fill();

if(

h.y>basket.y &&

h.x>basket.x &&

h.x<basket.x+basket.w

){

hearts.splice(i,1);

score++;

document.getElementById("score").innerText="Score: "+score;

}

if(score>=10){

window.location="secret.html";

}

});

requestAnimationFrame(draw);

}

draw();