import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './ParticipantCard.css';

const ParticipantCard = ({ participant }) => {
  return (
    <Card variant="outlined" className="participant-card">
      <CardContent>
        <Typography variant="h6" component="div" className="participant-name">
          {participant.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="participant-email">
          {participant.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
