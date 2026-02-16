function checkPassword(){

let pass = document.getElementById("password").value;

if(pass === "birthdaygirl")

window.location.href="home.html";

else

document.getElementById("error").innerText="Wrong password";

}