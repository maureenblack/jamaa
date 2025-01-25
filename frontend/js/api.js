// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Authentication API calls
const auth = {
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                return data;
            }
            throw new Error(data.message);
        } catch (error) {
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                return data;
            }
            throw new Error(data.message);
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
};

// Therapist API calls
const therapists = {
    getAll: async (filters = {}) => {
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await fetch(`${API_BASE_URL}/therapists?${queryString}`);
            const data = await response.json();
            if (response.ok) {
                return data.data.therapists;
            }
            throw new Error(data.message);
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/therapists/${id}`);
            const data = await response.json();
            if (response.ok) {
                return data.data.therapist;
            }
            throw new Error(data.message);
        } catch (error) {
            throw error;
        }
    },

    createProfile: async (profileData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/therapists/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });
            const data = await response.json();
            if (response.ok) {
                return data.data.therapist;
            }
            throw new Error(data.message);
        } catch (error) {
            throw error;
        }
    }
};

// Booking API calls
const bookings = {
    create: async (bookingData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });
            const data = await response.json();
            if (response.ok) {
                return data.data.booking;
            }
            throw new Error(data.message);
        } catch (error) {
            throw error;
        }
    },

    getMyBookings: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                return data.data.bookings;
            }
            throw new Error(data.message);
        } catch (error) {
            throw error;
        }
    }
};

// Export the API functions
window.jamaaAPI = {
    auth,
    therapists,
    bookings
};
