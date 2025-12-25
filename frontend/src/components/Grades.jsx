import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    grade: '',
    semester: '',
    year: new Date().getFullYear()
  });

  useEffect(() => {
    fetchGrades();
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await axios.get('/api/grades');
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingGrade) {
        // Update existing grade
        await axios.put(`/api/grades/${editingGrade.id}`, formData);
      } else {
        // Create new grade
        await axios.post('/api/grades', formData);
      }
      
      // Reset form and refresh data
      setFormData({
        studentId: '',
        courseId: '',
        grade: '',
        semester: '',
        year: new Date().getFullYear()
      });
      setEditingGrade(null);
      setShowForm(false);
      fetchGrades();
    } catch (error) {
      console.error('Error saving grade:', error);
    }
  };

  const handleEdit = (grade) => {
    setFormData({
      studentId: grade.studentId,
      courseId: grade.courseId,
      grade: grade.grade,
      semester: grade.semester,
      year: grade.year
    });
    setEditingGrade(grade);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      try {
        await axios.delete(`/api/grades/${id}`);
        fetchGrades();
      } catch (error) {
        console.error('Error deleting grade:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      studentId: '',
      courseId: '',
      grade: '',
      semester: '',
      year: new Date().getFullYear()
    });
    setEditingGrade(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Grades</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          Add Grade
        </button>
      </div>

      {/* Grade Form */}
      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingGrade ? 'Edit Grade' : 'Add New Grade'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.firstName} {student.lastName} ({student.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.courseCode} - {course.courseName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="form-control"
                  min="2000"
                  max="2100"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="btn btn-primary">
                {editingGrade ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grades Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Grade</th>
                <th>Semester</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td>{grade.studentName}</td>
                  <td>{grade.courseName}</td>
                  <td className="font-medium">{grade.grade}</td>
                  <td>{grade.semester}</td>
                  <td>{grade.year}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(grade)}
                      className="btn btn-primary text-sm mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(grade.id)}
                      className="btn btn-danger text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Grades;