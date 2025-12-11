import '../styles/animations.css';

function Hero() {
  return (
    <section style={{
      background: 'linear(135deg, var(--primary-beige) 0%, var(--secondary-beige) 100%)',
      padding: '120px 0 80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <div className="fade-in-up">
            <h1 style={{
                fontSize: '3.5rem',
                lineHeight: '1.2',
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #4304c0ff, #b977f8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Unlock Your World with Global Speak Language
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--text-light)',
              marginBottom: '2.5rem',
              lineHeight: '1.6'
            }}>
              Interactive and modern courses taught by native speakers. Choose your language, 
              level and schedule — start speaking confidently.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#courses" className="btn">Start Learning</a>
              <a href="#teachers" style={{
                padding: '12px 30px',
                border: '2px solid #23215aff',
                borderRadius: '50px',
                color: '#141345ff',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'var(--transition)'
              }}>
                Meet Teachers
              </a>
            </div>
          </div>
          
          <div className="float" style={{
            background: 'var(--white)',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: 'var(--shadow)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              🗣️
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Speak with Confidence</h3>
            <p style={{ color: 'var(--text-light)' }}>
              Join thousands +1000 of students already learning with us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;