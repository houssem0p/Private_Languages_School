// frontend/src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { authAPI } from '../services/api';
import '../styles/animations.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.signup(formData);
      
      if (response.success) {
        alert('Account created successfully!');
        navigate('/login');
      } else {
        alert(response.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup error: ' + error.message);
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
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Sign Up</h1>
              <p style={{ color: 'var(--text-light)' }}>Create your Global Speak account</p>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{
                    color: "black",
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e2e8f0',
                    backgroundColor: '#f7fafc',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{
                    color: "black",
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e2e8f0',
                    backgroundColor: '#f7fafc',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
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
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    color: "black",
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e2e8f0',
                    backgroundColor: '#f7fafc',
                    borderRadius: '10px',
                    fontSize: '1rem'
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
                  minLength="6"
                  style={{
                    color: "black",
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e2e8f0',
                    backgroundColor: '#f7fafc',
                    borderRadius: '10px',
                    fontSize: '1rem'
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
                {loading ? 'Inscription...' : 'Sign Up'}
              </button>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p style={{ color: 'var(--text-light)' }}>
                Already have an account? <a href="/login" style={{ color: '#5e17eb' }}>Log in</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Signup;