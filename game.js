let heart=document.getElementById("heart")

let score=0

heart.onclick=function(){

score++

document.getElementById("score").innerText=score

move()

if(score==10){

document.getElementById("win").classList.remove("hidden")

}

}

function move(){

heart.style.top=Math.random()*500+"px"

heart.style.left=Math.random()*300+"px"

}

move()