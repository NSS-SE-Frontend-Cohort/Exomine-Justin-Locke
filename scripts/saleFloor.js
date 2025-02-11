import { getAllColonies } from "./components/colonies.js"
import { getColonyInventory } from "./components/colonyInventory.js";
import { getAllFacilities } from "./components/facilities.js";
import { getGovernorInventory } from "./components/governorInventory.js";
import { getGovernorsForColony } from "./components/governors.js";
import { eventTypes } from "./events/events.js";

document.addEventListener(eventTypes.TRANSIENT_STATE_CHANGED, async (event) => {
    const { field, value } = event.detail;
    console.log(`State changed for ${field}: ${value}`);

    if (field === "colonyId") {
        const filteredGovernors = await getGovernorsForColony(value);
        document.querySelector(".choices_governors").innerHTML = filteredGovernors;
        const colonyInventory = await getColonyInventory(value);
        document.querySelector(".colony_inventory").innerHTML = colonyInventory;
    }

    if (field === "governorId") {
        const governorInventory = await getGovernorInventory(value);
        document.querySelector(".colony_inventory").innerHTML = governorInventory;
        const allFacilities = await getAllFacilities();
        document.querySelector(".choices_facilities").innerHTML = allFacilities;
    }
})



export const deploySalesFloor = async () => {
    
    const allColonies = await getAllColonies();


    return `
        <article class="choices">
            <section class="choices_colonies options">
                ${allColonies}
            </section>

            <section class="choices_governors options">
                <h2>Governors</h2>

            </section>

            <section class="colony_inventory options">
                <h2>Colony Inventory</h2>

            </section>
        </article>

        <article class="choices">
            <section class="choices_facilities options">

            </section>

            <section class="choices_minerals options">

            </section>
        </article>
    `
}