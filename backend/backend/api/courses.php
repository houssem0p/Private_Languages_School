<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// GET: Récupérer tous les cours
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT c.*, t.name as teacher_name 
              FROM courses c
              LEFT JOIN teachers t ON c.teacher_id = t.id
              ORDER BY c.id DESC";
    
    $result = mysqli_query($conn, $query);
    $courses = [];
    
    while ($row = mysqli_fetch_assoc($result)) {
        $courses[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'teacher' => $row['teacher_name'],
            'language' => $row['language'],
            'duration' => $row['duration_weeks'] . ' weeks',
            'price' => $row['price'] . ' DA',
            'level' => $row['level'],
            'icon' => $row['flag_icon']
        ];
    }
    
    echo json_encode($courses);
}

// POST: Admin crée un nouveau cours
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        exit();
    }
    
    $title = sanitize($data['title'] ?? '');
    $description = sanitize($data['description'] ?? '');
    $teacher_id = intval($data['teacher_id'] ?? 0);
    $language = sanitize($data['language'] ?? '');
    $price = floatval($data['price'] ?? 0);
    $duration_weeks = intval($data['duration_weeks'] ?? 0);
    $level = sanitize($data['level'] ?? 'Beginner');
    $flag_icon = sanitize($data['flag_icon'] ?? '');
    
    // Validation
    if (empty($title) || empty($language) || $price <= 0 || $duration_weeks <= 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid course data']);
        exit();
    }
    
    $query = "INSERT INTO courses (title, description, teacher_id, language, price, duration_weeks, level, flag_icon) 
              VALUES ('$title', '$description', $teacher_id, '$language', $price, $duration_weeks, '$level', '$flag_icon')";
    
    if (mysqli_query($conn, $query)) {
        $courseId = mysqli_insert_id($conn);
        
        echo json_encode([
            'success' => true,
            'message' => 'Course created successfully',
            'courseId' => $courseId
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . mysqli_error($conn)
        ]);
    }
}
?>