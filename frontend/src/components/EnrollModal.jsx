import { useState, useEffect } from 'react';
import { studentsAPI } from '../services/api';
import '../styles/animations.css';

function EnrollModal({ isOpen, onClose, course, onEnrollSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    level: 'A1'
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Dans la fonction handleSubmit de EnrollModal.jsx, modifiez :
    // handleSubmit modifié :
    const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login first');
      return;
    }
    
    console.log('Enrolling user:', user.id, 'to course:', course.id);
    
    // Appeler l'API d'inscription
    const response = await studentsAPI.enroll(user.id, course.id);
    
    if (response.success) {
      alert('Successfully enrolled in course!');
      
      // Appeler le callback de succès
      if (onEnrollSuccess) {
        onEnrollSuccess({ ...formData, courseId: course.id });
      }
      
      onClose();
      
      // Rediriger vers My Courses
      setTimeout(() => {
        window.location.href = '/my-courses';
      }, 1000);
    } else {
      alert('Error: ' + response.error);
    }
  } catch (error) {
    console.error('Enrollment error:', error);
    alert('Error enrolling in course: ' + error.message);
  }
};

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }} className="fade-in-up">
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            color: 'var(--text-dark)',
            margin: 0
          }}>
            register in this course
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--text-light)'
            }}
          >
            ×
          </button>
        </div>

        <div style={{
          background: 'var(--secondary-beige)',
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>
            {course.title}
          </h3>
          <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.9rem' }}>
            Language: {course.language}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--text-dark)'
              }}>
                FirstName *
              </label>
              <input 
                type="text" 
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                style={{
                  color: "black",
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--text-dark)'
              }}>
                LastName *
              </label>
              <input 
                type="text" 
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                style={{
                  color: "black",
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text-dark)'
            }}>
              Phone Number *
            </label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="0X XX XX XX XX"
              style={{
                color: "black",
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <small style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
              10 Digits required
            </small>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text-dark)'
            }}>
              Address
            </label>
            <input 
              type="text" 
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{
                color: "black",
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text-dark)'
            }}>
              Level *
            </label>
            <select 
              required
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              style={{
                color: "black",
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              <option value="A1">A1 - Débutant</option>
              <option value="A2">A2 - Élémentaire</option>
              <option value="B1">B1 - Intermédiaire</option>
              <option value="B2">B2 - Intermédiaire avancé</option>
              <option value="C1">C1 - Avancé</option>
              <option value="C2">C2 - Maîtrise</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button 
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid var(--text-light)',
                backgroundColor: 'transparent',
                borderRadius: '8px',
                color: 'var(--text-light)',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn"
              style={{
                padding: '0.75rem 1.5rem'
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnrollModal;