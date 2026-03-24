const express = require('express')
const router = express.Router()
const validator  = require('../validators/teacher.validator')
const controller = require('../controllers/teacher.controller')

router.post('/register',
  validator.validateRegister,    // step 1 - validate
  controller.register            // step 2 - handle
)

router.get('/commonstudents',
  validator.validateCommonStudents,
  controller.commonStudents
)

router.post('/suspend',
  validator.validateSuspendedStudents,
  controller.suspendedStudent
)

router.post('/retrievefornotifications',
  validator.validateStudentsForNotifications,
  controller.notifystudents
)


