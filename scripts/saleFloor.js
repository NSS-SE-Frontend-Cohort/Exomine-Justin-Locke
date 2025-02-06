import { getAllColonies } from "./components/colonies.js"
import { getColonyInventory } from "./components/colonyInventory.js";
import { getAllGovernors, getGovernorsForColony } from "./components/governors.js";
import { eventTypes } from "./events/events.js";

document.addEventListener(eventTypes.TRANSIENT_STATE_CHANGED, async (event) => {
    const { field, value } = event.detail;
    console.log(`State changed for ${field}: ${value}`);

    if (field === "colonyId") {
        const filteredGovernors = await getGovernorsForColony(value);
        document.querySelector(".choices_governors").innerHTML = filteredGovernors;
        const colonyIventory = await getColonyInventory(value);
        document.querySelector(".colony_inventory").innerHTML = colonyIventory;
    }

})



export const deploySalesFloor = async () => {
    
    const allColonies = await getAllColonies();
    const allGovernors = await getAllGovernors();


    return `
        <article class="choices">
            <section class="choices_colonies">
                ${allColonies}
            </section>

            <section class="choices_governors">
                ${allGovernors}
            </section>

            <section class="colony_inventory">

            </section>
        </article>

    `
}