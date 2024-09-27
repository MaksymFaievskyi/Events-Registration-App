import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EventsPage from './pages/EventPage/EventPage'; 
import EventRegistrationPage from './pages/EventRegistrationPage/EventRegistrationPage'; 
import EventParticipantsPage from './pages/EventParticipantsPage/EventParticipantsPage'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage />} /> 
        <Route path="/register/:id" element={<EventRegistrationPage />} /> 
        <Route path="/participants/:id" element={<EventParticipantsPage />} /> 
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
  );
};

export default App;
