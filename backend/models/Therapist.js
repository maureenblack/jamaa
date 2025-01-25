const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialties: [{
        type: String,
        required: true
    }],
    languages: [{
        type: String,
        required: true
    }],
    sessionTypes: [{
        type: String,
        enum: ['Virtual', 'In-person'],
        required: true
    }],
    pricePerSession: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    availability: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        slots: [{
            startTime: String,
            endTime: String,
            isBooked: {
                type: Boolean,
                default: false
            }
        }]
    }],
    education: [{
        degree: String,
        institution: String,
        year: Number
    }],
    certifications: [{
        name: String,
        issuingBody: String,
        year: Number
    }]
});

module.exports = mongoose.model('Therapist', therapistSchema);
