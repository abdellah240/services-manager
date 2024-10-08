class Service{
    constructor(name,description,price){
        this.name=name;
        this.description=description;
        this.price=price;
    }

}
const servicesArray = [];
let callConstructor = () => {
    document.getElementById("services-list").innerHTML= "";

    addedService = new Service (document.getElementById("name").value, 
                                document.getElementById("description").value, 
                                document.getElementById("price").value);
    servicesArray.push(addedService);

    for(i=0; i<servicesArray.length; i++){
        var serviceDiv = document.createElement("div");
        serviceDiv.className = "service";

        serviceDiv.innerHTML = `Name: ${servicesArray[i].name} <br>
                                Description: ${servicesArray[i].description} <br>
                                Price ${servicesArray[i].price}`;

        document.getElementById("services-list").appendChild(serviceDiv);
    }
    document.getElementById("service-form").reset();
}

