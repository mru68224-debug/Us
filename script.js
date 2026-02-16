function checkPassword(){

let pass=document.getElementById("password").value;


if(pass==="birthdaygirl")

window.location="home.html";

else

document.getElementById("error").innerText="Try harder baby";

}