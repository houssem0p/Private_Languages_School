// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { authAPI } from '../services/api';
import '../styles/animations.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await authAPI.login(formData.email, formData.password);
    
    if (response.success) {
      // Stocker les infos utilisateur
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      
      // Rediriger selon le rôle
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
      
      alert('Login successful!');
    } else {
      alert(response.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Login error: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-beige) 0%, var(--secondary-beige) 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            background: 'var(--white)',
            padding: '3rem',
            borderRadius: '20px',
            boxShadow: 'var(--shadow)'
          }} className="fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Log In</h1>
              <p style={{ color: 'var(--text-light)' }}>Sign in to Global Speak</p>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    color: "black",
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e2e8f0',
                    backgroundColor: '#f7fafc',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'var(--transition)'
                  }}
                />
              </div>
              
              <div>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    color: "black",
                    backgroundColor: '#f7fafc',
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'var(--transition)'
                  }}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                style={{    
                  width: '100%', 
                  backgroundColor: loading ? "#ccc" : "#5e17eb",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "50px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "var(--transition)",
                  textDecoration: "none",
                  display: "inline-block",
                  boxShadow: "var(--shadow)",
                  color: "white"
                }}
              >
                {loading ? 'Connexion...' : 'Log In'}
              </button>
            </form>

            {/* Comptes de démo */}
            <div style={{ 
              marginTop: '2rem', 
              padding: '1rem',
              background: '#f0f9ff',
              borderRadius: '10px',
              fontSize: '0.875rem'
            }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>Comptes de démo :</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Admin:</strong> admin@globalspeak.com / admin123</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Student:</strong> john@email.com / student123</p>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p style={{ color: 'var(--text-light)' }}>
                Don't have an account? <a href="/signup" style={{ color: '#5e17eb' }}>Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Login;