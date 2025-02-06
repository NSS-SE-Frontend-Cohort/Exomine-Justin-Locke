import { getAllColonies } from "./components/colonies.js";
import { getAllGovernors } from "./components/governors.js";

const exomineContainer = document.querySelector("#exomineContainer");

const renderAllHTML = async () => {
    
    const allColonies = await getAllColonies();
    const allGovernors = await getAllGovernors();
    
    exomineContainer.innerHTML = allColonies;
}

renderAllHTML();