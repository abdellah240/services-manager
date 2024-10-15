// Declare Array of services
const servicesArray = [];

// Wait for click, then execute anonymous function
document.getElementById("confirm-service-button").addEventListener("click", () =>
{
    // Clear previous list
    document.getElementById("services-list-div").innerHTML = "";

    // Create new service object 
    const newService = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value
    };

    servicesArray.push(newService);

    // For each service, execute anonymous function
    servicesArray.forEach((service, index) =>
    {
        // Formatting every service
        var serviceDiv = document.createElement("div");
        var deleteServiceButton = document.createElement("button")
        deleteServiceButton.innerHTML = 'Delete';

        serviceDiv.className = "service";
        deleteServiceButton.className = "delete-service"

        // Deletes service when clicked
        deleteServiceButton.addEventListener('click', () =>
        {
            servicesArray.splice(index, 1);
            document.getElementById("services-list-div").removeChild(serviceDiv);
        })

        serviceDiv.innerHTML =`Title: ${newService.title} <br>
                                Description: ${newService.description} <br>
                                Price: ${newService.price}`;
                                

        // Adding delete button to every service
        serviceDiv.appendChild(deleteServiceButton);

        // Adding every service to the updated list
        document.getElementById("services-list-div").appendChild(serviceDiv);
    })
    // Clear textboxes
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
})

