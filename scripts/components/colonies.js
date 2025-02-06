export const getAllColonies = async () => {

    const response = await fetch("http://localhost:8088/colonies");
    const colonies = await response.json();
    
    return `
        <h2>Colonies</h2>
            <select name="colonies">
            <option value="">Select Your Colony</option>
            ${colonies.map(colony => `<option value="${colony.id}">${colony.name}</option>`).join("")}
            </select>
    `
}