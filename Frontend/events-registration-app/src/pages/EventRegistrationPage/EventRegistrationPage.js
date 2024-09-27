import React from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './EventRegistrationPage.css';

const EventRegistrationPage = () => {
  const { id: eventId } = useParams(); // Отримуємо ID з параметрів маршруту

  return (
    <Container maxWidth="sm" className="registration-container">
      <Typography variant="h4" component="h1" className="registration-title">
        Event Registration
      </Typography>
      <RegistrationForm eventId={eventId} />
    </Container>
  );
};

export default EventRegistrationPage;