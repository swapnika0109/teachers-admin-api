const teacherRepo = require('../repositories/teacher.repo')
const studentRepo = require('../repositories/student.repo')

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

exports.commonStudentsOfAllTeachers = async (teachers) => {
  console.log(`commonStudentsOfAllTeachers - teachers: ${teachers}`)
  try {
    const students = await teacherRepo.commonStudentsOfAllTeachers(teachers)
    console.log(`commonStudentsOfAllTeachers   - found ${students.length} common students`)
    return students

  } catch (err) {
    throw new Error(`Failed to list all the common students: ${err.message}`)
  }
}

exports.suspendStudent = async (student) => {
  console.log(`suspendStudent - student: ${student}`)
  try {
    const studentRecord = await studentRepo.findStudent(student)
    if(!studentRecord){
        throw new Error("Student not found")
    }
    await studentRepo.updateStudent(true, student)
    console.log(`suspendStudent - student suspended: ${student}`)
  } catch (err) {
    throw new Error(`Failed to suspend the student: ${err.message}`)
  }
}

exports.notifyStudents = async (teacher, notificationText, students) => {
  console.log(`notifyStudents - teacher: ${teacher}`)
  try {
    teacherRecord = await teacherRepo.findStudent(student)
    if (!teacherRecord) {
      throw new Error('Teacher not found')
    }

    let activeStudentsToNotify = []

    if (students.length > 0){
        activeStudentsToNotify = await studentRepo.listActiveStudentsByEmails(students)
    }
    const registeredStudents  = await teacherRepo.listActiveSudentsRegisteredByTeacher(teacher)
    const allStudents = [...new Set(...activeStudentsToNotify, ...registeredStudents)]
    console.log(`notifyStudents - total recipients: ${allStudents.length}`)
    return allStudents
  } catch (err) {
    throw new Error(`Failed to retrieve the list of students : ${err.message}`)
  }
}
