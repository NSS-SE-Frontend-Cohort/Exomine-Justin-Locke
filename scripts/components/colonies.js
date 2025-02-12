import { getTransientState, setColonyId } from "../stateChanges/transientState.js";

document.addEventListener("change", (event) => {
    if (event.target.name === "colonies") {
        setColonyId(parseInt(event.target.value));
        console.log("Colony State Changed: ", getTransientState());
    };
});

export const getAllColonies = async () => {

    const response = await fetch("http://localhost:8088/colonies");
    const colonies = await response.json();
    
    return `
        <h2>Colonies</h2>
            <select name="colonies">
            <option value="" disabled selected hidden>Select Your Colony</option>
            ${colonies.map(colony => `<option value="${colony.id}">${colony.name}</option>`).join("")}
            </select>
    `
}

export const getSingleColony = async (id) => {

    const response = await fetch(`http://localhost:8088/colonies?id=${id}`);
    const colony = await response.json();

    return colony[0];
}