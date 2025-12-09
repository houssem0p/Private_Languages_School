<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// GET: Récupérer les favoris d'un student
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $studentId = isset($_GET['studentId']) ? intval($_GET['studentId']) : 0;
    
    if ($studentId <= 0) {
        echo json_encode([]);
        exit();
    }
    
    $query = "SELECT c.*, t.name as teacher_name 
              FROM favorites f
              JOIN courses c ON f.course_id = c.id
              LEFT JOIN teachers t ON c.teacher_id = t.id
              WHERE f.student_id = $studentId
              ORDER BY f.added_date DESC";
    
    $result = mysqli_query($conn, $query);
    $favorites = [];
    
    while ($row = mysqli_fetch_assoc($result)) {
        $favorites[] = [
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
    
    echo json_encode($favorites);
}

// POST: Ajouter un favori
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        exit();
    }
    
    $studentId = intval($data['studentId'] ?? 0);
    $courseId = intval($data['courseId'] ?? 0);
    
    if ($studentId <= 0 || $courseId <= 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid data']);
        exit();
    }
    
    // Vérifier si déjà en favori
    $checkQuery = "SELECT id FROM favorites WHERE student_id = $studentId AND course_id = $courseId";
    $checkResult = mysqli_query($conn, $checkQuery);
    
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(['success' => false, 'error' => 'Already in favorites']);
        exit();
    }
    
    $query = "INSERT INTO favorites (student_id, course_id) VALUES ($studentId, $courseId)";
    
    if (mysqli_query($conn, $query)) {
        echo json_encode([
            'success' => true,
            'message' => 'Added to favorites'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . mysqli_error($conn)
        ]);
    }
}

// DELETE: Retirer un favori
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        exit();
    }
    
    $studentId = intval($data['studentId'] ?? 0);
    $courseId = intval($data['courseId'] ?? 0);
    
    if ($studentId <= 0 || $courseId <= 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid data']);
        exit();
    }
    
    $query = "DELETE FROM favorites WHERE student_id = $studentId AND course_id = $courseId";
    
    if (mysqli_query($conn, $query)) {
        echo json_encode([
            'success' => true,
            'message' => 'Removed from favorites'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . mysqli_error($conn)
        ]);
    }
}
?>