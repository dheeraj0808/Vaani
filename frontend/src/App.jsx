import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
