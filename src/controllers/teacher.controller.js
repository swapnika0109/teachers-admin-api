const service = require('../services/teacher.service')
const { NotFoundError } = require('../services/teacher.service')

/**
 * POST /api/register
 * Registers one or more students to a specified teacher.
 * @param req - Request body: { teacher: string, students: string[] }
 * @param res - 204 on success, 400 on validation error, 500 on server error
 */
exports.register = async(req, res) => {
    const {teacher, students} = req.body
    console.log(`Received request to register students ${students} by teacher ${teacher}`)
    try{
        await service.registerStudents(teacher, students)
        console.log(`Successfully registered students`)
        return res.status(204).send()
    }catch(err){
        console.error(`Error registering student: ${err.message}`)
        return res.status(500).json({ message: 'Internal server error' })
    }
}


/**
 * GET /api/commonstudents
 * Retrieves students common to all given teachers.
 * @param {*} req - Query params: { teacher: string | string[] }
 * @param {*} res - 200 with { students: string[] }, 400 on validation error, 500 on server error
 */
exports.commonStudents = async(req, res) => {
    const {teacher} = req.query
    console.log(`Received request to list all the commonstudents for teachers: ${teacher}`)
    try{
        const students = await service.commonStudentsOfAllTeachers(teacher)
        console.log(`Succesfully received list of common students ${students}`)
        return res.status(200).json({ students })
    }catch(err){
        console.error(`Error retrieveing list : ${err.message}`)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

/**
 * POST /api/suspend
 * Suspends a specified student.
 * @param {*} req - Request body: { student: string }
 * @param {*} res - 204 on success, 400 on validation error, 404 if student not found, 500 on server error
 */
exports.suspendedStudent = async(req, res) => {
    const {student} = req.body
    console.log(`Received request to suspend the student: ${student}`)
    try{
        await service.suspendStudent(student)
        console.log(`Succesfully suspended student ${student}`)
        return res.status(204).send()
    }catch(err){
        console.error(`Error suspending student: ${err.message}`)
        if (err instanceof NotFoundError) {
            return res.status(404).json({ message: err.message })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }
}


/**
 * POST /api/retrievefornotifications
 * Retrieves students who can receive a notification from a teacher.
 * Includes students registered to the teacher and those @mentioned in the notification (if not suspended).
 * @param {*} req - Request body: { teacher: string, notification: string }
 * @param {*} res - 200 with { recipients: string[] }, 400 on validation error, 404 if teacher not found, 500 on server error
 */
exports.notifystudents = async(req, res) => {
    const {teacher, notification} = req.body
    console.log(`Recieved request to retrieve list of students who can receive notification by teacher: ${teacher}`)
    try{
        const recipients = await service.notifyStudents(teacher, notification)
        console.log(`Recieved list of students succesfully: ${recipients.length}`)
        return res.status(200).json({ recipients })
    }catch(err){
        console.error(`Error retrieveing list: ${err.message}`)
        if (err instanceof NotFoundError) {
            return res.status(404).json({ message: err.message })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }
}