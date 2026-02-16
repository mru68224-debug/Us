let heart = document.getElementById("heart");

let score = 0;

heart.onclick=function(){

score++;

document.getElementById("score").innerText=score;

heart.style.top=Math.random()*300+"px";

heart.style.left=Math.random()*300+"px";


if(score==10)

window.location.href="secret.html";

}