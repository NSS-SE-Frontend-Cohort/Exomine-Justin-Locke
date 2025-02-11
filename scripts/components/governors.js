import { getTransientState, setGovernorId } from "../stateChanges/transientState.js";

document.addEventListener("change", (event) => {
    if (event.target.name === "governors") {
        setGovernorId(parseInt(event.target.value));
        console.log("Governor State Changed: ", getTransientState())
    }
    
})

// Method to get all governors
export const getAllGovernors = async () => {

    const response = await fetch("http://localhost:8088/governors");
    const governors = await response.json();

    return governors;
}

// Method to get specific governors from colonies
export const getGovernorsForColony = async (colonyId) => {

    const response = await fetch(`http://localhost:8088/governors?colonyId=${colonyId}`);
    const governors = await response.json();

    return governors;
}

export const createGovernorsHTML = (governors) => {
    return `
        <h2>Governors</h2>
            <select name="governors">
            <option value="" disabled selected hidden>Governor Selection</option>
        ${governors.map(governor => 
            `<option value="${governor.id}" ${governor.isActive ? "" : "disabled"}>${governor.name}</option>`).join("")}
            </select>
    `
}