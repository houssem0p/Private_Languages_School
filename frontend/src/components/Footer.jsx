import '../styles/animations.css';

function Footer() {
  return (
    <footer style={{
      background: 'var(--text-dark)',
      color: 'var(--white)',
      padding: '4rem 0 2rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div className="fade-in-up">
            <img src="/footer_logo.png" alt="Global Speak" style={{
                width: '185px',
                height: '90px'
            }} />
            <p style={{ color: '#a0aec0', lineHeight: '1.6' }}>
              Unlock your world with language learning. Interactive courses taught by native speakers.
            </p>
          </div>
          
          <div className="fade-in-up">
            <h4 style={{ marginBottom: '1rem' }}>Languages</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#a0aec0' }}>
              <span>English</span>
              <span>Spanish</span>
              <span>French</span>
              <span>German</span>
              <span>Chinese</span>
            </div>
          </div>
          
          <div className="fade-in-up">
            <h4 style={{ marginBottom: '1rem' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#a0aec0' }}>
              <span>About Us</span>
              <span>Teachers</span>
              <span>Careers</span>
              <span>Contact</span>
            </div>
          </div>
          
          <div className="fade-in-up">
            <h4 style={{ marginBottom: '1rem' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#a0aec0' }}>
              <span>Help Center</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #4a5568',
          paddingTop: '2rem',
          textAlign: 'center',
          color: '#a0aec0'
        }}>
          <p>&copy; 2025 Global Speak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;