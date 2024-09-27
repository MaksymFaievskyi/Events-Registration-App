import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/register/${event._id}`); // Перенаправляємо на сторінку реєстрації з id події
  };

  const handleViewClick = () => {
    navigate(`/participants/${event._id}`); // Перенаправляємо на сторінку учасників з id події
  };

  return (
    <Card className="event-card" variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div" className="event-title">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="event-description">
          {event.description}
        </Typography>
        <Typography variant="body1" className="event-organizer">
          Organizer: {event.organizer}
        </Typography>
        <Typography variant="body1" className="event-organizer">
          Event date: {event.event_date.slice(0, 10)}
        </Typography>
      </CardContent>
      <Box className="event-actions">
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="event-register"
          onClick={handleRegisterClick}
        >
          Register
        </Button>
        <Button
          size="small"
          variant="text"
          color="primary"
          className="event-view"
          onClick={handleViewClick}
        >
          View
        </Button>
      </Box>
    </Card>
  );
};

export default EventCard;
