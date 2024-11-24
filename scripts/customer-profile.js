async function updateProfile()
{
  const email = localStorage.getItem("Email");
  if (!email) return console.error("Email not found.");
  try
  {
    const response = await fetch("/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) return console.error("Error: ", await response.text());
    else
    {
      const [userInfo] = await response.json();
      document.querySelector(".profile__title").textContent = userInfo.firstName + " " + userInfo.lastName;
      document.querySelector(".profile__email").textContent = userInfo.email;
      localStorage.setItem("Email", userInfo.email);
    }
  } catch (error)
  {
    console.error("Error: ", error);
  }
}

document.addEventListener("DOMContentLoaded", updateProfile);
