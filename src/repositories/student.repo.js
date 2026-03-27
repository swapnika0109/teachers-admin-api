const db = require('../db')
exports.findStudent = async (studentEmail) => {
  const [rows] = await db.query(
    'SELECT * FROM students WHERE email = ?',
    [studentEmail]
  )
  return rows[0]
}

exports.insertStudent = async (studentEmail, isSuspended) => {
  const [result] = await db.query(
    'INSERT IGNORE INTO students (email, is_suspended) VALUES (?, ?)',
    [studentEmail, isSuspended]  // ← fixed
  )
  return result
}

exports.updateStudent = async (studentEmail, isSuspended) => {
  const [result] = await db.query(
    'UPDATE students SET is_suspended = ? WHERE email = ?',
    [isSuspended, studentEmail]  // ← fixed
  )
  return result
}

exports.findSuspendedStudentsByEmails = async (students) => {
  const [rows] = await db.query(
    `SELECT email FROM students WHERE email IN (?) AND is_suspended = TRUE`,
    [students]
  )
  return rows.map(row => row.email)
}

exports.listActiveStudentsByEmails = async (students) =>{
  const [rows] = await db.query(
    `SELECT email 
    FROM students 
    WHERE email IN (?) 
    AND is_suspended = FALSE`,
    [students]
  )
  return rows.map(row => row.email)
}


