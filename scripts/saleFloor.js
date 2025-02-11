import { getAllColonies } from "./components/colonies.js"
import { getColonyInventory } from "./components/colonyInventory.js";
import { getGovernorInventory } from "./components/governorInventory.js";
import { getAllGovernors, getGovernorsForColony } from "./components/governors.js";
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
    }
})



export const deploySalesFloor = async () => {
    
    const allColonies = await getAllColonies();
    const allGovernors = await getAllGovernors();


    return `
        <article class="choices">
            <section class="choices_colonies options">
                ${allColonies}
            </section>

            <section class="choices_governors options">
                ${allGovernors}
            </section>

            <section class="colony_inventory options">

            </section>
        </article>
    
    `
}