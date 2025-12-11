import { useState, useEffect } from 'react';

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Données simulées
    setStudents([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@email.com',
        phone: '0551234567',
        enrolledCourses: [
          { name: 'Spanish Intensive', enrolledDate: '2024-01-15', status: 'active' },
          { name: 'French Beginner', enrolledDate: '2024-01-20', status: 'active' }
        ],
        joinDate: '2024-01-15',
        totalSpent: 3800
      },
      {
        id: 2,
        name: 'Sarah Smith',
        email: 'sarah@email.com',
        phone: '0557654321',
        enrolledCourses: [
          { name: 'English Business', enrolledDate: '2024-01-10', status: 'completed' }
        ],
        joinDate: '2024-01-10',
        totalSpent: 2500
      },
      {
        id: 3,
        name: 'Ahmed Benali',
        email: 'ahmed@email.com',
        phone: '0551112233',
        enrolledCourses: [
          { name: 'Arabic Modern', enrolledDate: '2024-01-18', status: 'active' }
        ],
        joinDate: '2024-01-18',
        totalSpent: 2300
      }
    ]);
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAdminBenefitsFromStudent = (student) => {
    let benefits = 0;
    student.enrolledCourses.forEach(course => {
      const weeks = course.name.includes('Intensive') ? 4 : 
                   course.name.includes('Beginner') ? 6 : 8;
      benefits += weeks * 500;
    });
    return benefits;
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2>Students Management</h2>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              color: "black",
              backgroundColor: "#eeeeee",
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              width: '300px'
            }}
          />
        </div>
      </div>

      <div style={{
        background: 'var(--white)',
        borderRadius: '15px',
        boxShadow: 'var(--shadow)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--secondary-beige)' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Student</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Contact</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Enrolled Courses</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Total Spent</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Admin Benefits</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem' }}>
                  <div>
                    <strong>{student.name}</strong>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div>{student.email}</div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                    {student.phone}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  {student.enrolledCourses.map((course, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.25rem'
                    }}>
                      <span>{course.name}</span>
                      <span style={{
                        padding: '0.2rem 0.5rem',
                        background: course.status === 'active' ? '#10b981' : '#6b7280',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '0.75rem'
                      }}>
                        {course.status}
                      </span>
                    </div>
                  ))}
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                  {student.totalSpent} DA
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>
                  {calculateAdminBenefitsFromStudent(student)} DA
                </td>
                <td style={{ padding: '1rem' }}>
                  {student.joinDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div style={{ 
            padding: '3rem', 
            textAlign: 'center', 
            color: 'var(--text-light)' 
          }}>
            No students found
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'var(--secondary-beige)',
        borderRadius: '15px'
      }}>
        <div>
          <strong>Total Students:</strong> {students.length}
        </div>
        <div>
          <strong>Total Admin Benefits:</strong> {students.reduce((total, student) => 
            total + calculateAdminBenefitsFromStudent(student), 0
          )} DA
        </div>
        <div>
          <strong>Total Revenue:</strong> {students.reduce((total, student) => 
            total + student.totalSpent, 0
          )} DA
        </div>
      </div>
    </div>
  );
}

export default StudentsList;