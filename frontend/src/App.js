import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppointmentProvider } from './AppointmentContext';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <AppointmentProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<AppointmentList />} />
            <Route path="/book" element={<AppointmentForm />} />
          </Routes>
        </AppointmentProvider>
      </div>
    </Router>
  );
}

export default App;
