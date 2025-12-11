// frontend/src/pages/MyCourses.jsx
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { studentsAPI } from '../services/api';

function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrolledCourses();
  }, []);

  const loadEnrolledCourses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;
      
      const data = await studentsAPI.getMyCourses(user.id);
      setEnrolledCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
      // Fallback data
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async (enrollmentId) => {
    try {
      await studentsAPI.removeEnrollment(enrollmentId);
      setEnrolledCourses(prev => prev.filter(course => course.id !== enrollmentId));
      alert('Course removed successfully!');
    } catch (error) {
      console.error('Error removing course:', error);
      alert('Error removing course');
    }
  };

  const removeAllCourses = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous désinscrire de tous les cours ?')) {
      enrolledCourses.forEach(course => removeCourse(course.id));
    }
  };

  const toggleFavorite = (courseId) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  if (loading) {
    return (
      <div>
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
            <div>Chargement de vos cours...</div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <section className="section">
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem'
          }}>
            <h1 className="section-title" style={{ margin: 0 }}>My Courses</h1>
            {enrolledCourses.length > 0 && (
              <button 
                onClick={removeAllCourses}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Remove All
              </button>
            )}
          </div>

          {enrolledCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <h3 style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
                No courses enrolled yet
              </h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Enroll in courses to see them here!
              </p>
              <a href="/courses" className="btn">Browse Courses</a>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                {enrolledCourses.map((course) => (
                  <div key={course.id} style={{ position: 'relative' }}>
                    <CourseCard 
                      course={{
                        id: course.id,
                        icon: course.flag_icon,
                        title: course.title,
                        language: course.language_name,
                        description: course.description,
                        teacher: course.teacher || `${course.teacher_first_name || ''} ${course.teacher_last_name || ''}`,
                        duration: course.duration || `${course.duration_weeks || ''} weeks`,
                        price: course.price || `${course.price || ''} DA`,
                        enrolledDate: course.enrolled_date
                      }}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.includes(course.id)}
                    />
                    <button 
                      onClick={() => removeCourse(course.id)}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div style={{
                background: 'var(--secondary-beige)',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h3>Total Enrolled Courses: {enrolledCourses.length}</h3>
                <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
                  Dernière mise à jour: {new Date().toLocaleDateString()}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyCourses;