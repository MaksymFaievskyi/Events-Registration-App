import React, { useState } from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import EventCard from '../EventCard/EventCard';
import '../EventList/EventList.css';

const EventList = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  console.log(events);
  
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <Box className="event-list-container">
      <Grid container spacing={3}>
        {currentEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard event={event} data-id={event._id} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(events.length / eventsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        className="pagination"
      />
    </Box>
  );
};

export default EventList;
