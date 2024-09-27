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
        ref: 'Participant' 
    }]
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
