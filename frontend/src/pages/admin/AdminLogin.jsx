import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { authAPI } from '../../services/api';

function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);
      
      if (response.success && response.user.role === 'admin') {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        navigate('/admin/dashboard');
        alert('Admin login successful!');
      } else {
        alert('Admin access only');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Login</h1>
            <p style={{ color: '#6b7280' }}>Access admin dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <input 
                type="email" 
                placeholder="Admin Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: '100%', padding: '1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
              />
            </div>
            
            <div>
              <input 
                type="password" 
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                style={{ width: '100%', padding: '1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                background: loading ? '#9ca3af' : '#4f46e5', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '1rem', 
                fontWeight: '600', 
                cursor: loading ? 'not-allowed' : 'pointer' 
              }}
            >
              {loading ? 'Logging in...' : 'Login as Admin'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <p>Demo: admin@globalspeak.com / admin123</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AdminLogin;