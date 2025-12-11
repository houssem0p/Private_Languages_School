import { useState, useEffect } from 'react';
import { teachersAPI } from '../../services/api';

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const data = await teachersAPI.getAll();
      // Backend returns array of teacher objects
      setTeachers(data);
    } catch (error) {
      console.error('Error loading teachers:', error);
      // Fallback to simulated data
      setTeachers([
        {
          id: 1,
          name: 'Carlos Rodriguez',
          email: 'carlos@globalspeak.com',
          languages: 'Spanish',
          phone: '0554445566',
          students: 15,
          activeCourses: 3,
          totalEarnings: 45000,
          adminBenefits: 30000,
          joinDate: '2024-01-01',
          status: 'active'
        },
        {
          id: 2,
          name: 'Marie Dubois',
          email: 'marie@globalspeak.com',
          languages: 'French',
          phone: '0557778888',
          students: 12,
          activeCourses: 2,
          totalEarnings: 36000,
          adminBenefits: 24000,
          joinDate: '2024-01-05',
          status: 'active'
        }
      ]);
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (teacher.languages || teacher.language || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTeacherEarnings = (teacher) => {
    return teacher.totalEarnings - teacher.adminBenefits;
  };

  const deactivateTeacher = (teacherId) => {
    setTeachers(prev => prev.map(teacher =>
      teacher.id === teacherId 
        ? { ...teacher, status: 'inactive' }
        : teacher
    ));
  };

  const activateTeacher = (teacherId) => {
    setTeachers(prev => prev.map(teacher =>
      teacher.id === teacherId 
        ? { ...teacher, status: 'active' }
        : teacher
    ));
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2>Teachers Management</h2>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              color: "black",
              backgroundColor: "#eeeeee",
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              width: '300px'
            }}
          />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} style={{
            background: 'var(--white)',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: 'var(--shadow)',
            border: teacher.status === 'inactive' ? '2px solid #ef4444' : '2px solid transparent'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{teacher.name}</h3>
                <span style={{
                  padding: '0.3rem 0.8rem',
                  background: teacher.status === 'active' ? '#10b981' : '#ef4444',
                  color: 'white',
                  borderRadius: '15px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {teacher.status}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold',
                  color: '#202057ff'
                }}>
                  {teacher.languages || teacher.language}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p><strong>Email:</strong> {teacher.email}</p>
              <p><strong>Phone:</strong> {teacher.phone}</p>
              <p><strong>Join Date:</strong> {teacher.joinDate}</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  {teacher.students}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Students</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  {teacher.activeCourses}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Courses</div>
              </div>
            </div>

            <div style={{
              background: 'var(--secondary-beige)',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span>Teacher Earnings:</span>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                  {calculateTeacherEarnings(teacher)} DA
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span>Admin Benefits:</span>
                <span style={{ fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                  {teacher.adminBenefits} DA
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                <span>Total Revenue:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {teacher.totalEarnings} DA
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {teacher.status === 'active' ? (
                <button 
                  onClick={() => deactivateTeacher(teacher.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Deactivate
                </button>
              ) : (
                <button 
                  onClick={() => activateTeacher(teacher.id)}
                  className="btn"
                  style={{ flex: 1 }}
                >
                  Activate
                </button>
              )}
              <button 
                onClick={async () => {
                  if (!window.confirm('Are you sure you want to delete this teacher?')) return;
                  try {
                    const response = await teachersAPI.remove(teacher.id);
                    if (response && response.success) {
                      setTeachers(prev => prev.filter(t => t.id !== teacher.id));
                      alert('Teacher deleted successfully');
                    } else {
                      alert('Error deleting teacher: ' + (response?.error || 'Unknown'));
                    }
                  } catch (err) {
                    console.error('Delete teacher error:', err);
                    alert('Error deleting teacher');
                  }
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div style={{ 
          padding: '3rem', 
          textAlign: 'center', 
          color: 'var(--text-light)' 
        }}>
          No teachers found
        </div>
      )}
    </div>
  );
}

export default TeachersList;