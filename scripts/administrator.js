let ID = "paul@hoomail.com";
let pass = "soen287";


function checker(event){
  event.preventDefault();
  var inputId = document.getElementById("Email-administrator").value;
  var inputPass = document.getElementById("Password-administrator").value;
  
    if(inputId == ID && inputPass == pass){
      localStorage.setItem("isSigned1", "true");
      window.location.href = "Manage-Business.html";
  }
    else {
      isSigned1 =false;
      alert("Incorrect");
      window.location.href = "login-administrator.html";
      }
}


function logout() {
  var confirmation = confirm("Are you sure you want to log out?");
  
  // Check if the user clicked "OK"
  if (confirmation) {
      // If confirmed, log the user out (clear sign-in status)
      localStorage.setItem("isSigned1", "false");
      window.location.href = "index.html"; // Redirect to login page
  } else {
      // If canceled, do nothing (stay on the current page)
      console.log("User canceled logout.");
  }
}

  