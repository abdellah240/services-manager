let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isFetchingServices = false;
loadServices();
async function searchServices(query)
{
  try
  {
    const response = await fetch(
      `../api/services?name=${encodeURIComponent(query)}`
    );
    if (!response.ok)
    {
      throw new Error("Failed to fetch services");
    }
    const servicesArray = await response.json();
    displayServices(servicesArray);
  } catch (error)
  {
    console.error(error);
  }
}

async function loadServices()
{
  try
  {
    const response = await fetch("../api/services", { method: "GET" });
    const servicesArray = await response.json();
    displayServices(servicesArray);
  } catch (error)
  {
    console.log("error");
  }
}

function displayServices(servicesArray)
{
  const servicesListDiv = document.getElementById("services-list-div");
  servicesListDiv.innerHTML = "";
  if (servicesArray.length === 0)
  {
    servicesListDiv.innerHTML = "No Services are available";
  }
  servicesArray.forEach((service, index) =>
  {
    const serviceDiv = document.createElement("div");
    const buttonContainerDiv = document.createElement("div");
    const addToCartButton = document.createElement("button");

    // Set text and buttons for each service
    serviceDiv.innerHTML = `Title: ${service.title} <br>
                            Description: ${service.description} <br>
                            Price: ${service.price}`;

    addToCartButton.innerHTML = "Add to Cart";

    // Set classnames
    serviceDiv.className = "services__service";
    buttonContainerDiv.className = "services__button-container";
    addToCartButton.className = "button";

    // When clicked, add to cart
    addToCartButton.addEventListener("click", () => addToCart(service));

    buttonContainerDiv.appendChild(addToCartButton);
    serviceDiv.appendChild(buttonContainerDiv);

    // Add each service to the service list
    servicesListDiv.appendChild(serviceDiv);
  });
}

function addToCart(service)
{
  const existingService = cart.find((cartService) => cartService.id === service.id);

  if (existingService)
  {
    alert("Already in cart.");
  } else
  {
    cart.push({
      id: service.id,
      title: service.title,
      price: service.price,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart.");
  }
}