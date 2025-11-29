-- Création de la base de données
CREATE DATABASE IF NOT EXISTS global_speak;
USE global_speak;

-- Table des utilisateurs (unifiée pour tous les rôles)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher', 'admin') NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des langues (pour les flags et les cours)
CREATE TABLE languages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    flag_icon VARCHAR(255), -- chemin vers l'image du drapeau
    is_active BOOLEAN DEFAULT TRUE
);

-- Table des enseignants (informations spécifiques)
CREATE TABLE teachers (
    id INT PRIMARY KEY,
    language_id INT NOT NULL,
    experience VARCHAR(50),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Table des cours
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_weeks INT NOT NULL,
    level ENUM('Beginner', 'Intermediate', 'Advanced', 'Intensive', 'Business') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT FALSE, -- pour l'approbation admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Table des inscriptions aux cours
CREATE TABLE enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'completed') DEFAULT 'active',
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id)
);

-- Table des favoris
CREATE TABLE favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (student_id, course_id)
);

-- Table des paiements
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Table des revenus (calcul automatique des bénéfices)
CREATE TABLE earnings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    course_id INT NOT NULL,
    student_id INT NOT NULL,
    course_price DECIMAL(10,2) NOT NULL,
    weeks_count INT NOT NULL,
    admin_benefits DECIMAL(10,2) NOT NULL, -- 500 DA par semaine
    teacher_earnings DECIMAL(10,2) NOT NULL, -- prix - admin_benefits
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Insertion des données de base

-- Langues avec chemins des drapeaux
INSERT INTO languages (name, flag_icon) VALUES
('Spanish', '/flag_country/Flag-Spain.webp'),
('French', '/flag_country/Flag_France.svg.webp'),
('English', '/flag_country/Flag_england.svg.webp'),
('German', '/flag_country/Flag-Germany.webp'),
('Chinese', '/flag_country/Flag-China.webp'),
('Arabic', '/flag_country/Flag-Arabic.webp'),
('Italian', '/flag_country/Flag-Italy.webp'),
('Portuguese', '/flag_country/Flag-Portugal.webp');

-- Admin par défaut
INSERT INTO users (email, password, role, first_name, last_name, phone) VALUES
('admin@globalspeak.com', '$2b$10$admin123hashed', 'admin', 'Global', 'Admin', '0550000000');

-- Enseignants
INSERT INTO users (email, password, role, first_name, last_name, phone) VALUES
('carlos@globalspeak.com', '$2b$10$teacher1hashed', 'teacher', 'Carlos', 'Rodriguez', '0554445566'),
('marie@globalspeak.com', '$2b$10$teacher2hashed', 'teacher', 'Marie', 'Dubois', '0557778888'),
('sarah@globalspeak.com', '$2b$10$teacher3hashed', 'teacher', 'Sarah', 'Johnson', '0559990000');

INSERT INTO teachers (id, language_id, experience, bio) VALUES
(2, 1, '5-10 years', 'Native Spanish speaker with 8 years of teaching experience. Specialized in immersive learning methods.'),
(3, 2, '3-5 years', 'Passionate French teacher from Paris. Focus on conversational skills and cultural immersion.'),
(4, 3, '10+ years', 'Certified English teacher with business background. Expert in professional communication.');

-- Étudiants
INSERT INTO users (email, password, role, first_name, last_name, phone) VALUES
('john@email.com', '$2b$10$student1hashed', 'student', 'John', 'Doe', '0551234567'),
('sarah@email.com', '$2b$10$student2hashed', 'student', 'Sarah', 'Smith', '0557654321'),
('ahmed@email.com', '$2b$10$student3hashed', 'student', 'Ahmed', 'Benali', '0551112233');

-- Cours (certains approuvés, d'autres en attente)
INSERT INTO courses (teacher_id, language_id, title, description, price, duration_weeks, level, is_approved) VALUES
(2, 1, 'Spanish – Intensive', 'Immersive daily sessions to boost fluency fast. Includes cultural lessons.', 2000, 4, 'Intensive', TRUE),
(2, 1, 'Spanish – Advanced', 'Advanced grammar and conversation practice for fluent speakers.', 2500, 8, 'Advanced', TRUE),
(3, 2, 'French – Beginner', 'Start your French journey with basic vocabulary and pronunciation.', 1800, 6, 'Beginner', TRUE),
(4, 3, 'English – Business', 'Master professional communication for career advancement.', 2500, 6, 'Business', TRUE),
(2, 1, 'German – Advanced', 'Advanced German course for professionals', 2200, 8, 'Advanced', FALSE); -- En attente d'approbation

-- Inscriptions
INSERT INTO enrollments (student_id, course_id, status) VALUES
(5, 1, 'active'),
(5, 3, 'active'),
(6, 4, 'completed'),
(7, 2, 'active');

-- Favoris
INSERT INTO favorites (student_id, course_id) VALUES
(5, 2),
(6, 1),
(7, 4);

-- Paiements
INSERT INTO payments (student_id, course_id, amount) VALUES
(5, 1, 2000),
(5, 3, 1800),
(6, 4, 2500),
(7, 2, 2500);

-- Revenus (calculés automatiquement: admin_benefits = weeks * 500)
INSERT INTO earnings (teacher_id, course_id, student_id, course_price, weeks_count, admin_benefits, teacher_earnings) VALUES
(2, 1, 5, 2000, 4, 2000, 0),      -- 4 semaines * 500 = 2000
(3, 3, 5, 1800, 6, 3000, -1200),   -- 6 semaines * 500 = 3000
(4, 4, 6, 2500, 6, 3000, -500),    -- 6 semaines * 500 = 3000
(2, 2, 7, 2500, 8, 4000, -1500);   -- 8 semaines * 500 = 4000

-- Vues utiles pour les dashboards

-- Vue pour le dashboard admin
CREATE VIEW admin_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students,
    (SELECT COUNT(*) FROM teachers WHERE is_active = TRUE) as total_teachers,
    (SELECT COUNT(*) FROM courses WHERE is_approved = FALSE) as pending_courses,
    (SELECT SUM(admin_benefits) FROM earnings) as total_admin_benefits;

-- Vue pour le dashboard teacher
CREATE VIEW teacher_courses_summary AS
SELECT 
    t.id as teacher_id,
    u.first_name,
    u.last_name,
    l.name as language,
    COUNT(DISTINCT e.student_id) as total_students,
    COUNT(DISTINCT c.id) as total_courses,
    COALESCE(SUM(earn.teacher_earnings), 0) as total_earnings,
    COALESCE(SUM(earn.admin_benefits), 0) as total_admin_benefits
FROM teachers t
JOIN users u ON t.id = u.id
JOIN languages l ON t.language_id = l.id
LEFT JOIN courses c ON t.id = c.teacher_id AND c.is_approved = TRUE
LEFT JOIN enrollments e ON c.id = e.course_id
LEFT JOIN earnings earn ON t.id = earn.teacher_id
GROUP BY t.id, u.first_name, u.last_name, l.name;

-- Index pour les performances
CREATE INDEX idx_courses_teacher ON courses(teacher_id);
CREATE INDEX idx_courses_language ON courses(language_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_earnings_teacher ON earnings(teacher_id);