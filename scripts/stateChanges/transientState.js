import { dispatchTransientStateChanged } from "../events/events.js";

const transientState = {
    colonyId: null,
    governorId: null
};

// Setters for the transient state
export const setColonyId = (id) => {
    transientState.colonyId = id;
    dispatchTransientStateChanged('colonyId', id);
}

export const setGovernorId = (id) => transientState.governorId = id;

// Return a copy of the transient state
export const getTransientState = () => ({ ...transientState });

