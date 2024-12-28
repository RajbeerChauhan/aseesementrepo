import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import InternshipPage from './components/InternshipPage';
import PostJobPage from './components/PostJobPage'; // If implemented

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/internships" element={<InternshipPage />} />
                <Route path="/post-job" element={<PostJobPage />} /> {/* For companies to post jobs */}
                {/* Fallback for unmatched routes */}
            </Routes>
        </Router>
    );
}

export default App;
