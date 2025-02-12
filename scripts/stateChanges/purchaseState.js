import { getFacilityInventorySingleMineral } from '../components/facilityInventory.js';
import { searchGovernorInventory } from '../components/governorInventory.js';
import { getTransientState } from './transientState.js'

export const purchaseMineral = async () => {

    const transientState = getTransientState();

    const existingMineralForGovernor = await searchGovernorInventory(transientState.governorId, transientState.mineralId);
    const facilityInventory = await getFacilityInventorySingleMineral(transientState.facilityId, transientState.mineralId);

    debugger
    if (facilityInventory.quantity > 0) {
        const updatedFacilityInventory = {
            ...facilityInventory,
            quantity: facilityInventory.quantity - 1
        };

        // Send the updated data back to the server
        await fetch(`http://localhost:8088/facilityInventory/${facilityInventory.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFacilityInventory)
        });

        console.log(`Inventory item ${facilityInventory.id} updated. New quantity: ${updatedFacilityInventory.quantity}`);
    } else {
        console.log("Quantity is already 0. Cannot decrease further.");
    }

    if (existingMineralForGovernor) {
        const updatedGovernorMineral = {
            ...existingMineralForGovernor,
            quantity: existingMineralForGovernor.quantity + 1
        };

        // Send the updated data back to the server
        await fetch(`http://localhost:8088/colonyInventory/${existingMineralForGovernor.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedGovernorMineral)
        });

        console.log(`Governor mineral ${existingMineralForGovernor.id} updated. New quantity: ${updatedGovernorMineral.quantity}`);
    } else {
        
        // Create new inventory for the colony
        const newMaterialForGovernor = {
            colonyId: transientState.colonyId,
            governorId: transientState.governorId,
            mineralId: transientState.mineralId,
            quantity: 1
        }

        await fetch(`http://localhost:8088/colonyInventory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMaterialForGovernor)
        });

        console.log(`New Governor Mineral added to Inventory`)
    }


    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */

    document.dispatchEvent(new CustomEvent("materialPurchased"))
}

