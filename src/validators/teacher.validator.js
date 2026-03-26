exports.validateRegister = (req, res, next) => {
    const {teacher, students} = req.body
    if(!teacher){
        return res.status(400).json({ message: 'Teacher email is required' })
    }
    if(typeof teacher !== 'string'){
        return res.status(400).json({ message: 'Teacher email is invalid' })
    }
    if(!students){
        return res.status(400).json({ message: 'Students are required' })
    }
    if(!Array.isArray(students)){
        return res.status(400).json({ message: 'Students must be an array' })
    }
    if(students.length === 0){
        return res.status(400).json({ message: 'Students array cannot be empty' })
    }
    next()
}

exports.validateCommonStudents = (req, res, next) => {
    const {teacher} = req.query
    if(!teacher){
        return res.status(400).json({ message: 'Teacher email is required' })
    }
    next()
}

exports.validateSuspendedStudents = (req, res, next) => {
    const {student} = req.body
    if(!student){
        return res.status(400).json({ message: 'Student email is required' })
    }
    if(typeof student !== 'string'){
        return res.status(400).json({ message: 'Student email is invalid' })
    }
    next()
}

exports.validateStudentsForNotifications = (req, res, next) => {
    const {teacher, notification} = req.body
    if(!teacher){
        return res.status(400).json({ message: 'Teacher email is required' })
    }
    if(typeof teacher !== 'string'){
        return res.status(400).json({ message: 'Teacher email is invalid' })
    }
    if(!notification){
        return res.status(400).json({ message: 'Notification text is required' })
    }
    if(typeof notification !== 'string'){
        return res.status(400).json({ message: 'Notification text is invalid' })
    }
    next()
}
