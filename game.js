let heart=document.getElementById("heart");

heart.onclick=function(){

window.location="secret.html";

};

setInterval(()=>{

heart.style.top=Math.random()*80+"%";

heart.style.left=Math.random()*80+"%";

},700);
