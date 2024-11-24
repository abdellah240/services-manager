

async function checker(event)
{

  event.preventDefault();
  var username = document.getElementById("Email-administrator").value;
  var password = document.getElementById("Password-administrator").value;
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok)
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

  const content = document.getElementById("hiddenContent");
  const content2 = document.getElementById("hidden");
  const content3 = document.getElementById("hidden2");
  const content4 = document.getElementById("hidden3");
  if (content.style.display === "none")
  {
    content.style.display = "block"; // Show the content
    content2.style.display = "none";
    content3.style.display = "none";
    content4.style.display = "none";
  } else
  {
    content2.style.display = "none";
    content3.style.display = "none";
    content.style.display = "none"; // Hide the content if clicked again
    content4.style.display = "none";
  }

}
function Appclicked()
{

  const content = document.getElementById("hidden");
  const content2 = document.getElementById("hiddenContent");
  const content3 = document.getElementById("hidden2");
  const content4 = document.getElementById("hidden3");
  if (content.style.display === "none")
  {
    content.style.display = "block"; // Show the content
    content2.style.display = "none";
    content3.style.display = "none";
    content4.style.display = "none";
  } else
  {
    content2.style.display = "none";
    content3.style.display = "none";
    content.style.display = "none"; // Hide the content if clicked again
    content4.style.display = "none";
  }

}
function Homeclicked()
{

  const content = document.getElementById("hidden2");
  const content2 = document.getElementById("hiddenContent");
  const content3 = document.getElementById("hidden");
  const content4 = document.getElementById("hidden3");
  if (content.style.display === "none")
  {
    content.style.display = "block"; // Show the content
    content2.style.display = "none";
    content3.style.display = "none";
    content4.style.display = "none";

  } else
  {
    content2.style.display = "none";
    content3.style.display = "none";
    content.style.display = "none"; // Hide the content if clicked again
    content4.style.display = "none";
  }

}

function IDclicked()
{
  const content = document.getElementById("hidden3");
  const content2 = document.getElementById("hidden");
  const content3 = document.getElementById("hidden2");
  const content4 = document.getElementById("hiddenContent");
  if (content.style.display === "none")
  {
    content.style.display = "block"; // Show the content
    content2.style.display = "none";
    content3.style.display = "none";
    content4.style.display = "none";
  } else
  {
    content2.style.display = "none";
    content3.style.display = "none";
    content.style.display = "none"; // Hide the content if clicked again
    content4.style.display = "none";
  }

}

async function save(event)
{
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

  if (response.ok)
  {
    alert('Data saved successfully!');
  } else
  {
    alert('Failed to save data.');
  }

}

async function credentials(event)
{
  document.getElementById('change-form')
  event.preventDefault(); // Prevent default form submission behavior

  // Collect input values
  const currentPass = document.getElementById('current-password').value;
  const newEmail = document.getElementById('new-email').value;
  const newPass = document.getElementById("new-Password").value;

  // Send data to the server
  const response = await fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPass, newEmail, newPass }),
  });

  if (response.ok)
  {
    alert('Data saved successfully!');
  } else
  {
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
  try
  {
    const response = await fetch('/api/checkout', { method: 'GET' });
    const services = await response.json();
    displayServices(services); // Pass services object
  } catch (error)
  {
    alert("Error loading services.");
  }
}

function displayServices(services)
{
  const servicesListDiv = document.getElementById("services-list-div");
  servicesListDiv.innerHTML = ""; // Clear previous content

  Object.entries(services).forEach(([fullname, { services, total }]) =>
  {
    const serviceDiv = document.createElement("div");
    const confirmButton = document.createElement("button");

    serviceDiv.innerHTML = `Client: ${fullname} <br>
                            Total: $${total} <br>
                            Services: ${services.join(" - ")}`;

    confirmButton.innerHTML = "Confirm services order";
    confirmButton.className = "button";
    confirmButton.addEventListener("click", () => confirmed(confirmButton));

    serviceDiv.className = "services__service";
    serviceDiv.appendChild(confirmButton);
    servicesListDiv.appendChild(serviceDiv);
  });
}

function confirmed(button)
{
  if (button.textContent === "Confirm services order")
  {
    button.textContent = "Cancel order";
    alert("Order confirmed.");
  } else
  {
    button.textContent = "Confirm services order";
    alert("Order canceled.");
  }
}


function color()
{
  const colorSelect = document.getElementById('colorSelect');
  const selectedColor = colorSelect.value;
  fetch('/update-css', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ color: selectedColor }),
  })
    .then(response =>
    {
      if (response.ok)
      {
        window.location.reload();

      } else
      {
        alert('Error updating CSS files.');
      }
    })
    .catch(() => alert('Server error.'));

}
