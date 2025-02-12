import { deploySalesFloor } from "./saleFloor.js";

const exomineContainer = document.querySelector("#exomineContainer");

const renderAllHTML = async () => {
    
    exomineContainer.innerHTML = await deploySalesFloor();
}

document.addEventListener("materialPurchased", event => {
    console.log("Material Purchased");
    renderAllHTML();
})

renderAllHTML();