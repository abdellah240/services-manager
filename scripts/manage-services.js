// Declare Array of services
const servicesArray = [];

let isEditing = false; // Current State
let indexOfEdit = null; // Current Edit


// Confirm button: On click, create or edit service object
document.getElementById("confirm-service-button").addEventListener("click", (event) =>
{
  event.preventDefault();
  
  const newService = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
  };

  if (isEditing === false) servicesArray.push(newService);

  if (isEditing === true)
  {
    servicesArray[indexOfEdit] = newService;

    // Reset state and index after editing
    isEditing = false;
    indexOfEdit = null;
  }

  displayServices();
});

// Display services (refresh service list)
function displayServices()
{
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

function deleteService(index)
{
  servicesArray.splice(index, 1);
  displayServices();
}

function editService(index)
{
  // Set state and store index
  isEditing = true;
  indexOfEdit = index;

  // Fill textboxes with service information
  document.getElementById("title").value = servicesArray[index].title;
  document.getElementById("description").value =
    servicesArray[index].description;
  document.getElementById("price").value = servicesArray[index].price;
}
