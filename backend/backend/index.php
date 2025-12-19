<?php
// Fichier pour tester les APIs
echo "<h1>Global Speak API Test</h1>";
echo "<p>Backend PHP API for Global Speak project</p>";
echo "<h2>Available APIs:</h2>";
echo "<ul>";
echo "<li><a href='api/login.php'>POST /api/login.php</a> - User login</li>";
echo "<li><a href='api/signup.php'>POST /api/signup.php</a> - User signup</li>";
echo "<li><a href='api/courses.php'>GET /api/courses.php</a> - Get all courses</li>";
echo "<li><a href='api/teachers.php'>GET /api/teachers.php</a> - Get all teachers</li>";
echo "<li><a href='api/admin.php?action=dashboard'>GET /api/admin.php?action=dashboard</a> - Admin dashboard stats</li>";
echo "<li><a href='api/admin.php?action=students'>GET /api/admin.php?action=students</a> - All students</li>";
echo "<li><a href='api/admin.php?action=enrollments'>GET /api/admin.php?action=enrollments</a> - All enrollments</li>";
echo "</ul>";
?>