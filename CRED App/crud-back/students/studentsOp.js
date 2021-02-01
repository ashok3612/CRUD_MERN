const express = require('express');
const { getAllStudents, postStudent, deleteStudentById, updateStudentById } = require('../Controller/studentsContrller');
const router = express.Router();

//Student routes
router.get('/', getAllStudents);
router.post('/post', postStudent);
router.put('/update', updateStudentById)
router.delete('/delete', deleteStudentById)

module.exports = router;