const express = require('express')
const router = express.Router()
const validator = require('../validators/teacher.validator')
const controller = require('../controllers/teacher.controller')

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register students to a teacher
 *     description: Register one or more students to a specified teacher.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [teacher, students]
 *             properties:
 *               teacher:
 *                 type: string
 *                 format: email
 *                 example: teacherken@gmail.com
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: email
 *                 example: ["studentjon@gmail.com", "studenthon@gmail.com"]
 *     responses:
 *       204:
 *         description: Successfully registered.
 *       400:
 *         description: Invalid request data.
 */
router.post('/register',
  validator.validateRegister,
  controller.register
)

/**
 * @openapi
 * /api/commonstudents:
 *   get:
 *     summary: Retrieve common students
 *     description: Retrieve a list of students common to a given list of teachers.
 *     parameters:
 *       - in: query
 *         name: teacher
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             format: email
 *         style: form
 *         explode: true
 *         description: The email(s) of the teacher(s).
 *     responses:
 *       200:
 *         description: A list of common students.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 students:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: email
 *                   example: ["commonstudent1@gmail.com", "commonstudent2@gmail.com"]
 */
router.get('/commonstudents',
  validator.validateCommonStudents,
  controller.commonStudents
)

/**
 * @openapi
 * /api/suspend:
 *   post:
 *     summary: Suspend a student
 *     description: Suspend a specified student.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [student]
 *             properties:
 *               student:
 *                 type: string
 *                 format: email
 *                 example: studentmary@gmail.com
 *     responses:
 *       204:
 *         description: Student successfully suspended.
 *       404:
 *         description: Student not found.
 */
router.post('/suspend',
  validator.validateSuspendedStudents,
  controller.suspendedStudent
)

/**
 * @openapi
 * /api/retrievefornotifications:
 *   post:
 *     summary: Retrieve notification recipients
 *     description: Retrieve students who can receive a notification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [teacher, notification]
 *             properties:
 *               teacher:
 *                 type: string
 *                 format: email
 *                 example: teacherken@gmail.com
 *               notification:
 *                 type: string
 *                 example: "Hello students! @studentagnes@gmail.com"
 *     responses:
 *       200:
 *         description: A list of recipient emails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipients:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: email
 *                   example: ["studentbob@gmail.com", "studentagnes@gmail.com"]
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Teacher not found.
 */
router.post('/retrievefornotifications',
  validator.validateStudentsForNotifications,
  controller.notifystudents
)

module.exports = router