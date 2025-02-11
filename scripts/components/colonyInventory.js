export const getColonyInventory = async (id) => {
    const response = await fetch(`http://localhost:8088/colonyInventory?colonyId=${id}&_expand=mineral`);
    const inventory = await response.json();

    // Use a Map to accumulate mineral quantities
    const mineralMap = inventory.reduce((map, item) => {
        const mineralId = item.mineral.id;

        // If mineralId doesn't exist in the map, initialize it
        if (!map.has(mineralId)) {
            map.set(mineralId, { name: item.mineral.name, quantity: 0 });
        }

        // Update the mineral's quantity
        map.get(mineralId).quantity += item.quantity;

        return map;
    }, new Map());

    // Return the HTML after using map to iterate over the values in mineralMap
    return `
        <h2>Colony Inventory</h2>
        ${[...mineralMap.values()].map(mineral => 
            `<div>${mineral.name}: ${mineral.quantity} tonnes</div>`
        ).join("")}
    `;
};
