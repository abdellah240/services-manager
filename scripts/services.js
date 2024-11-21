const cart = [];

async function loadServices()
{
  try
  {
    const response = await fetch('../api/services', {method:"GET"});
    const servicesArray = await response.json();

    displayServices(servicesArray); // servicesArray: Defined in manage-services.js

  } catch (error)
  {
    console.log("error");
  }
}

function displayServices(servicesArray)
{
  const servicesListDiv = document.getElementById("services-list-div");

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
  let serviceInCart = false;

  // Increment service quantity if already in cart
  for (let i = 0; i < cart.length; i++)
  {
    if (cart[i].id === service.id)
    {
      cart[i].quantity += 1;
      serviceInCart = true;
      break;
    }
  }

  // Add service if not in cart
  if (serviceInCart === false)
  {
    cart.push({
      id: service.id,
      title: service.title,
      price: service.price,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Added to cart."); // Temporary, need better styling
}

loadServices();