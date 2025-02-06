import { deploySalesFloor } from "./saleFloor.js";

const exomineContainer = document.querySelector("#exomineContainer");

const renderAllHTML = async () => {
    
    exomineContainer.innerHTML = await deploySalesFloor();
}

renderAllHTML();