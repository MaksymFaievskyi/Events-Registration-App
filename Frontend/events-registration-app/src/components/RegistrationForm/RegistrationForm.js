import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Box, Typography } from '@mui/material'; // Додано Typography
import './RegistrationForm.css'; // Імпортуємо CSS

const RegistrationForm = () => {
  const { id } = useParams(); // Отримуємо ID події з параметрів маршруту
  const navigate = useNavigate(); // Використовуємо хук useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const participantData = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      dateOfBirth: formData.get('dateOfBirth'),
      source: formData.get('source'),
    };

    try {
      // Відправляємо POST запит до API
      console.log(`http://localhost:3000/events/${id}`);
      console.log(participantData);
      
      
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(participantData),
      });

      if (response.ok) {
        // Перенаправлення після успішної реєстрації
        navigate(`/events`);
      } else {
        console.error('Failed to register participant');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <TextField
        name="fullName"
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="dateOfBirth"
        label="Date of Birth"
        type="date"
        variant="outlined"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <Typography variant="subtitle1">Where did you hear about this event?</Typography> {/* Додано Typography */}
      <RadioGroup name="source" required>
        <FormControlLabel value="Social Media" control={<Radio />} label="Social Media" />
        <FormControlLabel value="Friend" control={<Radio />} label="Friend" />
        <FormControlLabel value="Myself" control={<Radio />} label="Myself" />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default RegistrationForm;
