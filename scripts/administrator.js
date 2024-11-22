let ID = "paul@hoomail.com";
let pass = "soen287";


function checker(event)
{
  event.preventDefault();
  var inputId = document.getElementById("Email-administrator").value;
  var inputPass = document.getElementById("Password-administrator").value;

  if (inputId == ID && inputPass == pass)
  {
    localStorage.setItem("isSigned1", "true");
    window.location.href = "../admin/business.html";
  }
  else
  {
    isSigned1 = false;
    alert("Incorrect");
    window.location.href = "../admin/login.html";
  }
}


function logout()
{
  var confirmation = confirm("Are you sure you want to log out?");

  // Check if the user clicked "OK"
  if (confirmation)
  {
    // If confirmed, log the user out (clear sign-in status)
    localStorage.setItem("isSigned1", "false");
    window.location.href = "../pages/login.html"; // Redirect to login page
  } else
  {
    // If canceled, do nothing (stay on the current page)
    console.log("User canceled logout.");
  }
}

function logoclicked()
{
  document.getElementById("showButton")
  const content = document.getElementById("hiddenContent");
  const content2 = document.getElementById("hidden");
  const content3 = document.getElementById("hidden2");
  if (content.style.display === "none")
  {
    content.style.display = "block"; // Show the content
    content2.style.display = "none";
    content3.style.display = "none";
  } else
  {
    content2.style.display = "none";
    content3.style.display = "none";
    content.style.display = "none"; // Hide the content if clicked again
  }

}
function Appclicked()
{
  document.getElementById("showButton1")
  const content = document.getElementById("hidden");
  const content2 = document.getElementById("hiddenContent");
  const content3 = document.getElementById("hidden2");
  if (content.style.display === "none")
  {
    content.style.display = "block"; // Show the content
    content2.style.display = "none";
    content3.style.display = "none";
  } else
  {
    content2.style.display = "none";
    content3.style.display = "none";
    content.style.display = "none"; // Hide the content if clicked again
  }

}
function Homeclicked()
{

  const content = document.getElementById("hidden2");
  const content2 = document.getElementById("hiddenContent");
  const content3 = document.getElementById("hidden");
  if (content.style.display === "none")
  {
    content.style.display = "block"; // Show the content
    content2.style.display = "none";
    content3.style.display = "none";

  } else
  {
    content2.style.display = "none";
    content3.style.display = "none";
    content.style.display = "none"; // Hide the content if clicked again
  }

}

async function save(event){
  document.getElementById('Info-form')
    event.preventDefault(); // Prevent default form submission behavior

    // Collect input values
    const textInput = document.getElementById('title').value;
    const textareaInput = document.getElementById('description').value;

    // Send data to the server
    const response = await fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textInput, textareaInput }),
    });

    if (response.ok) {
        alert('Data saved successfully!');
    } else {
        alert('Failed to save data.');
    }

}

function confirm1()
{
    const content = document.getElementById("hide");
    if (content.style.display === "none")
    {
      content.style.display = "block"; // Show the content


    } else
    {

      content.style.display = "none"; // Hide the content if clicked again
    }
}
async function loadServices()
{

  try{
  
  const response = await fetch('../data/services-to-confirm.json');
  const servicesArray = await response.json();

  displayServices(servicesArray); // servicesArray: Defined in manage-services.js
}
   catch (error){
    alert("Error loading services. Please try again.");
  }

}

function displayServices(servicesArray)
{
  const servicesListDiv = document.getElementById("services-list-div");

  servicesArray.forEach((service, index) =>
  {
    const serviceDiv = document.createElement("div");
    const buttonContainerDiv = document.createElement("div");
    const confirm = document.createElement("button");

    serviceDiv.innerHTML = `Title: ${service.title} <br>
                                                    client: ${service.client} <br>
                                                    left to pay: ${service.lefttopay}`;

    confirm.innerHTML = "confirm service";

    serviceDiv.className = "services__service";
    buttonContainerDiv.className = "services__button-container";
    confirm.className = "button";
    confirm.addEventListener("click", () => confirmed(confirm, service));

    buttonContainerDiv.appendChild(confirm);
    serviceDiv.appendChild(buttonContainerDiv);
    servicesListDiv.appendChild(serviceDiv);

    servicesListDiv.appendChild(serviceDiv);
  });

}
function confirmed(button, service)
{
  if (button.textContent == "confirm service")
  {
    button.textContent = "cancel X";

  }
  else
  {

    button.textContent = "confirm service";
  }
}

function color(){
  const colorSelect = document.getElementById('colorSelect');
  const selectedColor = colorSelect.value;
    fetch('/update-css', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color: selectedColor }),
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
          
        } else {
          alert('Error updating CSS files.');
        }
      })
      .catch(() => alert('Server error.'));
  
}
