import { useState } from 'react';
import { teachersAPI } from '../../services/api';

function CreateTeacher() {
  const [formData, setFormData] = useState({
    name: '',
    languages: '',
    experience: '',
    bio: '',
    quote: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.role !== 'admin') {
        alert('Admin access only');
        return;
      }

      const response = await teachersAPI.create(formData);
      
      if (response.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: '',
          languages: '',
          experience: '',
          bio: '',
          quote: '',
          image_url: ''
        });
        
        setTimeout(() => setSuccess(false), 3000);
        alert('Teacher created successfully!');
      }
    } catch (error) {
      console.error('Error creating teacher:', error);
      alert('Error creating teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create New Teacher</h2>
      
      {success && (
        <div style={{ background: '#10b981', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          Teacher created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Name *</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Languages *</label>
          <input 
            type="text" 
            required
            placeholder="e.g., English, French, Spanish"
            value={formData.languages}
            onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Experience</label>
          <input 
            type="text" 
            placeholder="e.g., 5 years"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Bio</label>
          <textarea 
            rows="3"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Quote</label>
          <textarea 
            rows="2"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Image URL</label>
          <input 
            type="text" 
            placeholder="Optional: URL to teacher image"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: loading ? '#9ca3af' : '#4f46e5', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {loading ? 'Creating...' : 'Create Teacher'}
        </button>
      </form>
    </div>
  );
}

export default CreateTeacher;