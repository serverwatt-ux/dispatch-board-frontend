import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import AddDriver from './pages/AddDriver';
import AddTrip from './pages/AddTrip';
import AirportTransfers from './pages/AirportTransfers';
import DoorToDoorServices from './pages/DoorToDoorServices';
import CrewTransportation from './pages/CrewTransportation';
import OutOfTownTrips from './pages/OutOfTownTrips';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './index.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header setMenuOpen={setIsMenuOpen} />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-driver" element={<AddDriver />} />
              <Route path="/add-trip" element={<AddTrip />} />
              <Route path="/airport-transfers" element={<AirportTransfers />} />
              <Route path="/door-to-door" element={<DoorToDoorServices />} />
              <Route path="/crew-transportation" element={<CrewTransportation />} />
              <Route path="/out-of-town" element={<OutOfTownTrips />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
