import { getFacilityInventory } from '../components/facilityInventory.js';
import { searchGovernorInventory } from '../components/governorInventory.js';
import getTransientState from './transientState.js'

export const purchaseMineral = async () => {

    const transientState = getTransientState();

    const existingMineralForGovernor = await searchGovernorInventory(transientState.governorId, transientState.mineralId);
    const facilityInventory = await getFacilityInventory(transientState.facilityId);
    

    if (existingMineralForGovernor) {
        debugger
    }
    else {
        const postPurchase = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: 
        }
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



    document.dispatchEvent(new CustomEvent("stateChanged"))
}