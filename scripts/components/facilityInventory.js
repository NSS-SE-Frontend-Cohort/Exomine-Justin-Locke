export const getFacilityInventory = async (id) => {

    const response = await fetch(`http://localhost:8088/facilityInventory?facilityId=${id}&_expand=mineral`);
    const inventory = await response.json();

    return `
        <h2>Minerals</h2>
            ${inventory.map(item => `
                <div>
                    <input type="radio" name="mineral" value="${item.mineralId}" /> ${item.mineral.name}: ${item.quantity} tonnes
                </div>
            `).join("")
        }
    `
}