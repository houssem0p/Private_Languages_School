<?php
require_once __DIR__ . '/../config/db.php';

function loginUser($email, $password, $conn) {

    $email = sanitize($conn, $email);

    // Vérifier si c'est l'admin
    if ($email === 'admin@globalspeak.com' && $password === 'admin123') {
        return [
            'success' => true,
            'token' => 'admin_token_1',
            'user' => [
                'id' => 1,
                'email' => 'admin@globalspeak.com',
                'role' => 'admin',
                'firstName' => 'Admin',
                'lastName' => 'Global Speak'
            ]
        ];
    }

    // Vérifier si c'est un student
    $query = "SELECT * FROM students WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        $storedPassword = $row['password'];
        if ($password === 'student123' || $password === $storedPassword) {
            return [
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
            ];
        }
    }

    return [
        'success' => false,
        'error' => 'Invalid email or password'
    ];
}
