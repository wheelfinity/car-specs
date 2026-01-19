async function loadCarDetails() {
    const params = new URLSearchParams(window.location.search);
    const carName = params.get('car');
    const container = document.getElementById('car-detail-view');

    try {
        const resp = await fetch('cars.json');
        const cars = await resp.json();
        const car = cars.find(c => c.name.toLowerCase().includes(carName.toLowerCase()));

        if (!car) { container.innerHTML = "<h1>Car not found</h1>"; return; }

        container.innerHTML = `
            <h1 style="margin-bottom:10px; font-size:2.5rem;">${car.brand} ${car.name}</h1>
            <p style="color:#666; margin-bottom:30px; font-size:1.2rem;">Detailed Specifications & Pricing</p>
            <div class="details-img-container"><img src="${car.image}" class="car-main-img"></div>
            <div class="tab-menu">
                <button class="tab-link active" onclick="openTab(event, 'KeySpecs')">Key Specifications</button>
                <button class="tab-link" onclick="openTab(event, 'TopFeatures')">Top Features</button>
            </div>
            <div id="KeySpecs" class="tab-content active">
                <div class="grid-layout">
                    <div class="info-row"><span>Engine</span> <strong>${car.engine}</strong></div>
                    <div class="info-row"><span>Power</span> <strong>${car.hp}</strong></div>
                    <div class="info-row"><span>Torque</span> <strong>${car.torque}</strong></div>
                    <div class="info-row"><span>Mileage</span> <strong>${car.mileage}</strong></div>
                </div>
            </div>
            <div id="TopFeatures" class="tab-content">
                <div class="grid-layout">${car.features.map(f => `<div class="info-row"><span style="color:var(--orange)">✓</span> <strong>${f}</strong></div>`).join('')}</div>
            </div>
            <div class="price-section">
                <h2>${car.name} Variant Prices</h2>
                <div class="filter-bar">
                    <label class="radio-container"><input type="radio" name="tx" value="all" checked onclick="filterTx('all')"> All</label>
                    <label class="radio-container"><input type="radio" name="tx" value="Automatic" onclick="filterTx('Automatic')"> Automatic</label>
                    <label class="radio-container"><input type="radio" name="tx" value="Manual" onclick="filterTx('Manual')"> Manual</label>
                </div>
                <div id="v-list">${car.variants.map(v => `
                    <div class="variant-card" data-type="${v.type}">
                        <div><strong>${v.vName}</strong><br><small style="color:#888; font-size:1rem;">${v.vSpecs}</small></div>
                        <div style="text-align:right">
                            <strong style="font-size:1.5rem;">${v.vPrice}*</strong>
                            <span class="ex-label">Ex-Showroom Price</span>
                        </div>
                    </div>`).join('')}
                </div>
            </div>`;
    } catch (e) { console.error(e); }
}

function openTab(evt, name) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
    document.getElementById(name).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function filterTx(type) {
    document.querySelectorAll('.variant-card').forEach(card => {
        card.style.display = (type === 'all' || card.dataset.type === type) ? 'flex' : 'none';
    });
}
loadCarDetails();