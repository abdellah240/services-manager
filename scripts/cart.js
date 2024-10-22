let listServicesHTML = document.querySelector('.listServices');

let listServices = [];

const addDataToHTML= () => {
    listServicesHTML.innerHTML= '';
    if(listServices.length > 0){
        listServices.forEach( service => {
            let newService = document.createElement('div');
            newProduct.classList.add('services-item');
            newService.innerHTML =` <div class="service-name">SERVICE NAME
          </div><div class="service-totalPrice">$200</div>
          `;

          listProductHTML.appendChild(newService);
        })
    }

}

const initApp = () => {
    fetch('services.json')
    .then (response => response.json())
    .then(data => {
        listServices = data;
        addDataToHtml();
    })

}

initApp();