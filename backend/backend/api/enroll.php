<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// POST: Student s'inscrit à un cours
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        exit();
    }
    
    $studentId = intval($data['studentId'] ?? 0);
    $courseId = intval($data['courseId'] ?? 0);
    
    // Récupérer les infos du student
    $studentQuery = "SELECT * FROM students WHERE id = $studentId";
    $studentResult = mysqli_query($conn, $studentQuery);
    $student = mysqli_fetch_assoc($studentResult);
    
    if (!$student) {
        echo json_encode(['success' => false, 'error' => 'Student not found']);
        exit();
    }
    
    // Récupérer les infos du cours
    $courseQuery = "SELECT c.*, t.name as teacher_name FROM courses c 
                    LEFT JOIN teachers t ON c.teacher_id = t.id 
                    WHERE c.id = $courseId";
    $courseResult = mysqli_query($conn, $courseQuery);
    $course = mysqli_fetch_assoc($courseResult);
    
    if (!$course) {
        echo json_encode(['success' => false, 'error' => 'Course not found']);
        exit();
    }
    
    // Vérifier si déjà inscrit
    $checkQuery = "SELECT id FROM enrollments WHERE student_id = $studentId AND course_id = $courseId";
    $checkResult = mysqli_query($conn, $checkQuery);
    
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(['success' => false, 'error' => 'Already enrolled in this course']);
        exit();
    }
    
    // Créer l'inscription
    $enrollQuery = "INSERT INTO enrollments (
        student_id, course_id,
        student_first_name, student_last_name, student_email, student_phone, student_address, student_level,
        course_title, course_description, course_teacher_name, course_language, course_price, 
        course_duration, course_level, course_flag_icon
    ) VALUES (
        $studentId, $courseId,
        '{$student['first_name']}', '{$student['last_name']}', '{$student['email']}', 
        '{$student['phone']}', '{$student['address']}', '{$student['level']}',
        '{$course['title']}', '{$course['description']}', '{$course['teacher_name']}', 
        '{$course['language']}', {$course['price']}, '{$course['duration_weeks']} weeks', 
        '{$course['level']}', '{$course['flag_icon']}'
    )";
    
    if (mysqli_query($conn, $enrollQuery)) {
        $enrollmentId = mysqli_insert_id($conn);
        
        // Créer l'enregistrement dans benefits
        $adminBenefits = $course['duration_weeks'] * 500;
        $benefitQuery = "INSERT INTO benefits (enrollment_id, course_id, student_id, course_price, weeks_count, admin_benefits) 
                         VALUES ($enrollmentId, $courseId, $studentId, {$course['price']}, {$course['duration_weeks']}, $adminBenefits)";
        
        mysqli_query($conn, $benefitQuery);
        
        echo json_encode([
            'success' => true,
            'message' => 'Successfully enrolled in course',
            'enrollmentId' => $enrollmentId
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . mysqli_error($conn)
        ]);
    }
}

// DELETE: Supprimer une inscription
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        exit();
    }
    
    $enrollmentId = intval($data['enrollmentId'] ?? 0);
    
    if ($enrollmentId <= 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid enrollment ID']);
        exit();
    }
    
    // Supprimer l'inscription (les benefits seront supprimés automatiquement par CASCADE)
    $query = "DELETE FROM enrollments WHERE id = $enrollmentId";
    
    if (mysqli_query($conn, $query)) {
        echo json_encode([
            'success' => true,
            'message' => 'Enrollment deleted successfully'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . mysqli_error($conn)
        ]);
    }
}
?>