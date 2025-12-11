import '../styles/animations.css';

function TeacherCard({ teacher }) {
  return (
    <div className="fade-in-up" style={{
      background: 'var(--white)',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: 'var(--shadow)',
      transition: 'var(--transition)',
      textAlign: 'center'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        background: 'var(--secondary-beige)',
        borderRadius: '50%',
        margin: '0 auto 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem'
      }}>
        <img src={teacher.img} alt="no image" style={{width: "90px", height: "50px"}} />
      </div>
      
      <h3 style={{ marginBottom: '0.5rem' }}>{teacher.name}</h3>
      <p style={{ 
        color: '#5e17eb', 
        marginBottom: '1rem',
        fontWeight: '600'
      }}>
        {teacher.languages}
      </p>
      
      <p style={{ 
        color: 'var(--text-light)', 
        marginBottom: '1rem',
        fontSize: '0.875rem'
      }}>
        Experience: {teacher.experience}
      </p>
      
      <p style={{ 
        fontStyle: 'italic',
        color: 'var(--text-light)',
        marginBottom: '1.5rem',
        fontSize: '0.875rem'
      }}>
        "{teacher.quote}"
      </p>
      
      <button className="btn" style={{ padding: '0.5rem 1.5rem' }}>
        Book Lesson
      </button>
    </div>
  );
}

export default TeacherCard;