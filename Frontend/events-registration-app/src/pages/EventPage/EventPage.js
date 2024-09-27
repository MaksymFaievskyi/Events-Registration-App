import React, { useState, useEffect } from 'react';
import EventList from '../../components/EventList/EventList';
import { Container, Typography, FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import './EventPage.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

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

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  const sortEvents = (events) => {
    const sortedEvents = [...events].sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'date') {
        return new Date(a.event_date) - new Date(b.event_date);
      } else if (sortOption === 'organizer') {
        return a.organizer.localeCompare(b.organizer);
      }
      return 0;
    });

    return sortDirection === 'asc' ? sortedEvents : sortedEvents.reverse();
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container maxWidth={false} className="app-container">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h1" className="app-title">
          Events
        </Typography>
        <Box display="flex" gap={2}>
          {/* Dropdown для вибору опцій сортування */}
          <FormControl variant="outlined" className="sort-dropdown" style={{ width: '200px' }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={handleSortChange} label="Sort By">
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="date">Event Date</MenuItem>
              <MenuItem value="organizer">Organizer</MenuItem>
            </Select>
          </FormControl>

          {/* Dropdown для напрямку сортування */}
          <FormControl variant="outlined" className="sort-dropdown" style={{ width: '150px' }}>
            <InputLabel>Direction</InputLabel>
            <Select value={sortDirection} onChange={handleDirectionChange} label="Direction">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <EventList events={sortEvents(events)} /> {/* Передаємо відсортовані події до EventList */}
    </Container>
  );
};

export default EventsPage;
