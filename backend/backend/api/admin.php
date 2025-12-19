<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// GET: Récupérer toutes les données admin
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? 'dashboard';
    
    switch ($action) {
        case 'dashboard':
            // Statistiques
            $statsQuery = "SELECT 
                            (SELECT COUNT(*) FROM students) as total_students,
                            (SELECT COUNT(*) FROM teachers) as total_teachers,
                            (SELECT COUNT(*) FROM enrollments) as total_enrollments,
                            (SELECT SUM(admin_benefits) FROM benefits) as total_benefits,
                            (SELECT SUM(course_price) FROM enrollments) as total_revenue";
            
            $statsResult = mysqli_query($conn, $statsQuery);
            $stats = mysqli_fetch_assoc($statsResult);
            
            echo json_encode([
                'success' => true,
                'stats' => $stats
            ]);
            break;
            
        case 'students':
            // Liste des étudiants
            $query = "SELECT id, first_name, last_name, email, phone, address, level, created_at 
                      FROM students 
                      ORDER BY created_at DESC";
            
            $result = mysqli_query($conn, $query);
            $students = [];
            
            while ($row = mysqli_fetch_assoc($result)) {
                $students[] = $row;
            }
            
            echo json_encode([
                'success' => true,
                'students' => $students
            ]);
            break;
            
        case 'enrollments':
            // Toutes les inscriptions (avec infos student visibles par admin)
            $query = "SELECT 
                        e.id,
                        e.student_first_name,
                        e.student_last_name,
                        e.student_email,
                        e.student_phone,
                        e.student_level,
                        e.course_title,
                        e.course_language,
                        e.course_price,
                        e.course_duration,
                        e.enrolled_date,
                        b.admin_benefits
                      FROM enrollments e
                      LEFT JOIN benefits b ON e.id = b.enrollment_id
                      ORDER BY e.enrolled_date DESC";
            
            $result = mysqli_query($conn, $query);
            $enrollments = [];
            
            while ($row = mysqli_fetch_assoc($result)) {
                $enrollments[] = $row;
            }
            
            echo json_encode([
                'success' => true,
                'enrollments' => $enrollments
            ]);
            break;
            
        case 'teachers':
            // Liste des teachers
            $query = "SELECT * FROM teachers ORDER BY created_at DESC";
            $result = mysqli_query($conn, $query);
            $teachers = [];
            
            while ($row = mysqli_fetch_assoc($result)) {
                $teachers[] = $row;
            }
            
            echo json_encode([
                'success' => true,
                'teachers' => $teachers
            ]);
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action']);
    }
}
?>