// src/repository/teacher.repository.js
const db = require('../db')

exports.findTeacher = async (teacherEmail) => {
  const [rows] = await db.query(
    'SELECT * FROM teachers WHERE email = ?',
    [teacherEmail]
  )
  return rows[0]
}

exports.insertTeacher = async (teacherEmail) => {
  const [result] = await db.query(
    'INSERT IGNORE INTO teachers (email) VALUES (?)',
    [teacherEmail]
  )
  return result
}


exports.registerStudentByTeacher = async (teacherID, studentID) => {
  const [result] = await db.query(
    'INSERT IGNORE INTO teacher_student (teacher_id, student_id) VALUES (?, ?)',
    [teacherID, studentID]
  )
  return result
}

exports.commonStudentsOfAllTeachers = async (teacher) =>{
    const teachers = Array.isArray(teacher) ? teacher : [teacher]
    const [rows] = await db.query(
        `SELECT s.email FROM students s
        JOIN teacher_student ts ON s.id = ts.student_id
        JOIN teachers t ON t.id = ts.teacher_id
        WHERE t.email IN (?)
        GROUP BY s.id
        HAVING COUNT(DISTINCT t.id) = ?`,
        [teachers, teachers.length]
    )
    return rows.map(row => row.email)
}

exports.listActiveSudentsRegisteredByTeacher = async (teacher) =>{
    const [rows] = await db.query(`
        SELECT s.email from students s
        JOIN teacher_student ts ON s.id = ts.student_id
        JOIN teachers t ON t.id = ts.teacher_id
        WHERE t.email IN (?)
        AND s.is_suspended = FALSE
        GROUP BY s.id`,
        [teacher]
    )
    return rows.map(row => row.email)
}