import { getTransientState, setFacilityId } from "../stateChanges/transientState.js";

document.addEventListener("change", (event) => {
    if (event.target.name === "facilities") {
        setFacilityId(parseInt(event.target.value));
    }
})

export const getAllFacilities = async () => {

    const response = await fetch("http://localhost:8088/facilities");
    const facilities = await response.json();
    
    return facilities;
}

export const createFacilitiesHTML = (facilities) => {
    
    return `
        <h2>Facilities</h2>
            <select name="facilities">
            <option value="" disabled selected hidden>Select a Facility</option>
            ${facilities.map(facility => 
                `<option value="${facility.id}" ${facility.isActive ? "" : "disabled"}>${facility.name}</option>`).join("")}
            </select>
    `
}