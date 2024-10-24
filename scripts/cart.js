let listServicesHTML = document.querySelector('.listcart');

let listServices = [];

const addDataToHTML = () =>
{
    listServicesHTML.innerHTML = '';
    if (listServices.length > 0)
    {
        listServices.forEach(service =>
        {
            displayCartItem(service);
        });
    }
}

function displayCartItem(service)
{
    // Create structure
    const cartItemDiv = document.createElement("div");
    const serviceNameDiv = document.createElement("div");
    const servicePriceDiv = document.createElement("div");
    const serviceQuantityDiv = document.createElement("div");
    const minusButton = document.createElement("span");
    const quantityDisplay = document.createElement("span");
    const plusButton = document.createElement("span");

    // Set classnames
    cartItemDiv.className = "service-item";
    serviceNameDiv.className = "service-name";
    servicePriceDiv.className = "service-totalPrice";
    serviceQuantityDiv.className = "service-quantity";
    minusButton.className = "minus";
    plusButton.className = "plus";

    // Add text, buttons (button logic to be added)
    serviceNameDiv.innerHTML = service.title;
    servicePriceDiv.innerHTML = `$${service.price}`;
    quantityDisplay.innerHTML = `${service.quantity}`;
    minusButton.innerHTML = "<";
    plusButton.innerHTML = ">";

    serviceQuantityDiv.appendChild(minusButton);
    serviceQuantityDiv.appendChild(quantityDisplay);
    serviceQuantityDiv.appendChild(plusButton);

    cartItemDiv.appendChild(serviceNameDiv);
    cartItemDiv.appendChild(servicePriceDiv);
    cartItemDiv.appendChild(serviceQuantityDiv);

    // Add cart item to list
    listServicesHTML.appendChild(cartItemDiv);
}


const initApp = () =>
{
    /* 
    fetch('cart.json')
    .then (response => response.json()) 
     */

    data = JSON.parse(localStorage.getItem('cart'));
    Promise.resolve(data)
        // Previous 2 lines of code are emulating a response
        // (To be replaced with previous comment when back-end is up)

        .then(data =>
        {
            listServices = data;
            addDataToHTML();
        })
}

initApp();