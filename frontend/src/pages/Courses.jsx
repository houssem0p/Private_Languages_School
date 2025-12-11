import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import { coursesAPI, favoritesAPI } from '../services/api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      console.log('Chargement des cours depuis API...');
      const data = await coursesAPI.getAll();
      console.log('Cours chargés:', data);
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
      alert('Erreur lors du chargement des cours depuis l\'API');
      // Fallback vers les données simulées
      setCourses([
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
          id: 2,
          title: 'French – Beginner',
          description: 'Perfect for starters. Learn basics with interactive conversations.',
          teacher_first_name: 'Marie',
          teacher_last_name: 'Dubois',
          language_name: 'French',
          flag_icon: '/flag_country/Flag_France.svg.webp',
          price: '1800',
          duration_weeks: 6
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  // Ajoutez ces fonctions
  const loadFavorites = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const data = await favoritesAPI.getFavorites(user.id);
        setFavorites(data.map(fav => fav.id));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (courseId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Please login to add favorites');
        return;
      }
      
      if (favorites.includes(courseId)) {
        await favoritesAPI.removeFavorite(user.id, courseId);
        setFavorites(prev => prev.filter(id => id !== courseId));
      } else {
        await favoritesAPI.addFavorite(user.id, courseId);
        setFavorites(prev => [...prev, courseId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

// Appelez loadFavorites dans useEffect
useEffect(() => {
  loadCourses();
  loadFavorites();
}, []);


  const handleEnroll = (courseId) => {
    const courseToEnroll = courses.find(course => course.id === courseId);
    if (courseToEnroll && !enrolledCourses.find(course => course.id === courseId)) {
      setEnrolledCourses(prev => [...prev, { ...courseToEnroll, enrolledDate: new Date().toISOString() }]);
    }
  };

  if (loading) {
    return (
      <div>
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
            <div>Chargement des cours...</div>
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
          <h1 style={{
            lineHeight: '1.2', 
            background: 'linear-gradient(135deg, #4304c0ff, #b977f8ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', 
            textAlign: "center", 
            fontSize: "40px", 
            marginBottom: "30px",
          }}>
            All Language Courses
          </h1>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }} className="stagger-animation">
            {courses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={{
                  id: course.id,
                  icon: course.icon || course.flag_icon,
                  title: course.title,
                  language: course.language,
                  description: course.description,
                  teacher: course.teacher,
                  duration: course.duration,
                  price: course.price
                }}
                onToggleFavorite={toggleFavorite} 
                isFavorite={favorites.includes(course.id)} 
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Courses;