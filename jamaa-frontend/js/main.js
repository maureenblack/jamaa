// Sample therapist data
const therapists = [
    {
        id: 1,
        name: "Dr. Ngwing Eposi",
        specialty: "Anxiety & Depression",
        image: "../images/therapist2.jpg",
        rating: 4.8,
        price: "$50/sess",
        languages: "English, French, Bamileke"
    },
    {
        id: 2,
        name: "Dr. Foncha Nkeng",
        specialty: "Trauma & PTSD",
        image: "../images/therapist4.jpg",
        rating: 4.9,
        price: "$45/sess",
        languages: "English, French, Douala"
    },
    {
        id: 3,
        name: "Dr. Tchakounte Manka",
        specialty: "Relationship Counseling",
        image: "../images/therapist10.jpg",
        rating: 4.7,
        price: "$55/sess",
        languages: "English, French, Ewondo"
    }
];

// Load therapist cards
function loadTherapists(therapists) {
    const therapistList = document.getElementById('therapistList');
    therapistList.innerHTML = '';

    therapists.forEach(therapist => {
        const card = document.createElement('div');
        card.className = 'col-12';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${therapist.image}" class="card-img-top" alt="${therapist.name}">
                <div class="card-body">
                    <h5 class="card-title">${therapist.name}</h5>
                    <p class="card-text">${therapist.specialty}</p>
                    <div class="rating">
                        <span>⭐</span>
                        <span>${therapist.rating}</span>
                    </div>
                    <div class="languages">
                        <span>🗣️</span>
                        <span>${therapist.languages}</span>
                    </div>
                    <div class="price">${therapist.price}</div>
                </div>
            </div>
        `;
        therapistList.appendChild(card);
    });
}

// Initialize therapist listing
document.addEventListener('DOMContentLoaded', () => {
    loadTherapists(therapists);

    // Form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your login logic here
            console.log('Login submitted');
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Book session functionality
function bookSession(therapistId) {
    // Add booking logic here
    console.log(`Booking session with therapist ${therapistId}`);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Add accessibility keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.show');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        }
    }
});
