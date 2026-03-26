const db = require('../db')
const service = require('../services/teacher.service')

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

exports.suspendedStudent = async(req, res) => {
    const {student} = req.body
    console.log(`Received request to suspend the student: ${student}`)
    try{
        await service.suspendStudent(student)
        console.log(`Succesfully suspended student ${student}`)
        return res.status(204).send()

    }catch(err){
        console.error(`Error suspending student: ${err.message}`)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

exports.notifystudents = async(req, res) => {
    const {teacher, notification} = req.body
    console.log(`Recieved request to retrieve list of students who can receive notification by teacher: ${teacher}`)
    try{
        const recipients = await service.notifyStudents(teacher, notification)
        console.log(`Recieved list of students succesfully: ${recipients.length}`)
        return res.status(200).json({ recipients })

    }catch(err){
        console.error(`Error retrieveing list: ${err.message}`)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
