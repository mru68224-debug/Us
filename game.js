let score=0;

let area=document.getElementById("gameArea");

function spawn(){

let heart=document.createElement("div");

heart.className="heart";

heart.style.left=Math.random()*260+"px";

heart.style.top=Math.random()*360+"px";

heart.onclick=function(){

score++;

document.getElementById("score").innerText="Score:"+score;

heart.remove();

if(score==10)

location="secret.html";

}

area.appendChild(heart);

setTimeout(()=>heart.remove(),1000);

}

setInterval(spawn,800);