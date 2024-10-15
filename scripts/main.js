var isSigned = true;
let ID = "client1";
let Password = "soen287";
function signing(){
var inputId = document.getElementById("Email-customer").value;
var inputPass = document.getElementById("Password-customer").value;

  if(inputId == ID && inputPass == Password){
    isSigned = true;
    window.location.href = "home.html";
}
  else {
    isSigned =false;
    alert("Incorrect");
    window.location.href = "login-customer.html";
    }
     
}
function checksign1(){
    if(isSigned){
        window.location.href = "services.html";}
    else {
    window.location.href = "index.html";}
    window.onload(checksign1);

}

function checksign2(){
    if(isSigned)
        window.location.href = "bills.html";
    else 
    window.location.href = "index.html";
window.onload(checksign2);
}