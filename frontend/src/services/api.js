const API_BASE_URL = 'http://localhost/Private_Languages_School/backend/api';

// Fonction helper pour les appels API
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return data;
    } catch (parseErr) {
      console.error('API returned non-JSON response', { status: response.status, text });
      // Re-throw with more context so UI can display something useful
      const err = new Error('Invalid JSON response from API');
      err.responseText = text;
      err.status = response.status;
      throw err;
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (email, password) => 
    apiRequest('login.php', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (userData) =>
    apiRequest('signup.php', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};

// Courses API
export const coursesAPI = {
  getAll: () => apiRequest('courses.php'),
  
  create: (courseData) =>
    apiRequest('courses.php', {
      method: 'POST',
      body: JSON.stringify(courseData),
    }),
};

// Teachers API
export const teachersAPI = {
  getAll: () => apiRequest('teachers.php'),
  create: (teacherData) =>
    apiRequest('teachers.php', {
      method: 'POST',
      body: JSON.stringify(teacherData),
    }),
  remove: (teacherId) =>
    apiRequest(`teachers.php?teacherId=${teacherId}`, {
      method: 'DELETE'
    }),
};

// Students API
export const studentsAPI = {
  enroll: (studentId, courseId) =>
    apiRequest('enroll.php', {
      method: 'POST',
      body: JSON.stringify({ studentId, courseId }),
    }),

  getMyCourses: (studentId) =>
    apiRequest(`mycourses.php?studentId=${studentId}`),

  removeEnrollment: (enrollmentId) =>
    apiRequest('enroll.php', {
      method: 'DELETE',
      body: JSON.stringify({ enrollmentId }),
    }),
};

// Admin API
export const adminAPI = {
  getDashboard: () =>
    apiRequest('admin.php?action=dashboard'),

  getStudents: () =>
    apiRequest('admin.php?action=students'),

  getEnrollments: () =>
    apiRequest('admin.php?action=enrollments'),

  getTeachers: () =>
    apiRequest('admin.php?action=teachers'),
};

// Favorites API
export const favoritesAPI = {
  getFavorites: (studentId) =>
    apiRequest(`favorites.php?studentId=${studentId}`),

  addFavorite: (studentId, courseId) =>
    apiRequest('favorites.php', {
      method: 'POST',
      body: JSON.stringify({ studentId, courseId }),
    }),

  removeFavorite: (studentId, courseId) =>
    apiRequest('favorites.php', {
      method: 'DELETE',
      body: JSON.stringify({ studentId, courseId }),
    }),
};

export const uploadAPI = {
  uploadFlag: (formData) =>
    fetch(`${API_BASE_URL}/upload.php`, {
      method: 'POST',
      body: formData
    }).then(res => res.json()),
};