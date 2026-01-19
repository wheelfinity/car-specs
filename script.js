const searchInput = document.getElementById('car-search');
const suggestionsBox = document.getElementById('suggestions-box');
const searchBtn = document.getElementById('search-btn');

// Modal Logic
const modal = document.getElementById("contact-modal");
const btn = document.getElementById("contact-btn");
const span = document.querySelector(".close");
btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

// Autocomplete Suggestions
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.toLowerCase();
    if (query.length < 1) { suggestionsBox.style.display = "none"; return; }

    try {
        const resp = await fetch('cars.json');
        const cars = await resp.json();
        const matches = cars.filter(c => c.name.toLowerCase().includes(query) || c.brand.toLowerCase().includes(query));

        suggestionsBox.innerHTML = "";
        if (matches.length > 0) {
            suggestionsBox.style.display = "block";
            matches.forEach(car => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = `${car.brand} ${car.name}`;
                div.onclick = () => {
                    window.location.href = `details.html?car=${encodeURIComponent(car.name)}`;
                };
                suggestionsBox.appendChild(div);
            });
        }
    } catch (e) { console.error("Error loading suggestions"); }
});

searchBtn.onclick = () => {
    const val = searchInput.value;
    if(val) window.location.href = `details.html?car=${encodeURIComponent(val)}`;
};