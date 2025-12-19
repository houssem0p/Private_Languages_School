<?php
use PHPUnit\Framework\TestCase;

class LoginTest extends TestCase
{
    private $conn;

    protected function setUp(): void {
        
        $this->conn = mysqli_connect("localhost", "root", "", "global_speak_simple");
    }

    public function testAdminLogin()
    {
        require_once __DIR__ . '/../backend/api/functions.php';

        $result = loginUser('admin@globalspeak.com', 'admin123', $this->conn);
        $this->assertTrue($result['success']);
        $this->assertEquals('admin', $result['user']['role']);
    }

    public function testInvalidLogin()
    {
        require_once __DIR__ . '/../backend/api/functions.php';

        $result = loginUser('mkchmeno@example.com', 'wrongpass', $this->conn);
        $this->assertFalse($result['success']);
        $this->assertEquals('Invalid email or password', $result['error']);
    }

    public function testStudentLogin()
    {
        require_once __DIR__ . '/../backend/api/functions.php';

        $result = loginUser('sarah@email.com', 'student123', $this->conn);
        $this->assertTrue($result['success']);
        $this->assertEquals('student', $result['user']['role']);
    }
}
