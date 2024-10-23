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

function logoclicked(){
  document.getElementById("showButton").addEventListener("click", function() {
    const content = document.getElementById("hiddenContent");
    const content2 = document.getElementById("hidden");
    const content3 = document.getElementById("hidden2");
    if (content.style.display === "none") {
      content.style.display = "block"; // Show the content
      content2.style.display = "none";
      content3.style.display = "none";
    } else {
      content2.style.display = "none";
      content3.style.display = "none";
      content.style.display = "none"; // Hide the content if clicked again
    }
  });
}
function Appclicked(){
  document.getElementById("showButton1").addEventListener("click", function() {
    const content = document.getElementById("hidden");
    const content2 = document.getElementById("hiddenContent");
    const content3 = document.getElementById("hidden2");
    if (content.style.display === "none") {
      content.style.display = "block"; // Show the content
      content2.style.display = "none";
      content3.style.display = "none";
    } else {
      content2.style.display = "none";
      content3.style.display = "none";
      content.style.display = "none"; // Hide the content if clicked again
    }
  });
}
function Homeclicked(){
  document.getElementById("showButton2").addEventListener("click", function() {
    const content = document.getElementById("hidden2");
    const content2 = document.getElementById("hiddenContent");
    const content3 = document.getElementById("hidden");
    if (content.style.display === "none") {
      content.style.display = "block"; // Show the content
      content2.style.display = "none";
      content3.style.display = "none";

    } else {
      content2.style.display = "none";
      content3.style.display = "none";
      content.style.display = "none"; // Hide the content if clicked again
    }
  });
}

function saveChanges(){
  const logo = document.getElementById("logo");
  const saveButton = document.getElementById("saveButton");
  const input = document.getElementById("input");
  saveButton.addEventListener('click', function() {
    const selectedFile = input.files[0];

    if (selectedFile) {
      const reader = new FileReader();
        
        reader.onload = function(e) {
          logo.src = e.target.result; 
        };

        reader.readAsDataURL(selectedFile);
    } else {
      // No file is selected
      messageDiv.innerHTML = "Please select a file before saving changes.";
      messageDiv.style.color = "red";
    }
  });
    }

