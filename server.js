const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data stores (in production, use a database)
let students = [
  { id: uuidv4(), firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', dateOfBirth: '2000-01-15', address: '123 Main St', enrollmentDate: '2022-09-01', status: 'Active' },
  { id: uuidv4(), firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '098-765-4321', dateOfBirth: '1999-05-20', address: '456 Oak Ave', enrollmentDate: '2022-09-01', status: 'Active' }
];

let courses = [
  { id: uuidv4(), courseCode: 'CS101', courseName: 'Introduction to Computer Science', description: 'Basic programming concepts', credits: 3, department: 'Computer Science', instructorId: null },
  { id: uuidv4(), courseCode: 'MATH201', courseName: 'Calculus II', description: 'Advanced calculus topics', credits: 4, department: 'Mathematics', instructorId: null }
];

let faculty = [
  { id: uuidv4(), firstName: 'Robert', lastName: 'Johnson', email: 'robert.johnson@example.com', phone: '555-123-4567', department: 'Computer Science', position: 'Professor', hireDate: '2015-08-15' },
  { id: uuidv4(), firstName: 'Emily', lastName: 'Williams', email: 'emily.williams@example.com', phone: '555-987-6543', department: 'Mathematics', position: 'Associate Professor', hireDate: '2018-01-10' }
];

let grades = [
  { id: uuidv4(), studentId: students[0].id, courseId: courses[0].id, grade: 'A', semester: 'Fall 2022', year: 2022 },
  { id: uuidv4(), studentId: students[1].id, courseId: courses[1].id, grade: 'B+', semester: 'Fall 2022', year: 2022 }
];

// Routes for Students
app.get('/api/students', (req, res) => {
  res.json(students);
});

app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

app.post('/api/students', (req, res) => {
  const { firstName, lastName, email, phone, dateOfBirth, address, enrollmentDate, status } = req.body;
  const newStudent = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    address,
    enrollmentDate,
    status
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
  const { firstName, lastName, email, phone, dateOfBirth, address, enrollmentDate, status } = req.body;
  const studentIndex = students.findIndex(s => s.id === req.params.id);
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }
  students[studentIndex] = { ...students[studentIndex], firstName, lastName, email, phone, dateOfBirth, address, enrollmentDate, status };
  res.json(students[studentIndex]);
});

app.delete('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === req.params.id);
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }
  students.splice(studentIndex, 1);
  res.status(204).send();
});

// Routes for Courses
app.get('/api/courses', (req, res) => {
  const coursesWithInstructor = courses.map(course => {
    const instructor = faculty.find(f => f.id === course.instructorId);
    return {
      ...course,
      instructor: instructor ? `${instructor.firstName} ${instructor.lastName}` : null
    };
  });
  res.json(coursesWithInstructor);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  const instructor = faculty.find(f => f.id === course.instructorId);
  res.json({
    ...course,
    instructor: instructor ? `${instructor.firstName} ${instructor.lastName}` : null
  });
});

app.post('/api/courses', (req, res) => {
  const { courseCode, courseName, description, credits, department, instructorId } = req.body;
  const newCourse = {
    id: uuidv4(),
    courseCode,
    courseName,
    description,
    credits,
    department,
    instructorId
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.put('/api/courses/:id', (req, res) => {
  const { courseCode, courseName, description, credits, department, instructorId } = req.body;
  const courseIndex = courses.findIndex(c => c.id === req.params.id);
  if (courseIndex === -1) {
    return res.status(404).json({ error: 'Course not found' });
  }
  courses[courseIndex] = { ...courses[courseIndex], courseCode, courseName, description, credits, department, instructorId };
  res.json(courses[courseIndex]);
});

app.delete('/api/courses/:id', (req, res) => {
  const courseIndex = courses.findIndex(c => c.id === req.params.id);
  if (courseIndex === -1) {
    return res.status(404).json({ error: 'Course not found' });
  }
  courses.splice(courseIndex, 1);
  res.status(204).send();
});

// Routes for Faculty
app.get('/api/faculty', (req, res) => {
  res.json(faculty);
});

app.get('/api/faculty/:id', (req, res) => {
  const facultyMember = faculty.find(f => f.id === req.params.id);
  if (!facultyMember) {
    return res.status(404).json({ error: 'Faculty member not found' });
  }
  res.json(facultyMember);
});

app.post('/api/faculty', (req, res) => {
  const { firstName, lastName, email, phone, department, position, hireDate } = req.body;
  const newFaculty = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    phone,
    department,
    position,
    hireDate
  };
  faculty.push(newFaculty);
  res.status(201).json(newFaculty);
});

app.put('/api/faculty/:id', (req, res) => {
  const { firstName, lastName, email, phone, department, position, hireDate } = req.body;
  const facultyIndex = faculty.findIndex(f => f.id === req.params.id);
  if (facultyIndex === -1) {
    return res.status(404).json({ error: 'Faculty member not found' });
  }
  faculty[facultyIndex] = { ...faculty[facultyIndex], firstName, lastName, email, phone, department, position, hireDate };
  res.json(faculty[facultyIndex]);
});

app.delete('/api/faculty/:id', (req, res) => {
  const facultyIndex = faculty.findIndex(f => f.id === req.params.id);
  if (facultyIndex === -1) {
    return res.status(404).json({ error: 'Faculty member not found' });
  }
  faculty.splice(facultyIndex, 1);
  // Remove this faculty member from any courses they were assigned to
  courses = courses.map(course => 
    course.instructorId === req.params.id ? { ...course, instructorId: null } : course
  );
  res.status(204).send();
});

// Routes for Grades
app.get('/api/grades', (req, res) => {
  const gradesWithDetails = grades.map(grade => {
    const student = students.find(s => s.id === grade.studentId);
    const course = courses.find(c => c.id === grade.courseId);
    return {
      ...grade,
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown',
      courseName: course ? course.courseName : 'Unknown'
    };
  });
  res.json(gradesWithDetails);
});

app.get('/api/grades/:id', (req, res) => {
  const grade = grades.find(g => g.id === req.params.id);
  if (!grade) {
    return res.status(404).json({ error: 'Grade not found' });
  }
  const student = students.find(s => s.id === grade.studentId);
  const course = courses.find(c => c.id === grade.courseId);
  res.json({
    ...grade,
    studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown',
    courseName: course ? course.courseName : 'Unknown'
  });
});

app.post('/api/grades', (req, res) => {
  const { studentId, courseId, grade, semester, year } = req.body;
  const newGrade = {
    id: uuidv4(),
    studentId,
    courseId,
    grade,
    semester,
    year
  };
  grades.push(newGrade);
  res.status(201).json(newGrade);
});

app.put('/api/grades/:id', (req, res) => {
  const { studentId, courseId, grade, semester, year } = req.body;
  const gradeIndex = grades.findIndex(g => g.id === req.params.id);
  if (gradeIndex === -1) {
    return res.status(404).json({ error: 'Grade not found' });
  }
  grades[gradeIndex] = { ...grades[gradeIndex], studentId, courseId, grade, semester, year };
  res.json(grades[gradeIndex]);
});

app.delete('/api/grades/:id', (req, res) => {
  const gradeIndex = grades.findIndex(g => g.id === req.params.id);
  if (gradeIndex === -1) {
    return res.status(404).json({ error: 'Grade not found' });
  }
  grades.splice(gradeIndex, 1);
  res.status(204).send();
});

// Assign faculty to course
app.put('/api/courses/:id/assign-faculty/:facultyId', (req, res) => {
  const courseIndex = courses.findIndex(c => c.id === req.params.id);
  if (courseIndex === -1) {
    return res.status(404).json({ error: 'Course not found' });
  }
  courses[courseIndex].instructorId = req.params.facultyId;
  res.json(courses[courseIndex]);
});

// Get all faculty members
app.get('/api/faculty', (req, res) => {
  res.json(faculty);
});

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Get all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Get all grades
app.get('/api/grades', (req, res) => {
  res.json(grades);
});

// Serve static files from frontend build
app.use(express.static('frontend/build'));

// Handle React app fallback
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/build/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});