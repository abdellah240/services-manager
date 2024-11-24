// Get the cart container
let listServicesHTML = document.querySelector('.listcart');
let totalAmount = document.getElementById('cart-total');
let listServices = []; 

// Render items in the cart
const addDataToHTML = () => {
    listServicesHTML.innerHTML = '';
    if (listServices.length > 0) {
        listServices.forEach((service, index) => {
            displayCartItem(service, index);
        });
        calculateTotal();
    } else {
        listServicesHTML.innerHTML = '<p>Your cart is empty.</p>';
    }
};

// Display a single cart item
function displayCartItem(service, index) {
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
    servicePriceDiv.className = "service-price";
    serviceQuantityDiv.className = "service-quantity";
    minusButton.className = "minus";
    plusButton.className = "plus";

    // Set content
    serviceNameDiv.textContent = service.title;
    servicePriceDiv.textContent = `$${service.price}`;
    quantityDisplay.textContent = service.quantity;
    minusButton.textContent = "−";
    plusButton.textContent = "+";

    // Add event listeners for quantity buttons
    minusButton.addEventListener("click", () => {
        if (service.quantity > 0) {
            service.quantity--;
            quantityDisplay.textContent = service.quantity;
            updateLocalStorage();
            calculateTotal();
        }
    });

    plusButton.addEventListener("click", () => {
        service.quantity++;
        quantityDisplay.textContent = service.quantity;
        updateLocalStorage();
        calculateTotal();
    });

    // Append elements to the cart item
    serviceQuantityDiv.appendChild(minusButton);
    serviceQuantityDiv.appendChild(quantityDisplay);
    serviceQuantityDiv.appendChild(plusButton);
    cartItemDiv.appendChild(serviceNameDiv);
    cartItemDiv.appendChild(servicePriceDiv);
    cartItemDiv.appendChild(serviceQuantityDiv);

    // Add cart item to the list
    listServicesHTML.appendChild(cartItemDiv);
}

// Calculate and display total
function calculateTotal() {
    const total = listServices.reduce((sum, service) => sum + service.price * service.quantity, 0);
    totalAmount.textContent = `Total: $${total.toFixed(2)}`;
}

// Save the updated cart data back to localStorage
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(listServices));
}

// Initialize the cart
const initApp = () => {
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    listServices = data;
    addDataToHTML();
};

initApp();
