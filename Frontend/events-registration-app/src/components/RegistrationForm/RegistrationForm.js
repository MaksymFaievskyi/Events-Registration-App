import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Box, Typography } from '@mui/material';
import './RegistrationForm.css'; 

const RegistrationForm = () => {
  const { id } = useParams(); // Отримуємо ID події з параметрів маршруту
  const navigate = useNavigate();

  const [errors, setErrors] = useState({}); 

  const validate = (data) => {
    const newErrors = {};
    
    // Validate Full Name
    if (!data.fullName || !/^[a-zA-Z\s'-]+$/.test(data.fullName) || data.fullName.split(' ').length < 2) {
      newErrors.fullName = "Full Name must contain at least two words and cannot include numbers or special characters.";
    }

    // Validate Email
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate Date of Birth
    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    console.log(dob);
    
    if (!data.dateOfBirth || dob >= today) {
      newErrors.dateOfBirth = "Date of Birth must be a past date.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const participantData = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      dateOfBirth: formData.get('dateOfBirth'),
      source: formData.get('source'),
    };

    const validationErrors = validate(participantData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop submission if there are errors
    }

    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(participantData),
      });

      if (response.ok) {
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
        error={Boolean(errors.fullName)}
        helperText={errors.fullName}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.email)}
        helperText={errors.email}
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
        error={Boolean(errors.dateOfBirth)}
        helperText={errors.dateOfBirth}
      />
      <Typography variant="subtitle1">Where did you hear about this event?</Typography>
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
