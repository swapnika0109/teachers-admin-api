CREATE DATABASE IF NOT EXISTS teacher_admin;
USE teacher_admin;

CREATE TABLE IF NOT EXISTS teachers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_suspended BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS teacher_student(
    teacher_id INT NOT NULL,
    student_id INT NOT NULL,
    PRIMARY KEY(teacher_id, student_id),
    FOREIGN KEY(teacher_id) REFERENCES teachers(id),
    FOREIGN KEY(student_id) REFERENCES students(id)
);