<?php
// Configuration de la base de données
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'global_speak_simple';

// Créer la connexion
$conn = mysqli_connect($host, $username, $password, $database);

// Vérifier la connexion
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Définir l'encodage UTF-8
mysqli_set_charset($conn, "utf8");

// Fonction helper pour sécuriser les inputs
function sanitize($data) {
    global $conn;
    return mysqli_real_escape_string($conn, trim($data));
}
?>