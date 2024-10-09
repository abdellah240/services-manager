// Declare array of services
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
    servicesArray.forEach(() =>
    {
        // Formatting every service
        var serviceDiv = document.createElement("div");
        serviceDiv.className = "service";
        serviceDiv.innerHTML = `Title: ${newService.title} <br>
                                Description: ${newService.description} <br>
                                Price ${newService.price}`;

        // Adding every service to the updated list
        document.getElementById("services-list-div").appendChild(serviceDiv);
    })
    // Clear textboxes
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
})

