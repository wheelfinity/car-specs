async function loadDetails() {
    const params = new URLSearchParams(window.location.search);
    const carName = params.get('car')?.toLowerCase();
    const container = document.getElementById('car-detail-view');

    try {
        const resp = await fetch('cars.json');
        const cars = await resp.json();
        const car = cars.find(c => c.name.toLowerCase() === carName || c.brand.toLowerCase() === carName);

        if (car) {
            container.innerHTML = `
                <div class="big-detail-card">
                    <img src="${car.image}" class="full-car-img" alt="${car.name}">
                    <h1>${car.brand} ${car.name}</h1>
                    <h2 class="price-text">Ex-Showroom: ${car.exPrice}</h2>
                    <div class="specs-grid">
                        <div class="spec-item"><h3>Engine</h3><p>${car.engine}</p></div>
                        <div class="spec-item"><h3>Power</h3><p>${car.hp} HP</p></div>
                        <div class="spec-item"><h3>Torque</h3><p>${car.torque || 'N/A'}</p></div>
                    </div>
                </div>`;
        } else {
            container.innerHTML = "<h1>Car not found in database.</h1>";
        }
    } catch (e) { container.innerHTML = "<h1>Error loading data.</h1>"; }
}
window.onload = loadDetails;