
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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $studentId = isset($_GET['studentId']) ? intval($_GET['studentId']) : 0;
    
    if ($studentId <= 0) {
        echo json_encode([]);
        exit();
    }
    
    // Pour student: voir seulement les infos du cours
    $query = "SELECT 
                e.id as enrollment_id,
                e.course_title as title,
                e.course_description as description,
                e.course_teacher_name as teacher,
                e.course_language as language,
                e.course_price as price,
                e.course_duration as duration,
                e.course_level as level,
                e.course_flag_icon as icon,
                e.enrolled_date
              FROM enrollments e
              WHERE e.student_id = $studentId
              ORDER BY e.enrolled_date DESC";
    
    $result = mysqli_query($conn, $query);
    $courses = [];
    
    while ($row = mysqli_fetch_assoc($result)) {
        $courses[] = [
            'id' => $row['enrollment_id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'teacher' => $row['teacher'],
            'language' => $row['language'],
            'duration' => $row['duration'],
            'price' => $row['price'] . ' DA',
            'level' => $row['level'],
            'icon' => $row['icon'],
            'enrolled_date' => $row['enrolled_date']
        ];
    }
    
    echo json_encode($courses);
}
?>