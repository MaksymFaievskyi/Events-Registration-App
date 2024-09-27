import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Pagination, CircularProgress } from '@mui/material';
import axios from 'axios';
import ParticipantCard from '../../components/ParticipantCard/ParticipantCard'; // Ensure this path is correct
import { useParams } from 'react-router-dom'; // Import useParams
import './EventParticipantsPage.css'; // Add styling for the participants page if needed

const EventParticipantsPage = () => {
  const { id: eventId } = useParams(); // Get the event ID from the URL parameters
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const participantsPerPage = 9; // Adjust as needed

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        console.log(`http://localhost:3000/events/${eventId}`); // Make sure to call the right endpoint
        const response = await axios.get(`http://localhost:3000/events/${eventId}`); // Call the correct API endpoint
        console.log(response);
        
        setParticipants(response.data.participants); // Adjust based on your API response structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch participants');
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = participants.slice(indexOfFirstParticipant, indexOfLastParticipant);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="lg" className="app-container">
      <Typography variant="h4" component="h1" className="app-title">
        Participants
      </Typography>
      <Grid container spacing={3}>
        {currentParticipants.map((participant) => (
          <Grid item xs={12} sm={6} md={4} key={participant._id}>
            <ParticipantCard participant={participant} />
          </Grid>
        ))}
      </Grid>
      <Box className="pagination">
        <Pagination
          count={Math.ceil(participants.length / participantsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
        />
      </Box>
    </Container>
  );
};

export default EventParticipantsPage;
