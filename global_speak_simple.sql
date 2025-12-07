-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2025 at 10:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `global_speak_simple`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin', '$2y$10$YourHashedPasswordHere', '2025-12-01 22:13:32');

-- --------------------------------------------------------

--
-- Stand-in structure for view `admin_stats`
-- (See below for the actual view)
--
CREATE TABLE `admin_stats` (
`total_students` bigint(21)
,`total_teachers` bigint(21)
,`total_enrollments` bigint(21)
,`total_benefits` decimal(32,2)
,`total_revenue` decimal(32,2)
);

-- --------------------------------------------------------

--
-- Table structure for table `benefits`
--

CREATE TABLE `benefits` (
  `id` int(11) NOT NULL,
  `enrollment_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_price` decimal(10,2) NOT NULL,
  `weeks_count` int(11) NOT NULL,
  `admin_benefits` decimal(10,2) NOT NULL,
  `total_benefit` decimal(10,2) GENERATED ALWAYS AS (`admin_benefits`) VIRTUAL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `benefits`
--

INSERT INTO `benefits` (`id`, `enrollment_id`, `course_id`, `student_id`, `course_price`, `weeks_count`, `admin_benefits`, `created_at`) VALUES
(1, 1, 1, 1, 2000.00, 4, 2000.00, '2025-12-01 22:13:34'),
(2, 2, 3, 2, 2500.00, 8, 4000.00, '2025-12-01 22:13:34'),
(3, 3, 2, 1, 1800.00, 6, 3000.00, '2025-12-01 22:13:34');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `language` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_weeks` int(11) NOT NULL,
  `level` varchar(50) DEFAULT NULL,
  `flag_icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `teacher_id`, `language`, `price`, `duration_weeks`, `level`, `flag_icon`, `created_at`) VALUES
(1, 'Spanish – Intensive', 'Immersive daily sessions to boost fluency fast. Includes cultural lessons.', 1, 'Spanish', 2000.00, 4, 'Beginner', '/flag_country/Flag-Spain.webp', '2025-12-01 22:13:34'),
(2, 'French – Beginner', 'Perfect for starters. Learn basics with interactive conversations.', 2, 'French', 1800.00, 6, 'Beginner', '/flag_country/Flag_France.svg.webp', '2025-12-01 22:13:34'),
(3, 'English – Business', 'Master professional communication for career advancement.', 3, 'English', 2500.00, 8, 'Advanced', '/flag_country/Flag_england.svg.webp', '2025-12-01 22:13:34'),
(4, 'Chinese – Basics', 'Learn Mandarin basics with focus on pronunciation and writing.', 4, 'Chinese', 2200.00, 10, 'Beginner', '/flag_country/Flag-China.webp', '2025-12-01 22:13:34');

-- --------------------------------------------------------

--
-- Stand-in structure for view `course_details`
-- (See below for the actual view)
--
CREATE TABLE `course_details` (
`id` int(11)
,`title` varchar(255)
,`description` text
,`teacher_id` int(11)
,`language` varchar(100)
,`price` decimal(10,2)
,`duration_weeks` int(11)
,`level` varchar(50)
,`flag_icon` varchar(255)
,`created_at` timestamp
,`teacher_name` varchar(255)
,`teacher_experience` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `student_first_name` varchar(100) NOT NULL,
  `student_last_name` varchar(100) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  `student_phone` varchar(20) DEFAULT NULL,
  `student_address` text DEFAULT NULL,
  `student_level` varchar(50) DEFAULT NULL,
  `course_title` varchar(255) NOT NULL,
  `course_description` text DEFAULT NULL,
  `course_teacher_name` varchar(255) DEFAULT NULL,
  `course_language` varchar(100) NOT NULL,
  `course_price` decimal(10,2) NOT NULL,
  `course_duration` varchar(50) DEFAULT NULL,
  `course_level` varchar(50) DEFAULT NULL,
  `course_flag_icon` varchar(255) DEFAULT NULL,
  `enrolled_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `completed_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `student_id`, `course_id`, `student_first_name`, `student_last_name`, `student_email`, `student_phone`, `student_address`, `student_level`, `course_title`, `course_description`, `course_teacher_name`, `course_language`, `course_price`, `course_duration`, `course_level`, `course_flag_icon`, `enrolled_date`, `completed_date`) VALUES
(1, 1, 1, 'John', 'Doe', 'john@email.com', '0551234567', '123 Main St', 'Beginner', 'Spanish – Intensive', 'Immersive daily sessions to boost fluency fast. Includes cultural lessons.', 'Carlos Rodriguez', 'Spanish', 2000.00, '4 weeks', 'Beginner', '/flag_country/Flag-Spain.webp', '2025-12-01 22:13:34', NULL),
(2, 2, 3, 'Sarah', 'Smith', 'sarah@email.com', '0557654321', '456 Oak Ave', 'Intermediate', 'English – Business', 'Master professional communication for career advancement.', 'Sarah Johnson', 'English', 2500.00, '8 weeks', 'Advanced', '/flag_country/Flag_england.svg.webp', '2025-12-01 22:13:34', NULL),
(3, 1, 2, 'John', 'Doe', 'john@email.com', '0551234567', '123 Main St', 'Beginner', 'French – Beginner', 'Perfect for starters. Learn basics with interactive conversations.', 'Marie Dubois', 'French', 1800.00, '6 weeks', 'Beginner', '/flag_country/Flag_France.svg.webp', '2025-12-01 22:13:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `student_id`, `course_id`, `added_date`) VALUES
(1, 1, 3, '2025-12-01 22:13:34'),
(2, 2, 1, '2025-12-01 22:13:34'),
(3, 3, 4, '2025-12-01 22:13:34');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `address`, `level`, `created_at`) VALUES
(1, 'John', 'Doe', 'john@email.com', 'student123', '0551234567', '123 Main St', 'Beginner', '2025-12-01 22:13:34'),
(2, 'Sarah', 'Smith', 'sarah@email.com', 'student123', '0557654321', '456 Oak Ave', 'Intermediate', '2025-12-01 22:13:34'),
(3, 'Ahmed', 'Benali', 'ahmed@email.com', 'student123', '0551112233', '789 Pine Rd', 'Advanced', '2025-12-01 22:13:34');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `languages` varchar(255) NOT NULL,
  `experience` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `quote` varchar(500) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `languages`, `experience`, `bio`, `quote`, `image_url`, `created_at`) VALUES
(1, 'Carlos Rodriguez', 'Spanish', '8 years', 'Native Spanish teacher with 8 years experience', 'Loves teaching Spanish culture', NULL, '2025-12-01 22:13:34'),
(2, 'Marie Dubois', 'French', '6 years', 'Passionate French teacher from Paris', 'Believes in immersive learning', NULL, '2025-12-01 22:13:34'),
(3, 'Sarah Johnson', 'English', '10 years', 'Certified English teacher with business background', 'Makes learning fun and practical', NULL, '2025-12-01 22:13:34'),
(4, 'Wei Zhang', 'Chinese', '5 years', 'Native Chinese speaker specializing in beginners', 'Passionate about sharing Chinese culture', NULL, '2025-12-01 22:13:34');

-- --------------------------------------------------------

--
-- Structure for view `admin_stats`
--
DROP TABLE IF EXISTS `admin_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admin_stats`  AS SELECT (select count(0) from `students`) AS `total_students`, (select count(0) from `teachers`) AS `total_teachers`, (select count(0) from `enrollments`) AS `total_enrollments`, (select sum(`benefits`.`admin_benefits`) from `benefits`) AS `total_benefits`, (select sum(`enrollments`.`course_price`) from `enrollments`) AS `total_revenue` ;

-- --------------------------------------------------------

--
-- Structure for view `course_details`
--
DROP TABLE IF EXISTS `course_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `course_details`  AS SELECT `c`.`id` AS `id`, `c`.`title` AS `title`, `c`.`description` AS `description`, `c`.`teacher_id` AS `teacher_id`, `c`.`language` AS `language`, `c`.`price` AS `price`, `c`.`duration_weeks` AS `duration_weeks`, `c`.`level` AS `level`, `c`.`flag_icon` AS `flag_icon`, `c`.`created_at` AS `created_at`, `t`.`name` AS `teacher_name`, `t`.`experience` AS `teacher_experience` FROM (`courses` `c` left join `teachers` `t` on(`c`.`teacher_id` = `t`.`id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `benefits`
--
ALTER TABLE `benefits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `idx_benefits_enrollment` (`enrollment_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `idx_courses_language` (`language`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_enrollment` (`student_id`,`course_id`),
  ADD KEY `idx_enrollments_student` (`student_id`),
  ADD KEY `idx_enrollments_course` (`course_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_favorite` (`student_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `benefits`
--
ALTER TABLE `benefits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `benefits`
--
ALTER TABLE `benefits`
  ADD CONSTRAINT `benefits_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `benefits_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `benefits_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
