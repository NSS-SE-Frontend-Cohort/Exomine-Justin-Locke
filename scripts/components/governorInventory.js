export const getGovernorInventory = async (id) => {
    
    // Fetch governor inventory
    const inventory = await fetch(`http://localhost:8088/colonyInventory?governorId=${id}&_expand=mineral&_expand=governor`)
        .then(res => res.json());

    if (!inventory.length) return `<h2>No Inventory Available</h2>`;

    // Get the regionId from the first inventory item
    const regionId = inventory[0].governor.colonyRegionId;

    // Fetch region name
    const region = await fetch(`http://localhost:8088/regions/${regionId}`).then(res => res.json());

    // Aggregate mineral quantities using reduce
    const mineralTotals = inventory.reduce((acc, { mineral, quantity }) => {
        acc[mineral.id] = acc[mineral.id] || { name: mineral.name, quantity: 0 };
        acc[mineral.id].quantity += quantity;
        return acc;
    }, {});

    // Generate HTML
    return `
        <h2>${region.name}'s Inventory</h2>
        ${Object.values(mineralTotals).map(({ name, quantity }) => 
            `<div>${name}: ${quantity} tonnes</div>`
        ).join("")}
    `;
};


export const searchGovernorInventory = async (id, mineralId) => {

    const response = await fetch(`http://localhost:8088/colonyInventory?governorId=${id}&mineralId=${mineralId}`);
    const minerals = await response.json();

    return minerals[0];
}