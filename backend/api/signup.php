<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        exit();
    }
    
    $firstName = sanitize($data['firstName'] ?? '');
    $lastName = sanitize($data['lastName'] ?? '');
    $email = sanitize($data['email'] ?? '');
    $phone = sanitize($data['phone'] ?? '');
    $address = sanitize($data['address'] ?? '');
    $level = sanitize($data['level'] ?? 'A1');
    
    // Validation
    if (empty($firstName) || empty($lastName) || empty($email)) {
        echo json_encode(['success' => false, 'error' => 'Required fields missing']);
        exit();
    }
    
    // Vérifier si l'email existe déjà
    $checkQuery = "SELECT id FROM students WHERE email = '$email'";
    $checkResult = mysqli_query($conn, $checkQuery);
    
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(['success' => false, 'error' => 'Email already exists']);
        exit();
    }
    
    $userPassword = sanitize($data['password'] ?? 'student123'); // Mot de passe fourni ou défaut

    $query = "INSERT INTO students (first_name, last_name, email, phone, address, level, password) 
          VALUES ('$firstName', '$lastName', '$email', '$phone', '$address', '$level', '$userPassword')";
    
    if (mysqli_query($conn, $query)) {
        $studentId = mysqli_insert_id($conn);
        
        echo json_encode([
            'success' => true,
            'message' => 'Account created successfully',
            'user' => [
                'id' => $studentId,
                'email' => $email,
                'role' => 'student',
                'firstName' => $firstName,
                'lastName' => $lastName,
                'phone' => $phone
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . mysqli_error($conn)
        ]);
    }
}
?>