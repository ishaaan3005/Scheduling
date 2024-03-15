import React, { useState, useEffect, useContext } from 'react';
import { AppointmentContext } from './AppointmentContext';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const { addAppointment } = useContext(AppointmentContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/appointments');
        if (response.ok) {
          const data = await response.json();
          data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          setAppointments(data);
          setFilteredAppointments(data); // Initialize filteredAppointments with all appointments
        } else {
          throw new Error('Failed to fetch appointments');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [addAppointment]);

  const handleDeleteAppointment = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
        setFilteredAppointments(filteredAppointments.filter(appointment => appointment.id !== id));
      } else {
        throw new Error('Failed to delete appointment');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = appointments.filter(appointment =>
      appointment.name.toLowerCase().includes(term)
    );
    setFilteredAppointments(filtered);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Scheduled Appointments</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <ul style={styles.list}>
          {filteredAppointments.map((appointment) => (
            <li key={appointment.id} style={styles.item}>
              <div style={styles.details}>
                <div style={styles.detail}>Name: {appointment.name}</div>
                <div style={styles.detail}>Time: {appointment.time}</div>
                {appointment.reason && <div style={styles.detail}>Reason: {appointment.reason}</div>}
                <div style={styles.detail}>Booked at: {new Date(appointment.timestamp).toLocaleString()}</div>
              </div>
              <div style={styles.actions}>
                <button style={styles.deleteButton} onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '15px',
  },
  searchInput: {
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  details: {
    marginRight: '20px',
  },
  detail: {
    marginBottom: '5px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'opacity 0.3s ease',
    ':hover': {
      opacity: 0.8,
    },
  },
};

export default AppointmentList;
