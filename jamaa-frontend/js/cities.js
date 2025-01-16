// Cities data by country
const citiesByCountry = {
    cameroon: [
        "Yaoundé",
        "Douala",
        "Bamenda",
        "Bafoussam",
        "Garoua",
        "Maroua",
        "Kumba",
        "Nkongsamba",
        "Buea",
        "Limbe"
    ],
    nigeria: [
        "Lagos",
        "Abuja",
        "Port Harcourt",
        "Kano",
        "Ibadan",
        "Benin City",
        "Calabar",
        "Kaduna",
        "Enugu",
        "Owerri"
    ],
    ghana: [
        "Accra",
        "Kumasi",
        "Tamale",
        "Sekondi-Takoradi",
        "Sunyani",
        "Cape Coast",
        "Obuasi",
        "Ho",
        "Koforidua",
        "Wa"
    ],
    kenya: [
        "Nairobi",
        "Mombasa",
        "Kisumu",
        "Nakuru",
        "Eldoret",
        "Thika",
        "Malindi",
        "Kitale",
        "Garissa",
        "Nyeri"
    ],
    southafrica: [
        "Johannesburg",
        "Cape Town",
        "Durban",
        "Pretoria",
        "Port Elizabeth",
        "Bloemfontein",
        "East London",
        "Kimberley",
        "Polokwane",
        "Nelspruit"
    ],
    uganda: [
        "Kampala",
        "Gulu",
        "Lira",
        "Mbarara",
        "Jinja",
        "Bwizibwera",
        "Mbale",
        "Mukono",
        "Kasese",
        "Masaka"
    ],
    tanzania: [
        "Dar es Salaam",
        "Dodoma",
        "Mwanza",
        "Arusha",
        "Mbeya",
        "Morogoro",
        "Tanga",
        "Kigoma",
        "Zanzibar City",
        "Tabora"
    ]
};

// Function to populate cities
function populateCities(countrySelect, citySelect) {
    const selectedCountry = countrySelect.value;
    citySelect.innerHTML = '<option value="">Select your city</option>';
    
    if (selectedCountry) {
        const cities = citiesByCountry[selectedCountry] || [];
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.toLowerCase();
            option.textContent = city;
            citySelect.appendChild(option);
        });
        citySelect.disabled = false;
    } else {
        citySelect.disabled = true;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');

    if (countrySelect && citySelect) {
        // Initial state
        citySelect.disabled = true;
        
        // Add event listener for country changes
        countrySelect.addEventListener('change', function() {
            populateCities(countrySelect, citySelect);
        });
    }
});
