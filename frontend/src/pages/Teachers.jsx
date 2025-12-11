// frontend/src/pages/Teachers.jsx
import { useState, useEffect } from 'react';
import TeacherCard from '../components/TeacherCard';
import Footer from '../components/Footer';
import { teachersAPI } from '../services/api';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      console.log('Chargement des enseignants depuis API...');
      const data = await teachersAPI.getAll();
      console.log('Enseignants chargés:', data);
      setTeachers(data);
    } catch (error) {
      console.error('Error loading teachers:', error);
      alert('Erreur lors du chargement des enseignants');
      // Fallback vers les données simulées
      setTeachers([
        {
          id: 1,
          first_name: 'Carlos',
          last_name: 'Rodriguez',
          language: 'Spanish',
          experience: '8 years',
          bio: 'Native Spanish speaker with 8 years of teaching experience.'
        },
        {
          id: 2,
          first_name: 'Marie',
          last_name: 'Dubois',
          language: 'French', 
          experience: '6 years',
          bio: 'Passionate French teacher from Paris.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
            <div>Chargement des enseignants...</div>
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
            Our Expert Teachers
          </h1>
          <p style={{
            textAlign: 'center',
            fontSize: '1.125rem',
            color: 'var(--text-light)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Meet our passionate native speakers dedicated to making your language learning journey successful
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }} className="stagger-animation">
            {teachers.map((teacher) => (
              <TeacherCard 
                key={teacher.id}
                teacher={{
                  id: teacher.id,
                  name: teacher.name || `${teacher.first_name || ''} ${teacher.last_name || ''}`,
                  languages: teacher.languages || teacher.language,
                  experience: teacher.experience,
                  bio: teacher.bio,
                  quote: teacher.quote || teacher.bio,
                  img: teacher.img || teacher.image_url
                }}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Teachers;