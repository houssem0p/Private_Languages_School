import { useState } from 'react';
import EnrollModal from './EnrollModal';
import '../styles/animations.css';

function CourseCard({ course, onToggleFavorite, isFavorite = false, onEnroll, onRemove }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLanguageFromCourse = (course) => {
    if (course.title.includes('Spanish')) return 'Spanish';
    if (course.title.includes('French')) return 'French';
    if (course.title.includes('English')) return 'English';
    if (course.title.includes('German')) return 'German';
    if (course.title.includes('Chinese')) return 'Chinese';
    if (course.title.includes('Arabic')) return 'Arabic';
    return course.title.split('–')[0].trim();
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(course.id);
    }
  };

  const handleEnrollSuccess = (formData) => {
    if (onEnroll) {
      onEnroll(course.id);
    }
  };

  return (
    <>
      <div className="fade-in-up" style={{
        background: 'var(--white)',
        borderRadius: '15px',
        padding: '2rem',
        boxShadow: 'var(--shadow)',
        transition: 'var(--transition)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <div style={{
          background: 'var(--secondary-beige)',
          padding: '1rem',
          borderRadius: '10px',
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '2rem'
        }}>
          <img src={course.icon} alt="flag" style={{width: "90px", height: "50px"}} />
        </div>
        
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
          {course.title}
        </h3>
        
        <p style={{ 
          color: 'var(--text-light)', 
          marginBottom: '1.5rem',
          flex: 1
        }}>
          {course.description}
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <span style={{ fontWeight: '600' }}>{course.teacher}</span>
          <span style={{ 
            background: '#2d3748',
            color: 'var(--white)',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.875rem'
          }}>
            {course.duration}
        </span>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Heart icon en bas à gauche */}
          <button 
            className={`btn-heart ${isFavorite ? 'favorite' : ''}`}
            onClick={handleFavoriteClick}
            style={{
              position: 'absolute',
              left: '0',
              bottom: '0'
            }}
          >
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20.503"
              height="20.625"
              viewBox="0 0 17.503 15.625"
            >
              <path
                id="Fill"
                d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
                transform="translate(0 0)"
                fill={isFavorite ? '#ef4444' : 'black'}
              ></path>
            </svg>
          </button>

          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            color: 'var(--text-dark)',
            marginLeft: '67px' 
          }}>
            {course.price}
          </span>
          
          <button 
            className="btn" 
            style={{ padding: '0.5rem 1.5rem' }}
            onClick={() => setIsModalOpen(true)}
          >
            Enroll
          </button>
        </div>
      </div>

      <EnrollModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={{
          ...course,
          language: getLanguageFromCourse(course)
        }}
        onEnrollSuccess={handleEnrollSuccess}
      />
    </>
  );
}

export default CourseCard;