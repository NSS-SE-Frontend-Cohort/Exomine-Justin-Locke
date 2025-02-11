export const getMineral = async (id) => {

    const response = await fetch(`http://localhost:8088/minerals?id=${id}`);
    const mineral = await response.json();

    return `
        <h2>Mineral to buy</h2>
        <div>
            <section>
                ${mineral[0].name}
            </section>
        </div>
    `
}

// This will be an update to choose quantity of minerals
// <input type="number" name="quantity" value="1" min="1" />
