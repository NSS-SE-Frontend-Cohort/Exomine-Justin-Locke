import { getTransientState, setMineralId } from "../stateChanges/transientState.js";

document.addEventListener("change", (event) => {
    if (event.target.name === "mineral") {
        setMineralId(parseInt(event.target.value));
        console.log("Mineral Stated Changed: ", getTransientState());
    }
})

export const getFacilityInventory = async (id) => {

    const response = await fetch(`http://localhost:8088/facilityInventory?facilityId=${id}&_expand=mineral`);
    const inventory = await response.json();

    return inventory;
}

export const getFacilityInventorySingleMineral = async (facilityId, mineralId) => {

    const response = await fetch(`http://localhost:8088/facilityInventory?facilityId=${facilityId}&mineralId=${mineralId}`);
    const inventory = await response.json();
    
    return inventory[0];
}

export const createFacilityInventoryHTML = (inventory) => {
    return `
        <h2>Minerals</h2>
            ${inventory.map(item => `
                <div>
                    <input type="radio" name="mineral" value="${item.mineralId}" ${item.quantity === 0 ? "disabled" : ""} /> ${item.mineral.name}: ${item.quantity} tonnes
                </div>
            `).join("")
        }
    `
}