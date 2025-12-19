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

// GET: Récupérer tous les teachers
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT * FROM teachers ORDER BY id DESC";
    $result = mysqli_query($conn, $query);
    $teachers = [];
    
    while ($row = mysqli_fetch_assoc($result)) {
        $teachers[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'languages' => $row['languages'],
            'experience' => $row['experience'],
            'bio' => $row['bio'],
            'quote' => $row['quote'],
            'img' => $row['image_url']
        ];
    }
    
    echo json_encode($teachers);
}

// POST: Admin crée un nouveau teacher
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        exit();
    }
    
    $name = sanitize($data['name'] ?? '');
    $languages = sanitize($data['languages'] ?? '');
    $experience = sanitize($data['experience'] ?? '');
    $bio = sanitize($data['bio'] ?? '');
    $quote = sanitize($data['quote'] ?? '');
    $image_url = sanitize($data['image_url'] ?? '');
    
    if (empty($name) || empty($languages)) {
        echo json_encode(['success' => false, 'error' => 'Name and languages are required']);
        exit();
    }
    
    $query = "INSERT INTO teachers (name, languages, experience, bio, quote, image_url) 
              VALUES ('$name', '$languages', '$experience', '$bio', '$quote', '$image_url')";
    
    if (mysqli_query($conn, $query)) {
        $teacherId = mysqli_insert_id($conn);
        
        echo json_encode([
            'success' => true,
            'message' => 'Teacher created successfully',
            'teacherId' => $teacherId
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . mysqli_error($conn)
        ]);
    }
}
// DELETE: Supprimer un teacher
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $teacherId = 0;
    if ($data && isset($data['teacherId'])) {
        $teacherId = intval($data['teacherId']);
    } elseif (isset($_GET['teacherId'])) {
        $teacherId = intval($_GET['teacherId']);
    }
    if ($teacherId <= 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid teacher ID']);
        exit();
    }
    if ($teacherId <= 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid teacher ID']);
        exit();
    }
    $query = "DELETE FROM teachers WHERE id = $teacherId";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true, 'message' => 'Teacher deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . mysqli_error($conn)]);
    }
}
?>