import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EventsPage from './pages/EventPage/EventPage'; // Імпортуємо компонент для відображення подій
import EventRegistrationPage from './pages/EventRegistrationPage/EventRegistrationPage'; // Імпортуємо компонент для реєстрації події
import EventParticipantsPage from './pages/EventParticipantsPage/EventParticipantsPage'; // Import the participants page
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage />} /> {/* Головна сторінка з подіями */}
        <Route path="/register/:id" element={<EventRegistrationPage />} /> {/* Сторінка реєстрації події */}
        <Route path="/participants/:id" element={<EventParticipantsPage />} /> {/* Add the new route */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Перенаправлення на головну сторінку, якщо маршрут не знайдено */}
      </Routes>
    </Router>
  );
};

export default App;
