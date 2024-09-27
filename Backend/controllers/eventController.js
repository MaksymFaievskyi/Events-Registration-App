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
/*     //const { fullName, email, birthday, source } = req.body;
    const oldEvent = await Event.findById(req.params.id);
    const newParticipant = new Participant(req.body);
    newParticipant.save()
        .then(async (createdData) => {
            console.log(createdData);
            console.log(oldEvent.participants);
            
            const newParticipants = oldEvent.participants.push(createdData);
            console.log(newParticipants);
            const newEvent = await Event.findByIdAndUpdate(req.params.id,{participants: newParticipants})
            console.log(newEvent);
            
            res.status(201).json({
                status: 'success',
                data: { event: newEvent }
            });
        })
        .catch((error) => {
            console.error('Error creating record:', error);
            res.status(400).json({ error: 'Internal Server Error' });
        }); */
        try {
            // Знаходимо подію за ID
            const oldEvent = await Event.findById(req.params.id);
    
            // Створюємо нового учасника
            const newParticipant = new Participant(req.body);
    
            // Зберігаємо нового учасника в базу даних
            const createdParticipant = await newParticipant.save()
                .catch((error) => {
                    res.status(400).json({ warning: 'This participant exists' });
                });
    
            // Додаємо ID нового учасника до масиву учасників події
            oldEvent.participants.push(createdParticipant._id);
    
            // Оновлюємо подію з новим масивом учасників
            const updatedEvent = await Event.findByIdAndUpdate(
                req.params.id,
                { participants: oldEvent.participants }, // Оновлюємо учасників
                { new: true } // Повертає оновлений документ
            );
    
            // Відправляємо відповідь на клієнт
            res.status(201).json({
                status: 'success',
                data: { event: updatedEvent }
            });
        } catch (error) {
            console.error('Error creating record:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
};
