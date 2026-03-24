const db = require('../db')

exports.register = async(req, res) => {
    const {teacher, students} = req.body
    try{

        return res.status(204).send()

    }catch(err){
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

exports.commonStudents = async(req, res) => {
    const {teacher, students} = req.query
    try{
        
        return res.status(204).send()

    }catch(err){
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

exports.suspendedStudent = async(req, res) => {
    const {student} = req.query
    try{
        
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