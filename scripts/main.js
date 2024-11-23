function checksign1() {
  var isSigned = localStorage.getItem("isSigned") === "true";
  var isSigned1 = localStorage.getItem("isSigned1") === "true";
  if (isSigned) {
    window.location.href = "../customer/services.html";
  } else if (isSigned1) {
    window.location.href = "../admin/services.html";
  } else {
    alert("Sign in first");
    window.location.href = "../pages/login.html";
  }
}

function checksign2() {
  var isSigned = localStorage.getItem("isSigned") === "true";
  var isSigned1 = localStorage.getItem("isSigned1") === "true";
  if (isSigned) {
    window.location.href = "../customer/cart.html";
  } else if (isSigned1) {
    linkElement.textContent = "";
    window.location.href = "#";
  } else {
    alert("Sign in first");
    window.location.href = "../pages/login.html";
  }
}

function updateAuthLink() {
  // Retrieve sign-in states
  var isSigned = localStorage.getItem("isSigned");
  var isSigned1 = localStorage.getItem("isSigned1");

  // Get DOM elements (check existence to avoid errors)
  var authLink = document.getElementById("authLink");
  var linkElement = authLink ? authLink.getElementsByTagName('a')[0] : null;
  var authLink1 = document.getElementById("authLink1");
  var linkElement1 = authLink1 ? authLink1.getElementsByTagName('a')[0] : null;
  var authLink2 = document.getElementById("authLink2");
  var linkElement2 = authLink2 ? authLink2.getElementsByTagName('a')[0] : null;

  // Update links based on sign-in state
  if (linkElement) {
      if (isSigned === "true") {
          linkElement.textContent = "Your Account";
          linkElement.href = "../customer/index.html";
      } else if (isSigned1 === "true") {
          linkElement.textContent = "Go Back to Administrator side";
          linkElement.href = "../admin/business.html";
          // Hide other links if they exist
          if (authLink1) authLink1.style.display = "none";
          if (authLink2) authLink2.style.display = "none";
      } else {
          linkElement.textContent = "Sign In";
          linkElement.href = "../pages/login.html";
          // Restore other links if they exist
          if (authLink1) {
              authLink1.style.display = "block";
              if (linkElement1) {
                  linkElement1.textContent = "Services";
                  linkElement1.href = "../customer/services.html";
              }
          }
          if (authLink2) {
              authLink2.style.display = "block";
              if (linkElement2) {
                  linkElement2.textContent = "Cart";
                  linkElement2.href = "../customer/cart.html";
              }
          }
      }
  }
}

function logout() {
  var confirmation = confirm("Are you sure you want to log out?");

  // Check if the user clicked "OK"
  if (confirmation) {
    // If confirmed, log the user out (clear sign-in status)
    localStorage.setItem("isSigned", "false");
    window.location.href = "../pages/index.html"; // Redirect to login page
  } else {
    // If canceled, do nothing (stay on the current page)
    console.log("User canceled logout.");
  }
}

async function loadData() {
  updateAuthLink();
  try {
    console.log("Fetching data...");
    const response = await fetch("/load");
    console.log("Response received:", response);

    if (!response.ok) throw new Error("Failed to load data");
    const data = await response.json();

    console.log("Data loaded:", data);

    document.getElementById("business-title").textContent = data.title;
    document.getElementById("business-title1").textContent = data.title;
    document.getElementById("business-description").textContent =
      data.description;
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

window.onload = function () {
  loadData();
};

function validateForm() {
  const password = document.getElementById("Password-customer").value;
  const confirmPassword = document.getElementById(
    "ConfirmPassword-customer"
  ).value;

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return false;
  }
  localStorage.setItem("isSigned", "true");
  window.location.href = "../pages/index.html";
  return true;
}

function sendMessage(){
    const adminMessage = document.getElementById("adminMessage").value.trim();
    if (!adminMessage) {
        alert("Please fill in your message.");
        return;
      }

      const message = {
        Name : localStorage.getItem("FirstName") + " " + localStorage.getItem("LastName"),
        ID : localStorage.getItem("ID"),
        message: adminMessage,
        timestamp: new Date().toISOString(), // Optional: Add a timestamp
      };


      fetch("/api/append-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Message sent successfully!");
        } else {
          alert("Failed to send the message.");
        }
      })
      .catch(error => {
        console.error("Error sending message:", error);
        alert("An error occurred. Please try again later.");
      });
      document.getElementById("adminMessage").value = "";
}