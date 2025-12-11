import { useState } from 'react';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import TeacherCard from '../components/TeacherCard';
import Footer from '../components/Footer';
import '../styles/animations.css';

function Home() {
  const [favorites, setFavorites] = useState([]); 
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const toggleFavorite = (courseId) => { 
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleEnroll = (courseId) => { 
    // Trouver le cours complet à partir de l'ID
    const courseToEnroll = courses.find(course => course.id === courseId);
    if (courseToEnroll && !enrolledCourses.find(course => course.id === courseId)) {
      setEnrolledCourses(prev => [...prev, { ...courseToEnroll, enrolledDate: new Date().toISOString() }]);
    }
  };

  const courses = [
    {
      id: 1,
      icon: '/flag_country/Flag-Spain.webp',
      title: 'Spanish – Intensive',
      language: 'Espagnol',
      description: 'Immersive daily sessions to boost fluency fast. Includes cultural lessons.',
      teacher: 'Carlos Rodriguez',
      duration: '4 weeks',
      price: '2000 DA'
    },
    {
      id: 2,
      icon: '/flag_country/Flag_France.svg.webp',
      title: 'French – Beginner',
      language: 'French',
      description: 'Perfect for starters. Learn basics with interactive conversations.',
      teacher: 'Marie Dubois',
      duration: '6 weeks',
      price: '1800 DA'
    },
    {
      id: 3,
      icon: '/flag_country/Flag_england.svg.webp',
      title: 'English – Business',
      language: 'english',
      description: 'Master professional communication for career advancement.',
      teacher: 'Sarah Johnson',
      duration: '8 weeks',
      price: '2500 DA'
    }
  ];

  const teachers = [
    {
      img: '',
      name: 'Maria Johnson',
      languages: 'English & Business English',
      experience: '8 years',
      quote: 'Loves traveling and cooking international dishes.'
    },
    {
      img: '',
      name: 'Ahmed Hassan',
      languages: 'Arabic & French',
      experience: '6 years',
      quote: 'Passionate about connecting cultures through language.'
    },
    {
      img: '',
      name: 'Wei Zhang',
      languages: 'Chinese & English',
      experience: '5 years',
      quote: 'Believes in making learning fun and practical.'
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Courses Section */}
      <section id="courses" className="section">
        <div className="container">
          <h2 style={{color: "#4a4a4aff", textAlign: "center", fontSize: "40px", marginBottom: "30px"}}>Find the Perfect Language Course</h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.125rem',
            color: 'var(--text-light)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Interactive and modern courses taught by native speakers. Choose your language, 
            level and schedule — start speaking confidently
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }} className="stagger-animation">
            {courses.map((course, index) => (
              <CourseCard
                key={index} 
                course={course}
                onToggleFavorite={toggleFavorite} 
                isFavorite={favorites.includes(course.id)} 
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Teachers Section */}
      <section id="teachers" className="section" style={{
        background: 'var(--white)'
      }}>
        <div className="container">
          <h2 style={{color: "#4a4a4aff", fontSize: "40px", marginBottom: "30px", textAlign: "center"}}>Meet Our Expert Teachers</h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.125rem',
            color: 'var(--text-light)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Learn from passionate native speakers who make language learning fun and effective, 
            personalized lessons tailored to your goals!
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }} className="stagger-animation">
            {teachers.map((teacher, index) => (
              <TeacherCard key={index} teacher={teacher} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <a href="/teachers" className="btn">View All Teachers</a>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section" style={{
        background: 'linear(135deg, var(--secondary-beige) 0%, var(--primary-beige) 100%)'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }} className="fade-in-up">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Ready to Start Learning?
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-light)',
              marginBottom: '2rem'
            }}>
              Book a free trial lesson with one of our expert teachers today and start speaking with confidence!
            </p>
            <a href="/signup" className="btn">Book a Lesson</a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Home;