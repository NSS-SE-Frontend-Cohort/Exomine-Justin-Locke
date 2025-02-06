export const getAllGovernors = async () => {

    const response = await fetch("http://localhost:8088/governors");
    const governors = await response.json();

    return `
        <h2>Governers</h2>
            <select name="governors">
        ${governors.map(governor => `<option value="${governor.id}">${governor.name}</option>`).join("")}
            </select>
    `
}