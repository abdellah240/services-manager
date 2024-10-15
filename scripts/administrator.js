var ID = "paul@hoomail.com";
var pass = "soen287";


function checker(){
  var inputId = document.getElementById("Email-administrator").value;
  var inputPass = document.getElementById("Password-administrator").value;

  if(inputId == ID && inputPass == pass)
    alert("Correct!!");
  else {
     alert("Incorrect");}

}

  