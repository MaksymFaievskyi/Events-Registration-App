import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Pagination, CircularProgress, TextField } from '@mui/material';
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
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const participantsPerPage = 9; // Adjust as needed

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/${eventId}`); // Call the correct API endpoint
        
        setParticipants(response.data.participants); // Adjust based on your API response structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch participants');
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  // Filter participants based on the search query
  const filteredParticipants = participants.filter(participant => {
    return (
      participant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = filteredParticipants.slice(indexOfFirstParticipant, indexOfLastParticipant);

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

      {/* Search Input Field */}
      <TextField
        label="Search by Full Name or Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Grid container spacing={3}>
        {currentParticipants.map((participant) => (
          <Grid item xs={12} sm={6} md={4} key={participant._id}>
            <ParticipantCard participant={participant} />
          </Grid>
        ))}
      </Grid>

      <Box className="pagination">
        <Pagination
          count={Math.ceil(filteredParticipants.length / participantsPerPage)} // Update to use filteredParticipants
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          disabled={filteredParticipants.length === 0} // Disable pagination if no participants
        />
      </Box>
    </Container>
  );
};

export default EventParticipantsPage;
