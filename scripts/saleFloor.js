import { getAllColonies } from "./components/colonies.js"
import { getColonyInventory } from "./components/colonyInventory.js";
import { getAllFacilities } from "./components/facilities.js";
import { getFacilityInventory } from "./components/facilityInventory.js";
import { getGovernorInventory } from "./components/governorInventory.js";
import { getGovernorsForColony } from "./components/governors.js";
import { getMineral } from "./components/minerals.js";
import { createPurchaseButton } from "./components/purchaseButton.js";
import { eventTypes } from "./events/events.js";

document.addEventListener(eventTypes.TRANSIENT_STATE_CHANGED, async (event) => {
    const { field, value } = event.detail;
    console.log(`State changed for ${field}: ${value}`);

    if (field === "colonyId") {
        
        // Show governors from selected colony
        const filteredGovernors = await getGovernorsForColony(value);
        document.querySelector(".choices_governors").innerHTML = filteredGovernors;
        
        // Show inventory of entire colony
        const colonyInventory = await getColonyInventory(value);
        document.querySelector(".colony_inventory").innerHTML = colonyInventory;
    }

    if (field === "governorId") {
        
        // Show inventory governor is responsible for
        const governorInventory = await getGovernorInventory(value);
        document.querySelector(".colony_inventory").innerHTML = governorInventory;
        
        // Show facilities after a governor is selected
        const allFacilities = await getAllFacilities();
        document.querySelector(".choices_facilities").innerHTML = allFacilities;
    }

    if (field === "facilityId") {
        
        // Show inventory of selected facility
        const facilityInventory = await getFacilityInventory(value);
        document.querySelector(".choices_minerals").innerHTML = facilityInventory;
    }

    if (field === "mineralId") {
        
        // Get and show selected mineral in sale area
        const mineral = await getMineral(value);
        document.querySelector(".choices_sale").innerHTML = mineral;

        // Create button for purchase of mineral
        const purchaseButton = createPurchaseButton();
        document.querySelector(".choices_sale").innerHTML += purchaseButton;
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

            <section class="choices_sale options">
                
            </section>
            
        </article>
    `
}