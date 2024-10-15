let isSigned = false;
function checksign1(){
    if(isSigned){
        window.location.href = "services.html";}
    else {
    window.location.href = "index.html";}
window.onload = checksign1;
}

function checksign2(){
    if(isSigned)
        window.location.href = "bills.html";
    else 
    window.location.href = "index.html";
    window.onload = checksign2;
}