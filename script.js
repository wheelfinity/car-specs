const searchInput = document.getElementById('car-search');
const searchBtn = document.getElementById('search-btn');
const suggestionsBox = document.getElementById('suggestions-box');
const modal = document.getElementById('contact-modal');
const contactLink = document.getElementById('contact-link');
const closeBtn = document.querySelector('.close-btn');

let currentFocus = -1;

// --- NAVIGATION ---
const goToDetails = (query) => {
    if (query && query.trim() !== "") {
        window.location.href = `details.html?car=${encodeURIComponent(query.trim())}`;
    }
};

searchBtn.onclick = () => goToDetails(searchInput.value);

// --- KEYBOARD ARROWS ---
searchInput.onkeydown = (e) => {
    const items = suggestionsBox.getElementsByTagName('div');
    if (e.key === 'ArrowDown') {
        currentFocus++;
        addActive(items);
    } else if (e.key === 'ArrowUp') {
        currentFocus--;
        addActive(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFocus > -1 && items[currentFocus]) {
            items[currentFocus].click();
        } else {
            goToDetails(searchInput.value);
        }
    }
};

function addActive(items) {
    if (!items.length) return;
    for (let i = 0; i < items.length; i++) items[i].classList.remove('suggestion-active');
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    items[currentFocus].classList.add('suggestion-active');
    items[currentFocus].scrollIntoView({ block: 'nearest' });
}

// --- SUGGESTIONS ---
searchInput.oninput = async () => {
    const query = searchInput.value.toLowerCase();
    currentFocus = -1;
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
                div.style.padding = "12px 25px"; div.style.cursor = "pointer";
                div.style.color = "white"; div.style.borderBottom = "1px solid #222";
                div.textContent = `${car.brand} ${car.name}`;
                div.onclick = () => goToDetails(car.name);
                suggestionsBox.appendChild(div);
            });
        } else { suggestionsBox.style.display = "none"; }
    } catch (e) { console.error(e); }
};

// --- CONTACT MODAL LOGIC ---
contactLink.onclick = (e) => {
    e.preventDefault();
    modal.classList.add('show');
};

closeBtn.onclick = () => {
    modal.classList.remove('show');
};

window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('show');
    if (e.target !== searchInput) suggestionsBox.style.display = "none";
};