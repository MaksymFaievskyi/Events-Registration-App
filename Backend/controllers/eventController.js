const Event = require('../models/eventModel');
const Participant = require("../models/participantModel")

exports.checkID = async (req, res, next) => {
    console.log("checkID");
    const event = await Event.findById(req.params.id);
    console.log(event);
    
    if (!event) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid event title',
        });
        return;
    }
    res.locals.index = event.title;
    next();
};

exports.getAllEvents = async (req, res) => {
    try {
        console.log("getAllEvents");
        
        let events = await Event.find();

        res.status(200).json({
            status: 'success',
            events: events,
            
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.getParticipantByEventID = async (req, res) => {
    console.log("getParticipantByEventID");
    const event = await Event.findById(req.params.id);
    const participants = await Participant.find({
        _id: { $in: event.participants }
    });
    res.status(200).json({
        status: 'success',
        participants: participants
    });
};

exports.addParticipantToEvent = async (req, res) => {
    try {
        const oldEvent = await Event.findById(req.params.id);
        const newParticipant = new Participant(req.body);

        const createdParticipant = await newParticipant.save()
            .catch((error) => {
                res.status(400).json({ warning: 'This participant exists' });
            });

        oldEvent.participants.push(createdParticipant._id);

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { participants: oldEvent.participants },
            { new: true } 
        );

        res.status(201).json({
            status: 'success',
            data: { event: updatedEvent }
        });
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
