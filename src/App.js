import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DriverPage from './pages/DriverPage';
import TeamPage from './pages/TeamPage';
import ResultPage from './pages/ResultPage';
import Navbar from './layouts/navBar';
import Footer from './layouts/footer';

const App = () => {
  return (
    
    <div>
      <Navbar />
      <div className="container mt-4">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/drivers" />} />
            <Route path="" element={<Navigate to="/drivers" />} />
            <Route path="/drivers" element={<DriverPage />} />
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/results" element={<ResultPage />} />
          </Routes>
        </Router>
       </div>
       <Footer />
     </div>

  );
};

export default App;