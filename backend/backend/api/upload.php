<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['flag'])) {
        $uploadDir = '../uploads/flags/';
        
        // Créer le dossier s'il n'existe pas
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $fileName = uniqid() . '_' . basename($_FILES['flag']['name']);
        $uploadFile = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['flag']['tmp_name'], $uploadFile)) {
            echo json_encode([
                'success' => true,
                'url' => '/uploads/flags/' . $fileName
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Failed to upload file'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'No file uploaded'
        ]);
    }
}
?>