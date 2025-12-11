import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Teachers from './pages/Teachers';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyCourses from './pages/MyCourses';
import Favorites from './pages/Favorites';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes publiques avec Header */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/my-courses" element={<MyCourses />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </main>
            </>
          } />
          
          {/* Routes admin sans Header */}
          <Route path="/admin/*" element={
            <main>
              <Routes>
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;