export const getColonyInventory = async (id) => {

    const response = await fetch(`http://localhost:8088/colonyInventory?colonyId=${id}&_expand=mineral`);
    const inventory = await response.json();

    debugger

    return `
        <h2>Colony Inventory</h2>
            ${inventory.map(material => `<div value="${material.id}">${material.mineral.name}: ${material.quantity} tonnes</div>`).join("")}
    `;
}