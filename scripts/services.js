// Declare Array of services
const servicesArray = [];

displayServices();

// Wait for click, then execute anonymous function
document.getElementById("confirm-service-button").addEventListener("click", () =>
{
    // Create new service object 
    const newService = (
        {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value
        }
    )
    servicesArray.push(newService)
    displayServices();
});

function displayServices()
{

    const servicesListDiv = document.getElementById("services-list-div");
    servicesListDiv.innerHTML = ""

    servicesArray.forEach((service, index) =>
    {
        // Set format and buttons for each service

        const serviceDiv = document.createElement("div");
        const deleteServiceButton = document.createElement("button");

        deleteServiceButton.innerHTML = 'Delete';
        serviceDiv.className = "service";
        deleteServiceButton.className = "delete-service";

        // When clicked, delete service 
        deleteServiceButton.addEventListener("click", () => deleteService(index));

        serviceDiv.innerHTML = `Title: ${service.title} <br>
                                Description: ${service.description} <br>
                                Price: ${service.price}`;
        serviceDiv.appendChild(deleteServiceButton);

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
