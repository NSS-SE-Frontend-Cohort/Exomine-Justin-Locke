import { getTransientState, setGovernorId } from "../stateChanges/transientState.js";

document.addEventListener("change", (event) => {
    if (event.target.name === "governors") {
        setGovernorId(parseInt(event.target.value));
        console.log("Governor State Changed: ", getTransientState())
    }
    
})

export const getAllGovernors = async () => {

    const response = await fetch("http://localhost:8088/governors");
    const governors = await response.json();

    return `
        <h2>Governors</h2>
            <select name="governors">
            <option value="" disabled selected hidden>Governor Selection</option>
        ${governors.map(governor => `<option value="${governor.id}">${governor.name}</option>`).join("")}
            </select>
    `
}

export const getGovernorsForColony = async (colonyId) => {

    const response = await fetch(`http://localhost:8088/governors?colonyId=${colonyId}`);
    const governors = await response.json();

    return `
        <h2>Governors</h2>
            <select name="governors">
            <option value="" disabled selected hidden>Governor Selection</option>
        ${governors.map(governor => `<option value="${governor.id}">${governor.name}</option>`).join("")}
            </select>
    `
}