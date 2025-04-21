import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Aquarium from './Components/Aquarium/Aquarium';
import New_Fish from './Components/New_Fish/New_Fish';
import Credit from './Components/Credit/Credit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Aquarium />} />
        <Route path="/aquarium" element={<Aquarium />} />
        <Route path="/new-fish" element={<New_Fish />} />
        <Route path="/credit" element={<Credit />} />
      </Routes>
    </Router>
  );
}

export default App;