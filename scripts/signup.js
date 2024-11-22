document.getElementById("signupForm").addEventListener("submit", async function (event) {
event.preventDefault(); // Prevent the default form submission

// Gather form data
const formData = new FormData(event.target);
const data = Object.fromEntries(formData);

// Validate password and confirm password
//if (data.Password !== data.ConfirmPassword) {
//  alert("Passwords do not match!");
   // return;
 //}

try {
    // Send a POST request to the server
    const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });

if (response.ok) {
    alert("Account created successfully!");
    window.location.href = "login.html"; // Redirect to login page
    } else {
    const errorData = await response.json();
    alert(`Error: ${errorData.error}`);
    }
} catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again later.");
}
});