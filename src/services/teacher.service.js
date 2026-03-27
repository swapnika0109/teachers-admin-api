const teacherRepo = require('../repositories/teacher.repo')
const studentRepo = require('../repositories/student.repo')

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

exports.NotFoundError = NotFoundError

/**
 * Registers students under a teacher.
 * 1) Check if teacher exists, if not insert teacher record first.
 * 2) For each student, check if they exist, if not insert them.
 * 3) Map each student to the teacher.
 * @param {string} teacherEmail
 * @param {string[]} students
 */
exports.registerStudents = async (teacherEmail, students) => {
  console.log(`registerStudents - ${students} by teacher ${teacherEmail}`)
  try {
    let teacherRecord = await teacherRepo.findTeacher(teacherEmail)

    if (!teacherRecord) {
      await teacherRepo.insertTeacher(teacherEmail)
      teacherRecord = await teacherRepo.findTeacher(teacherEmail)
    }

    for (const studentEmail of students) {
      let studentRecord = await studentRepo.findStudent(studentEmail)

      if (!studentRecord) {
        await studentRepo.insertStudent(studentEmail, false)
        studentRecord = await studentRepo.findStudent(studentEmail)
      }

      await teacherRepo.registerStudentByTeacher(
        teacherRecord.id,
        studentRecord.id
      )
    }

  } catch (err) {
    throw new Error(`Failed to register students: ${err.message}`)
  }
}

/**
 * Returns students common to ALL given teachers.
 * @param {string | string[]} teachers
 * @returns {string[]} list of student emails
 */
exports.commonStudentsOfAllTeachers = async (teachers) => {
  console.log(`commonStudentsOfAllTeachers - teachers: ${teachers}`)
  try {
    const students = await teacherRepo.commonStudentsOfAllTeachers(teachers)
    console.log(`commonStudentsOfAllTeachers - found ${students.length} common students`)
    return students

  } catch (err) {
    throw new Error(`Failed to list all the common students: ${err.message}`)
  }
}

/**
 * Suspends a student. Throws NotFoundError if student does not exist.
 * @param {string} student - student email
 */
exports.suspendStudent = async (student) => {
  console.log(`suspendStudent - student: ${student}`)
  const studentRecord = await studentRepo.findStudent(student)
  if (!studentRecord) {
    throw new NotFoundError(`Student ${student} not found`)
  }
  try {
    await studentRepo.updateStudent(student, true)
    console.log(`suspendStudent - student suspended: ${student}`)
  } catch (err) {
    throw new Error(`Failed to suspend the student: ${err.message}`)
  }
}

/**
 * Returns list of students who can receive a notification from the teacher.
 * Includes registered active students + @mentioned students who are not suspended (even if not registered).
 * No duplicates. Throws NotFoundError if teacher does not exist.
 * @param {string} teacher - teacher email
 * @param {string} notificationText - notification text (may contain @mentions)
 * @returns {string[]} list of recipient emails
 */
exports.notifyStudents = async (teacher, notificationText) => {
  console.log(`notifyStudents - teacher: ${teacher}`)
  try {
    const teacherRecord = await teacherRepo.findTeacher(teacher)
    if (!teacherRecord) {
      throw new NotFoundError(`Teacher ${teacher} not found`)
    }

    const mentionedStudents = notificationText
      .split(' ')
      .filter(word => word.startsWith('@'))
      .map(word => word.slice(1))

    let activeStudentsToNotify = []
    if (mentionedStudents.length > 0) {
      const suspendedStudents = await studentRepo.findSuspendedStudentsByEmails(mentionedStudents)
      activeStudentsToNotify = mentionedStudents.filter(s => !suspendedStudents.includes(s))
    }

    const registeredStudents = await teacherRepo.listActiveSudentsRegisteredByTeacher(teacher)
    const allStudents = [...new Set([...activeStudentsToNotify, ...registeredStudents])]
    console.log(`notifyStudents - total recipients: ${allStudents.length}`)
    return allStudents
  } catch (err) {
    if (err.name === 'NotFoundError') throw err
    throw new Error(`Failed to retrieve the list of students: ${err.message}`)
  }
}
