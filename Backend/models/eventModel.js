const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    organizer: {
        type: String,
        required: true,
        trim: true,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant' // Reference to the Participant model
    }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
