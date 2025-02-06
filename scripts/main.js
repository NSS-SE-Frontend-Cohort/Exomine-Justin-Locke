import { getAllGovernors } from "./components/governors.js";

const exomineContainer = document.querySelector("#exomineContainer");

const renderAllHTML = async () => {

    exomineContainer.innerHTML = await getAllGovernors();
}

renderAllHTML();