// Sample therapist data
const therapists = [
    {
        id: 1,
        name: "Dr. Ngwing Eposi",
        specialty: "Anxiety & Depression",
        image: "../images/therapist2.jpg",
        rating: 4.8,
        price: "$50/sess",
        languages: "English, French, Bamileke",
        specialties: ["Anxiety", "Depression"],
        sessionTypes: ["Virtual", "In-person"],
        pricePerSession: 50
    },
    {
        id: 2,
        name: "Dr. Foncha Nkeng",
        specialty: "Trauma & PTSD",
        image: "../images/therapist4.jpg",
        rating: 4.9,
        price: "$45/sess",
        languages: "English, French, Douala",
        specialties: ["Trauma", "PTSD"],
        sessionTypes: ["Virtual"],
        pricePerSession: 45
    },
    {
        id: 3,
        name: "Dr. Tchakounte Manka",
        specialty: "Relationship Counseling",
        image: "../images/therapist10.jpg",
        rating: 4.7,
        price: "$55/sess",
        languages: "English, French, Ewondo",
        specialties: ["Relationship Counseling"],
        sessionTypes: ["In-person"],
        pricePerSession: 55
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
document.addEventListener('DOMContentLoaded', function() {
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

// Booking System
function initializeBooking() {
    const modal = document.getElementById('bookingModal');
    const steps = modal.querySelectorAll('.step');
    const nextBtn = document.getElementById('nextStep');
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        // Update button text based on step
        if (stepIndex === steps.length - 1) {
            nextBtn.textContent = 'Confirm Booking';
        } else {
            nextBtn.textContent = 'Next';
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            // Handle booking confirmation
            handleBookingConfirmation();
        }
    });

    // Session type selection
    const sessionCards = document.querySelectorAll('.session-type-card');
    sessionCards.forEach(card => {
        card.addEventListener('click', () => {
            sessionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // Payment method selection
    const paymentMethods = document.querySelectorAll('[name="paymentMethod"]');
    const paymentFields = {
        momo: document.getElementById('momoFields'),
        card: document.getElementById('cardFields')
    };

    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            Object.values(paymentFields).forEach(field => {
                field.classList.remove('active');
            });
            paymentFields[e.target.value].classList.add('active');
        });
    });

    // Reset modal when closed
    modal.addEventListener('hidden.bs.modal', () => {
        currentStep = 0;
        showStep(currentStep);
        sessionCards.forEach(card => card.classList.remove('selected'));
        paymentMethods.forEach(method => method.checked = false);
        Object.values(paymentFields).forEach(field => field.classList.remove('active'));
    });
}

// Initialize booking calendar
function initializeCalendar() {
    // Sample available time slots
    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM',
        '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    const timeSlotsContainer = document.getElementById('timeSlots');
    if (timeSlotsContainer) {
        timeSlots.forEach(time => {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            slot.textContent = time;
            slot.addEventListener('click', () => {
                document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
            });
            timeSlotsContainer.appendChild(slot);
        });
    }
}

// Handle booking confirmation
function handleBookingConfirmation() {
    const selectedSession = document.querySelector('.session-type-card.selected');
    const selectedTime = document.querySelector('.time-slot.selected');
    const selectedPayment = document.querySelector('[name="paymentMethod"]:checked');

    if (!selectedSession || !selectedTime || !selectedPayment) {
        alert('Please complete all required fields');
        return;
    }

    // Here you would typically send the booking data to your backend
    console.log('Booking confirmed:', {
        sessionType: selectedSession.dataset.type,
        time: selectedTime.textContent,
        paymentMethod: selectedPayment.value
    });

    // Close modal and show success message
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    modal.hide();
    alert('Booking confirmed! You will receive a confirmation email shortly.');
}

// Handle search and filters
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const languageFilter = document.getElementById('languageFilter');
    const sessionFilter = document.getElementById('sessionFilter');
    const priceFilter = document.getElementById('priceFilter');
    const resultsContainer = document.getElementById('therapistResults');

    function filterTherapists() {
        const searchTerm = searchInput.value.toLowerCase();
        const language = languageFilter.value;
        const sessionType = sessionFilter.value;
        const priceRange = priceFilter.value;

        const filteredTherapists = therapists.filter(therapist => {
            const matchesSearch = therapist.name.toLowerCase().includes(searchTerm) ||
                                therapist.specialties.some(s => s.toLowerCase().includes(searchTerm));
            const matchesLanguage = !language || therapist.languages.includes(language);
            const matchesSession = !sessionType || therapist.sessionTypes.includes(sessionType);
            
            let matchesPrice = true;
            if (priceRange) {
                const price = therapist.pricePerSession;
                switch(priceRange) {
                    case '0-50':
                        matchesPrice = price <= 50;
                        break;
                    case '51-100':
                        matchesPrice = price > 50 && price <= 100;
                        break;
                    case '100+':
                        matchesPrice = price > 100;
                        break;
                }
            }

            return matchesSearch && matchesLanguage && matchesSession && matchesPrice;
        });

        displayTherapists(filteredTherapists);
    }

    // Add event listeners to all filters
    [searchInput, languageFilter, sessionFilter, priceFilter].forEach(filter => {
        filter.addEventListener('change', filterTherapists);
        filter.addEventListener('keyup', filterTherapists);
    });
}

function displayTherapists(therapists) {
    const container = document.getElementById('therapistResults');
    if (!container) return;

    container.innerHTML = '';
    
    if (therapists.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>No therapists found matching your criteria.</p></div>';
        return;
    }

    therapists.forEach(therapist => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="therapist-card">
                <div class="therapist-image">
                    <img src="${therapist.image}" alt="${therapist.name}">
                </div>
                <div class="therapist-info">
                    <h3>${therapist.name}</h3>
                    <p class="specialties">${therapist.specialties.join(', ')}</p>
                    <p class="languages">Languages: ${therapist.languages.join(', ')}</p>
                    <p class="price">$${therapist.pricePerSession} per session</p>
                    <button class="btn btn-primary" onclick="bookTherapist('${therapist.id}')">Book Session</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize booking system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation and other components
    if (typeof initializeNavigation === 'function') initializeNavigation();
    if (typeof initializeBooking === 'function') initializeBooking();
    if (typeof initializeCalendar === 'function') initializeCalendar();

    // Handle specialties selection
    const specialtyCheckboxes = document.querySelectorAll('input[name="specialties"]');
    const maxSpecialties = 3;

    specialtyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedSpecialties = document.querySelectorAll('input[name="specialties"]:checked');
            
            if (checkedSpecialties.length > maxSpecialties) {
                this.checked = false;
                alert('Please select up to 3 specialties only');
            }

            // Disable remaining checkboxes if max is reached
            if (checkedSpecialties.length >= maxSpecialties) {
                specialtyCheckboxes.forEach(cb => {
                    if (!cb.checked) {
                        cb.disabled = true;
                    }
                });
            } else {
                // Enable all checkboxes if under max
                specialtyCheckboxes.forEach(cb => {
                    cb.disabled = false;
                });
            }
        });
    });

    // Handle session format checkboxes
    const virtualCheckbox = document.getElementById('virtual');
    const inPersonCheckbox = document.getElementById('inPerson');
    
    if (virtualCheckbox && inPersonCheckbox) {
        [virtualCheckbox, inPersonCheckbox].forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (!virtualCheckbox.checked && !inPersonCheckbox.checked) {
                    this.checked = true;
                    alert('Please select at least one session format');
                }
            });
        });
    }

    // Handle form submission
    const registrationForm = document.getElementById('therapistRegistration');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate specialties
            const checkedSpecialties = document.querySelectorAll('input[name="specialties"]:checked');
            if (checkedSpecialties.length === 0) {
                alert('Please select at least one specialty');
                return;
            }

            // Validate session format
            if (virtualCheckbox && inPersonCheckbox && 
                !virtualCheckbox.checked && !inPersonCheckbox.checked) {
                alert('Please select at least one session format');
                return;
            }

            // If all validations pass
            alert('Form submitted successfully! We will review your application and get back to you soon.');
            this.reset();
            
            // Reset specialty checkboxes
            specialtyCheckboxes.forEach(cb => {
                cb.disabled = false;
                cb.checked = false;
            });
        });
    }

    // Initialize search when DOM is loaded
    if (document.getElementById('searchInput')) {
        initializeSearch();
    }
});
