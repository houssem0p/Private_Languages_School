// frontend/src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/animations.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement du composant
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    alert('Déconnexion réussie !');
  };

  return (
    <header style={{
      background: 'var(--white)',
      boxShadow: 'var(--shadow)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container">
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0'
        }}>
          <Link to="/" className="slide-in-left" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--text-dark)',
            textDecoration: 'none'
          }}>
            <img src="/logo_school.png" alt="Global Speak" style={{
                width: '125px',
                height: '60px'
            }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link to="/courses" className="nav-link">
                Courses
              </Link>
              <Link to="/teachers" className="nav-link">
                Teachers
              </Link>
              
              {/* Afficher My Courses et Favorites seulement si connecté */}
              {user && (
                <>
                  <Link to="/my-courses" className="nav-link">
                    My Courses
                  </Link>
                  <Link to="/favorites" className="nav-link">
                    Favorites
                  </Link>
                </>
              )}

              {/* Liens admin/teacher si connecté avec ces rôles */}
              {user?.role === 'admin' && (
                <Link to="/admin/dashboard" className="nav-link" style={{ color: '#ef4444' }}>
                  Admin Dashboard
                </Link>
              )}
              
              {user?.role === 'teacher' && (
                <Link to="/teacher/dashboard" className="nav-link" style={{ color: '#10b981' }}>
                  Teacher Dashboard
                </Link>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ 
                    color: 'var(--text-dark)', 
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Bonjour, {user.firstName}
                  </span>
                  <button 
                    onClick={handleLogout}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      color: 'var(--text-dark)',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Log In
                  </Link>
                  <Link to="/signup" className="btn">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;