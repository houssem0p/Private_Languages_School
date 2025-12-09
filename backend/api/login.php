<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../config/db.php';

// Gérer les requêtes OPTIONS pour CORS
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
    
    $email = sanitize($data['email'] ?? '');
    $password = $data['password'] ?? '';
    
    // 1. Vérifier si c'est l'admin
    if ($email === 'admin@globalspeak.com' && $password === 'admin123') {
        echo json_encode([
            'success' => true,
            'token' => 'admin_token_1',
            'user' => [
                'id' => 1,
                'email' => 'admin@globalspeak.com',
                'role' => 'admin',
                'firstName' => 'Admin',
                'lastName' => 'Global Speak'
            ]
        ]);
        exit();
    }
    
    // 2. Vérifier si c'est un student
    // Remplacer la partie student login avec ceci :
    $query = "SELECT * FROM students WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        // Vérifier le mot de passe (soit student123 pour démo, soit le vrai mot de passe)
        $storedPassword = $row['password'];
        
        // Accepter soit 'student123' (pour les comptes de démo), soit le vrai mot de passe
        if ($password === 'student123' || $password === $storedPassword) {
            echo json_encode([
                'success' => true,
                'token' => 'student_token_' . $row['id'],
                'user' => [
                    'id' => $row['id'],
                    'email' => $row['email'],
                    'role' => 'student',
                    'firstName' => $row['first_name'],
                    'lastName' => $row['last_name'],
                    'phone' => $row['phone']
                ]
            ]);
            exit();
        }
    }
    
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email or password'
    ]);
}
?>