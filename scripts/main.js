
let ID = "client1";
let Password = "soen287";

function signing(){
var inputId = document.getElementById("Email-customer").value;
var inputPass = document.getElementById("Password-customer").value;

  if(inputId == ID && inputPass == Password){
    localStorage.setItem("isSigned", "true");
    window.location.href = "home.html";
}
  else {
    isSigned =false;
    alert("Incorrect");
    window.location.href = "login-customer.html";
    }
     
}
function checksign1(){
    var isSigned = localStorage.getItem("isSigned") === "true"    
    if(isSigned){
        window.location.href = "services.html";}
    else {
        alert("Sign in first");
    window.location.href = "index.html";}

}

function checksign2(){
    var isSigned = localStorage.getItem("isSigned") === "true"   
    if(isSigned){
        window.location.href = "cart_purchase-pages.html";}
    else {
    alert("Sign in first");
    window.location.href = "index.html";}
}

function updateAuthLink() {
    var isSigned = localStorage.getItem("isSigned");
    var authLink = document.getElementById("authLink");
    var linkElement = authLink.getElementsByTagName('a')[0]; 

    if (isSigned === "true") {
        linkElement.textContent = "Your Account";
        linkElement.href = "customer-mainpage.html"; 
    } else {
        linkElement.textContent = "Sign In";
        linkElement.href = "index.html";
    }
}

function logout() {
    var confirmation = confirm("Are you sure you want to log out?");
    
    // Check if the user clicked "OK"
    if (confirmation) {
        // If confirmed, log the user out (clear sign-in status)
        localStorage.setItem("isSigned", "false");
        window.location.href = "home.html"; // Redirect to login page
    } else {
        // If canceled, do nothing (stay on the current page)
        console.log("User canceled logout.");
    }
}


window.onload = function() {
    updateAuthLink();
}

function validateForm() {
    const password = document.getElementById("Password-customer").value;
    const confirmPassword = document.getElementById("ConfirmPassword-customer").value;
    
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return false; 
    }
    localStorage.setItem("isSigned", "true");
    window.location.href = "home.html";
    return true; 
  }