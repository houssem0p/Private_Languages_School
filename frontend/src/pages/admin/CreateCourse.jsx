import { useState, useEffect } from 'react';
import { coursesAPI, teachersAPI } from '../../services/api';

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teacher_id: '',
    language: '',
    price: '',
    duration_weeks: '',
    level: 'Beginner',
    flag_icon: ''
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const data = await teachersAPI.getAll();
      setTeachers(data);
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.role !== 'admin') {
        alert('Admin access only');
        return;
      }

      // Validation
      if (!formData.title || !formData.language || !formData.price || !formData.duration_weeks) {
        alert('Please fill all required fields');
        return;
      }

      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
        duration_weeks: parseInt(formData.duration_weeks),
        teacher_id: formData.teacher_id ? parseInt(formData.teacher_id) : null
      };

      const response = await coursesAPI.create(courseData);
      
      if (response.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: '',
          description: '',
          teacher_id: '',
          language: '',
          price: '',
          duration_weeks: '',
          level: 'Beginner',
          flag_icon: ''
        });
        
        setTimeout(() => setSuccess(false), 3000);
        alert('Course created successfully!');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course');
    } finally {
      setLoading(false);
    }
  };

  const flagIcons = {
    Spanish: '/flag_country/Flag-Spain.webp',
    French: '/flag_country/Flag_France.svg.webp',
    English: '/flag_country/Flag_england.svg.webp',
    German: '/flag_country/Flag-Germany.webp',
    Chinese: '/flag_country/Flag-China.webp',
    Arabic: '/flag_country/Flag-Arabic.webp'
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create New Course</h2>
      
      {success && (
        <div style={{ background: '#10b981', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          Course created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Course Title *</label>
          <input 
            type="text" 
            required
            placeholder="e.g., Spanish Intensive Course"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Language *</label>
          <select 
            required
            value={formData.language}
            onChange={(e) => setFormData({ 
              ...formData, 
              language: e.target.value,
              flag_icon: flagIcons[e.target.value] || ''
            })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          >
            <option value="">Select Language</option>
            {Object.keys(flagIcons).map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Teacher</label>
          <select 
            value={formData.teacher_id}
            onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          >
            <option value="">Select Teacher (Optional)</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Price (DA) *</label>
            <input 
              type="number" 
              required
              min="0"
              step="100"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Weeks *</label>
            <input 
              type="number" 
              required
              min="1"
              value={formData.duration_weeks}
              onChange={(e) => setFormData({ ...formData, duration_weeks: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Level</label>
          <select 
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Intensive">Intensive</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
          <textarea 
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#eeeeee', color: 'black' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Flag Icon URL</label>
          <input 
            type="text" 
            value={formData.flag_icon}
            onChange={(e) => setFormData({ ...formData, flag_icon: e.target.value })}
            placeholder="Will auto-fill based on language"
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
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;