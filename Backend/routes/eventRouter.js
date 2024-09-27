const express = require('express');
const eventController = require('../controllers/eventController.js');

const {
  getAllEvents,
  getParticipantByEventID, 
  addParticipantToEvent,
  checkID,
} = eventController;

const router = express.Router();

router.param("id", checkID);

router
  .route('/')
  .get(getAllEvents)
router
  .route('/:id')
  .get(getParticipantByEventID)
  .post(addParticipantToEvent)

module.exports = router;