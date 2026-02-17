function checkPassword(){

let pass="1234"

let input=document.getElementById("pass").value

if(input===pass)

location="home.html"

else

document.getElementById("error").innerText="Wrong"

}

function playMusic(){

document.getElementById("music").play()

}