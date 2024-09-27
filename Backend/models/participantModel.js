const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /.+\@.+\..+/.test(v); 
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    source: {
        type: String,
        enum: ['Social Media', 'Friend', 'Myself', "Other"], // You can adjust these options as necessary
        required: true,
    }
}, {
    timestamps: true 
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
