# College Management System

A comprehensive Python-based system to manage college operations including students, courses, faculty, and grades.

## Features

- **Student Management**: Add, update, delete, search, and view student records
- **Course Management**: Manage course information and enrollment
- **Faculty Management**: Handle faculty records and course assignments
- **Grade Management**: Track and update student grades
- **Report Generation**: Generate various reports for analysis

## System Architecture

The system follows a Model-View-Controller (MVC) pattern:

- **Models**: Student, Course, Faculty, and Grade classes
- **Controllers**: Business logic in CollegeController
- **Views**: Command-line interface in main.py

## Models

### Student
- Student ID (auto-generated)
- Name
- Email
- Major
- Year
- Enrolled courses

### Course
- Course code
- Course name
- Credits
- Description
- Enrolled students
- Assigned faculty

### Faculty
- Faculty ID (auto-generated)
- Name
- Email
- Department
- Position
- Assigned courses

### Grade
- Student
- Course
- Grade value
- Semester
- Year

## Setup and Usage

1. Navigate to the project directory
2. Run the application:

```bash
python main.py
```

3. Follow the on-screen menu options to manage the college data

## Menu Options

### Main Menu
1. Student Management
2. Course Management
3. Faculty Management
4. Grade Management
5. Generate Reports
6. Exit

### Student Management
- Add Student
- View All Students
- Search Student
- Update Student
- Delete Student
- Back to Main Menu

### Course Management
- Add Course
- View All Courses
- Search Course
- Update Course
- Delete Course
- Assign Faculty to Course
- Back to Main Menu

### Faculty Management
- Add Faculty
- View All Faculty
- Search Faculty
- Update Faculty
- Delete Faculty
- Back to Main Menu

### Grade Management
- Add Grade
- View Student Grades
- View Course Grades
- Update Grade
- Back to Main Menu

### Reports
- Student Report
- Course Report
- Faculty Report
- Grade Report
- Back to Main Menu

## Sample Data

The system is initialized with sample data for demonstration purposes:
- 3 Students
- 3 Courses
- 3 Faculty members

## Technologies Used

- Python 3.x
- Built-in Python libraries (uuid, datetime)

## Data Persistence

This system currently stores data in memory. For a production system, consider adding database integration (e.g., SQLite, PostgreSQL).

## Future Enhancements

- Database integration for persistent storage
- Web-based GUI using Flask/Django
- Authentication and authorization
- Advanced reporting features
- Export capabilities (PDF, Excel)
- Email notifications
- Attendance tracking
- Timetable management