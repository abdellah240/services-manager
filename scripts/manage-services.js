// Declare Array of services
const servicesArray = [];

let isEditing = false; // Current State
let indexOfEdit = null; // Current Edit


// Confirm button: On click, create/edit service object
document.getElementById("confirm-service-button").addEventListener("click", async (event) =>
{
  event.preventDefault();

  const newService = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: Number(document.getElementById("price").value),
  };

  const response = await fetch("/api/services",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newService)
    }
  );

  if (response.ok)
    displayServices();
  else
    console.log("Error");
});

// Display services (refresh service list)
async function displayServices()
{
  servicesArray.length = 0;

  const response = await fetch("/api/services", { method: "GET" });
  const services = await response.json();

  servicesArray.push(...services);

  const servicesListDiv = document.getElementById("services-list-div");
  servicesListDiv.innerHTML = "";

  servicesArray.forEach((service, index) =>
  {
    const serviceDiv = document.createElement("div");
    const buttonContainerDiv = document.createElement("div");

    // Set text and buttons for each service
    const deleteServiceButton = document.createElement("button");
    const editServiceButton = document.createElement("button");

    serviceDiv.innerHTML = `Title: ${service.title} <br>
                            Description: ${service.description} <br>
                            Price: ${service.price}`;

    deleteServiceButton.innerHTML = "Delete";
    editServiceButton.innerHTML = "Edit";

    // Set classnames
    serviceDiv.className = "services__service";
    deleteServiceButton.className = "button";
    editServiceButton.className = "button";
    buttonContainerDiv.className = "services__button-container";

    // When clicked, delete or edit service
    deleteServiceButton.addEventListener("click", () => deleteService(index));
    editServiceButton.addEventListener("click", () => editService(index));

    serviceDiv.appendChild(buttonContainerDiv);
    buttonContainerDiv.appendChild(deleteServiceButton);
    buttonContainerDiv.appendChild(editServiceButton);
    // Add each service to the service list
    servicesListDiv.appendChild(serviceDiv);
  });

  // Clear textboxes
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
}

async function deleteService(index)
{
  const response = await fetch("/api/services", { method: "DELETE" });
  if (response.ok)
    displayServices();
  else
    console.log("Error.");
}

async function editService(index)
{
  const response = await fetch("/api/services", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify(servicesArray[index]) // **IMPORTANT** use id not index
    }
  });

  if (response.ok)
    displayServices();
  else
    console.log("Error.");

  // Fill textboxes with service information
  document.getElementById("title").value = servicesArray[index].title;
  document.getElementById("description").value =
    servicesArray[index].description;
  document.getElementById("price").value = servicesArray[index].price;
}
