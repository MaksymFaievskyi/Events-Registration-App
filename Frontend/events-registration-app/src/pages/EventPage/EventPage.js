import React, { useState, useEffect } from 'react';
import EventList from '../../components/EventList/EventList';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import './EventPage.css'; // Імпортуємо CSS

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events');
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container maxWidth={false} className="app-container">
      <Typography variant="h4" component="h1" className="app-title">
        Events
      </Typography>
      <EventList events={events} />
    </Container>
  );
};

export default EventsPage;