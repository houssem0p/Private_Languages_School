// frontend/src/pages/Favorites.jsx
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { favoritesAPI } from '../services/api';

function Favorites() {
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      console.log('Chargement des favoris...');
      const studentId = 1; // À remplacer par l'ID de l'utilisateur connecté
      const data = await favoritesAPI.getFavorites(studentId);
      console.log('Favoris chargés:', data);
      setFavoriteCourses(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
      alert('Erreur lors du chargement des favoris');
      // Fallback vers les données simulées
      setFavoriteCourses([
        {
          id: 1,
          title: 'Spanish – Intensive',
          description: 'Immersive daily sessions to boost fluency fast. Includes cultural lessons.',
          teacher_first_name: 'Carlos',
          teacher_last_name: 'Rodriguez',
          language_name: 'Spanish',
          flag_icon: '/flag_country/Flag-Spain.webp',
          price: '2000',
          duration_weeks: 4
        },
        {
          id: 3,
          title: 'English – Business',
          description: 'Master professional communication for career advancement.',
          teacher_first_name: 'Sarah',
          teacher_last_name: 'Johnson',
          language_name: 'English',
          flag_icon: '/flag_country/Flag_england.svg.webp',
          price: '2500',
          duration_weeks: 8
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (courseId) => {
    try {
      const studentId = 1; // À remplacer par l'ID de l'utilisateur connecté
      await favoritesAPI.removeFavorite(studentId, courseId);
      setFavoriteCourses(prev => prev.filter(course => course.id !== courseId));
      alert('Retiré des favoris !');
    } catch (error) {
      console.error('Error removing favorite:', error);
      // Fallback local
      setFavoriteCourses(prev => prev.filter(course => course.id !== courseId));
    }
  };

  if (loading) {
    return (
      <div>
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
            <div>Chargement des favoris...</div>
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
          <h1 className="section-title">My Favorite Courses</h1>

          {favoriteCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <h3 style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
                No favorite courses yet
              </h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Click the heart icon on courses to add them to your favorites!
              </p>
              <a href="/courses" className="btn">Explore Courses</a>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {favoriteCourses.map((course) => (
                <CourseCard 
                  key={course.id}
                  course={{
                    id: course.id,
                    icon: course.icon || course.flag_icon,
                    title: course.title,
                    language: course.language || course.language_name,
                    description: course.description,
                    teacher: course.teacher || `${course.teacher_first_name || ''} ${course.teacher_last_name || ''}`,
                    duration: course.duration || `${course.duration_weeks || ''} weeks`,
                    price: course.price || `${course.price || ''} DA`
                  }}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Favorites;