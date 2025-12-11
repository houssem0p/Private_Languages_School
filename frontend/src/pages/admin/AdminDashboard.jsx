import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { adminAPI, studentsAPI, teachersAPI } from '../../services/api';
import CreateTeacher from './CreateTeacher';
import CreateCourse from './CreateCourse';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    loadDashboardData();
  }, [navigate]);

  const deleteEnrollment = async (enrollmentId) => {
    if (window.confirm('Are you sure you want to delete this enrollment?')) {
      try {
        const response = await studentsAPI.removeEnrollment(enrollmentId);
        if (response.success) {
          alert('Enrollment deleted successfully');
          // Recharger les données
          loadDashboardData();
        }
      } catch (error) {
        console.error('Error deleting enrollment:', error);
        alert('Error deleting enrollment');
      }
    }
  };

  const loadDashboardData = async () => {
    try {
      const [statsData, studentsData, enrollmentsData, teachersData] = await Promise.all([
        adminAPI.getDashboard(),
        adminAPI.getStudents(),
        adminAPI.getEnrollments(),
        adminAPI.getTeachers()
      ]);
      
      if (statsData.success) setStats(statsData.stats);
      if (studentsData.success) setStudents(studentsData.students);
      if (enrollmentsData.success) setEnrollments(enrollmentsData.enrollments);
      if (teachersData.success) setTeachers(teachersData.teachers);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  // Format numbers
  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num || 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header style={{ background: 'white', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Admin Dashboard</h1>
          <button onClick={logout} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '1rem' }}>
          {['overview', 'students', 'enrollments', 'teachers' ,'create-teacher', 'create-course'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.5rem 1rem',
                background: activeTab === tab ? '#4f46e5' : 'transparent',
                color: activeTab === tab ? 'white' : '#374151',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>Total Students</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{formatNumber(stats.total_students)}</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>Total Teachers</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{formatNumber(stats.total_teachers)}</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>Total Revenue</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{formatNumber(stats.total_revenue)} DA</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>Total Benefits</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{formatNumber(stats.total_benefits)} DA</p>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <h2>Students List ({students.length})</h2>
            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f3f4f6' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Phone</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Level</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem' }}>{student.first_name} {student.last_name}</td>
                      <td style={{ padding: '1rem' }}>{student.email}</td>
                      <td style={{ padding: '1rem' }}>{student.phone}</td>
                      <td style={{ padding: '1rem' }}>{student.level}</td>
                      <td style={{ padding: '1rem' }}>{new Date(student.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Enrollments Tab */}
        {activeTab === 'enrollments' && (
          <div>
            <h2>All Enrollments ({enrollments.length})</h2>
            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f3f4f6' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Student</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Course</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Language</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Benefits</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Enrolled Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(enrollment => (
                    <tr key={enrollment.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem' }}>{enrollment.student_first_name} {enrollment.student_last_name}</td>
                      <td style={{ padding: '1rem' }}>{enrollment.course_title}</td>
                      <td style={{ padding: '1rem' }}>{enrollment.course_language}</td>
                      <td style={{ padding: '1rem' }}>{formatNumber(enrollment.course_price)} DA</td>
                      <td style={{ padding: '1rem' }}>{formatNumber(enrollment.admin_benefits)} DA</td>
                      <td style={{ padding: '1rem' }}>{new Date(enrollment.enrolled_date).toLocaleDateString()}</td>
                      
                      <td style={{ padding: '1rem' }}>
                       <button 
                          onClick={() => deleteEnrollment(enrollment.id)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Teachers Tab */}
        {activeTab === 'teachers' && (
          <div>
            <h2>Teachers List ({teachers.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {teachers.map(teacher => (
                <div key={teacher.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'relative' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{teacher.name}</h3>
                  <p style={{ color: '#4f46e5', fontWeight: '600', margin: '0 0 0.5rem 0' }}>{teacher.languages}</p>
                  <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>Experience: {teacher.experience}</p>
                  <p style={{ color: '#6b7280', fontStyle: 'italic', margin: 0 }}>"{teacher.quote}"</p>
                  <button
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this teacher?')) {
                        const response = await teachersAPI.remove(teacher.id);
                        if (response.success) {
                          alert('Teacher deleted successfully');
                          loadDashboardData();
                        } else {
                          alert('Error deleting teacher: ' + (response.error || 'Unknown error'));
                        }
                      }
                    }}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'create-teacher' && <CreateTeacher />}
        {activeTab === 'create-course' && <CreateCourse />}
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard;