import { dispatchTransientStateChanged } from "../events/events.js";

const transientState = {
    colonyId: null,
    governorId: null,
    facilityId: null,
    mineralId: null
};

// Setters for the transient state
export const setColonyId = (id) => {
    transientState.colonyId = id;
    dispatchTransientStateChanged('colonyId', id);
}

export const setGovernorId = (id) => {
    transientState.governorId = id;
    dispatchTransientStateChanged('governorId', id);
}

export const setFacilityId = (id) => {
    transientState.facilityId = id;
    dispatchTransientStateChanged('facilityId', id);
}

export const setMineralId = (id) => {
    transientState.mineralId = id;
    dispatchTransientStateChanged('mineralId', id);
}

// Return a copy of the transient state
export const getTransientState = () => ({ ...transientState });

