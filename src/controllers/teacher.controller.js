const db = require('../db')
const service = require('../services/teacher.service')

exports.register = async(req, res) => {
    const {teacher, students} = req.body
    try{
        await service.registerStudents(teacher, students)
        return res.status(204).send()

    }catch(err){
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

exports.commonStudents = async(req, res) => {
    const {teacher} = req.query
    try{
        students = await service.commonStudentsOfAllTeachers(teacher)
        return res.status(204).send(students)

    }catch(err){
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

exports.suspendedStudent = async(req, res) => {
    const {student} = req.query
    try{
        await service.suspendStudent(student)
        return res.status(204).send()

    }catch(err){
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

exports.notifystudents = async(req, res) => {
    const {teacher, notification} = req.body
    try{
        
        return res.status(204).send()

    }catch(err){
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}