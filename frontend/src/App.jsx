import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import UploadPaper from './pages/UploadPaper';
import ResultComparison from './pages/ResultComparison';
import QuizSystem from './pages/QuizSystem';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-paper" element={<UploadPaper />} />
        <Route path="/result-comparison" element={<ResultComparison />} />
        <Route path="/quiz-system" element={<QuizSystem />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
