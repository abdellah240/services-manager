

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

async function credentials(event){
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
        body: JSON.stringify({ currentPass, newEmail,newPass }),
    });

    if (response.ok) {
        alert('Data saved successfully!');
    } else {
        alert('Failed to save data.');
    }

}

function messages()
{
    const content = document.getElementById("hide2");
    const content1 = document.getElementById("hide");

    if (content.style.display === "none")
    {
      content.style.display = "block"; // Show the content
      content1.style.display = "none";


    } else
    {

      content.style.display = "none"; // Hide the content if clicked again
      content1.style.display = "none";
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

async function loadMessages() {
  try {
    const response = await fetch("/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { messages } = await response.json();
    displayMessages(messages); // Ensure this function is defined and working
  } catch (error) {
    console.error("Error loading messages:", error);
    alert("Error loading messages. Please try again.");
  }
}


function displayMessages(MessagesArray) {
  const MessagesList = document.getElementById("Messages-list-div");
  MessagesList.innerHTML = "";

  if(MessagesArray.length === 0){
    const emptyMessage = document.createElement("h1");
    emptyMessage.textContent = "No more Messages";
    emptyMessage.className = "empty-message";
    MessagesList.appendChild(emptyMessage);  // Append the message to the container
    return;
  }
  // Clear previous messages if any
  

  MessagesArray.forEach((Messages, index) => {
    const messageDiv = document.createElement("div"); // Message container
    const buttonContainerDiv = document.createElement("div"); // Button container
    const Answer = document.createElement("textarea"); // Response textarea
    const respondButton = document.createElement("button"); // Respond button

    // Set content
    messageDiv.innerHTML = `
      <p>Name: ${Messages.Name}</p>
      <p>Client: ${Messages.ID}</p>
      <p>Message: ${Messages.message}</p>
    `;

    // Set attributes and classes
    messageDiv.className = "services__service";
    buttonContainerDiv.className = "services__button-container";
    respondButton.className = "button";
    Answer.className = "textarea";
    respondButton.innerHTML = "Respond";

    // Add event listener to the button
    respondButton.addEventListener("click", () => send(respondButton, Messages, Answer));

    // Append elements
    buttonContainerDiv.appendChild(Answer);
    buttonContainerDiv.appendChild(respondButton);
    messageDiv.appendChild(buttonContainerDiv);
    MessagesList.appendChild(messageDiv);
  });
}


function send(respondButton, Messages, Answer) {
  const confirmation = confirm("Are you sure you want to send this answer?");
  
  if (confirmation) {
    const adminMessage = Answer.value.trim(); // Get the message from the textarea
    
    if (!adminMessage) {
      alert("Please enter a response.");
      return;
    }

    const AnswerData = {
      Name: Messages.Name,
      ID: Messages.ID,
      message: adminMessage, // Use the message from the textarea
      timestamp: new Date().toISOString(), // Optional: Add a timestamp
    };

    // Send the answer to the server
    fetch("/api/append-message1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AnswerData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // If the message is successfully sent, remove the message from the DOM
        alert("Message sent successfully!");

        // Now delete the message from ClientQ.json
        fetch("/delete-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Messages), // Send the message ID to delete
        })
        .then(deleteResponse => deleteResponse.json())
        .then(deleteData => {
          if (deleteData.success) {
            // Remove the message element from the list
            const messageDiv = respondButton.closest('.services__service');
            messageDiv.remove(); // Remove the message div from the DOM
            messageDiv.style.display = none;

          } else {
            alert("Failed to delete the message.");
          }
        })
        .catch(error => {
          console.error("Error deleting message:", error);
        });

      } else {
        alert("Failed to send the message.");
      }
    })
    .catch(error => {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again later.");
    });

  } else {
    return; // Do nothing if the user cancels
  }
}


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
  const content1 = document.getElementById("hide2")
  if (content.style.display === "none")
  {
    content.style.display = "block"; // Show the content
    content1.style.display = "none";


  } else
  {

    content.style.display = "none"; // Hide the content if clicked again
    content1.style.display = "none";
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

document.querySelectorAll('.menu-link').forEach((button, index) => {

  button.addEventListener('click', () => {

      const popups = document.querySelectorAll('.popup');
      popups.forEach((popup) => popup.classList.remove('active')); 
      popups[index].classList.add('active'); 
      
  });
});

