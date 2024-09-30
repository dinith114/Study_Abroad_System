const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');


router.post('/addCourse', courseController.addCourse);


router.get('/getCourses', courseController.getCourses);

router.get('/getCourseById/:id', courseController.getCourseById);

router.put('/updateCourse/:id', courseController.updateCourse);


router.delete('/deleteCourse/:id', courseController.deleteCourse);

module.exports = router;
