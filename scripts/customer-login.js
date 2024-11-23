document
  .getElementById("customerLoginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      // Send a POST request to the server
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();

        alert("Customer Logged in successfully");
        localStorage.setItem("isSigned", "true");
        localStorage.setItem("FirstName", responseData.FirstName);
        localStorage.setItem("LastName", responseData.LastName);
        localStorage.setItem("Email", responseData.Email);
        localStorage.setItem("ID", responseData.Id);
        window.location.href = "index.html"; // Redirect to home page
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  });
