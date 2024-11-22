// Declare Array of services
const servicesArray = [];
// Keep track of state (edit or add)
let isEditing = false;
let serviceBeingEditedID = null;

displayServices();

// Confirm button: On click, create/edit service object
document.getElementById("confirm-service-button").addEventListener("click", async (event) =>
{
  event.preventDefault();

  const newService = {
    id: serviceBeingEditedID,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: Number(document.getElementById("price").value),
  };
  if (!isEditing)
  {
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
      console.log("Error occured while adding a service.");
  } else
  {
    const response = await fetch(`/api/services/${serviceBeingEditedID}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newService),
    });

    if (response.ok)
    {
      displayServices();
    } else
    {
      console.log("Error occurred while editing a service.");
    }

    isEditing = false;
    serviceBeingEditedID = null;
  }
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
    deleteServiceButton.addEventListener("click", () => deleteService(service));
    editServiceButton.addEventListener("click", () => setupEditService(service));

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

async function deleteService(service)
{
  const deletedServiceID = service.id;

  const response = await fetch(`/api/services/${deletedServiceID}`, { method: "DELETE" });
  if (response.ok)
    displayServices();
  else
    console.log("Error occured when deleting service.");
}

async function setupEditService(service)
{
  // Fill textboxes with service information
  document.getElementById("title").value = service.title;
  document.getElementById("description").value = service.description;
  document.getElementById("price").value = service.price;

  // Change state to editing, keep track of ID
  serviceBeingEditedID = service.id;
  isEditing = true;
}
