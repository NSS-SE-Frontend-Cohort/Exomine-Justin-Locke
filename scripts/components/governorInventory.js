export const getGovernorInventory = async (id) => {
    const response = await fetch(`http://localhost:8088/colonyInventory?governorId=${id}&_expand=mineral&_expand=governor&_expand=governor/colonyRegion`);
    const inventory = await response.json();

    let regionId = ``;
    // Use a Map to accumulate mineral quantities
    const mineralMap = inventory.reduce((map, item) => {
        const mineralId = item.mineral.id;
        regionId = item.governor.colonyRegionId;

        // If mineralId doesn't exist in the map, initialize it
        if (!map.has(mineralId)) {
            map.set(mineralId, { name: item.mineral.name, quantity: 0 });
        }

        // Update the mineral's quantity
        map.get(mineralId).quantity += item.quantity;

        return map;
    }, new Map());

    const region = await (await fetch(`http://localhost:8088/regions?id=${id}`)).json();
    
    
    // Return the HTML after using map to iterate over the values in mineralMap
    return `
        <h2>Governor Inventory</h2>
        <h3>${region[0].name}</h3>
        ${[...mineralMap.values()].map(mineral => 
            `<div>${mineral.name}: ${mineral.quantity} tonnes</div>`
        ).join("")}
    `;
};
