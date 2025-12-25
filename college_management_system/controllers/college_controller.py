"""
College Controller for the College Management System
Handles all business logic and data management
"""

from models.student import Student
from models.course import Course
from models.faculty import Faculty
from models.grade import Grade
import uuid
from datetime import datetime

class CollegeController:
    def __init__(self):
        # Data storage
        self.students = {}
        self.courses = {}
        self.faculty = {}
        self.grades = {}  # Key: (student_id, course_code), Value: Grade object
        
        # Initialize with some sample data
        self._initialize_sample_data()

    def _generate_id(self):
        """Generate a unique ID"""
        return str(uuid.uuid4())[:8]

    def _initialize_sample_data(self):
        """Initialize with sample data for demonstration"""
        # Add sample students
        self.add_student("John Doe", "john.doe@college.edu", "Computer Science", 2)
        self.add_student("Jane Smith", "jane.smith@college.edu", "Mathematics", 3)
        self.add_student("Robert Johnson", "robert.j@college.edu", "Physics", 1)
        
        # Add sample courses
        self.add_course("CS101", "Introduction to Computer Science", 3, "Basic programming concepts")
        self.add_course("MATH201", "Calculus II", 4, "Advanced calculus topics")
        self.add_course("PHYS101", "General Physics I", 4, "Introduction to mechanics and thermodynamics")
        
        # Add sample faculty
        self.add_faculty("Dr. Alan Turing", "alan.turing@college.edu", "Computer Science", "Professor")
        self.add_faculty("Dr. Ada Lovelace", "ada.lovelace@college.edu", "Mathematics", "Associate Professor")
        self.add_faculty("Dr. Isaac Newton", "isaac.newton@college.edu", "Physics", "Professor")

    # Student Management Methods
    def add_student(self, name, email, major, year):
        """Add a new student"""
        student_id = self._generate_id()
        student = Student(student_id, name, email, major, year)
        self.students[student_id] = student
        return student

    def get_student(self, student_id):
        """Get a student by ID"""
        return self.students.get(student_id)

    def get_all_students(self):
        """Get all students"""
        return list(self.students.values())

    def search_students(self, search_term):
        """Search students by name or ID"""
        results = []
        search_term = search_term.lower()
        for student in self.students.values():
            if (search_term in student.name.lower() or 
                search_term in student.student_id.lower() or
                search_term in student.email.lower() or
                search_term in student.major.lower()):
                results.append(student)
        return results

    def update_student(self, student_id, name=None, email=None, major=None, year=None):
        """Update student information"""
        if student_id not in self.students:
            return False
        
        student = self.students[student_id]
        if name is not None:
            student.name = name
        if email is not None:
            student.email = email
        if major is not None:
            student.major = major
        if year is not None:
            student.year = year
        return True

    def delete_student(self, student_id):
        """Delete a student"""
        if student_id in self.students:
            # Remove student from all courses
            student = self.students[student_id]
            for course in student.enrolled_courses[:]:  # Use slice to avoid modifying list during iteration
                student.drop_course(course)
            
            # Remove all grades for this student
            grades_to_remove = []
            for key in self.grades:
                if key[0] == student_id:
                    grades_to_remove.append(key)
            
            for key in grades_to_remove:
                del self.grades[key]
            
            del self.students[student_id]
            return True
        return False

    # Course Management Methods
    def add_course(self, course_code, course_name, credits, description=""):
        """Add a new course"""
        if course_code in self.courses:
            return None  # Course already exists
        
        course = Course(course_code, course_name, credits, description)
        self.courses[course_code] = course
        return course

    def get_course(self, course_code):
        """Get a course by code"""
        return self.courses.get(course_code)

    def get_all_courses(self):
        """Get all courses"""
        return list(self.courses.values())

    def search_courses(self, search_term):
        """Search courses by code or name"""
        results = []
        search_term = search_term.lower()
        for course in self.courses.values():
            if (search_term in course.course_code.lower() or 
                search_term in course.course_name.lower() or
                search_term in course.description.lower()):
                results.append(course)
        return results

    def update_course(self, course_code, course_name=None, credits=None, description=None):
        """Update course information"""
        if course_code not in self.courses:
            return False
        
        course = self.courses[course_code]
        if course_name is not None:
            course.course_name = course_name
        if credits is not None:
            course.credits = credits
        if description is not None:
            course.description = description
        return True

    def delete_course(self, course_code):
        """Delete a course"""
        if course_code in self.courses:
            course = self.courses[course_code]
            
            # Remove course from all students
            for student in course.enrolled_students[:]:  # Use slice to avoid modifying list during iteration
                student.drop_course(course)
            
            # Remove all grades for this course
            grades_to_remove = []
            for key in self.grades:
                if key[1] == course_code:
                    grades_to_remove.append(key)
            
            for key in grades_to_remove:
                del self.grades[key]
            
            del self.courses[course_code]
            return True
        return False

    def assign_faculty_to_course(self, course_code, faculty_id):
        """Assign faculty to a course"""
        course = self.get_course(course_code)
        faculty = self.get_faculty(faculty_id)
        
        if course and faculty:
            faculty.assign_course(course)
            return True
        return False

    # Faculty Management Methods
    def add_faculty(self, name, email, department, position):
        """Add a new faculty member"""
        faculty_id = self._generate_id()
        faculty = Faculty(faculty_id, name, email, department, position)
        self.faculty[faculty_id] = faculty
        return faculty

    def get_faculty(self, faculty_id):
        """Get a faculty member by ID"""
        return self.faculty.get(faculty_id)

    def get_all_faculty(self):
        """Get all faculty members"""
        return list(self.faculty.values())

    def search_faculty(self, search_term):
        """Search faculty by name or ID"""
        results = []
        search_term = search_term.lower()
        for faculty in self.faculty.values():
            if (search_term in faculty.name.lower() or 
                search_term in faculty.faculty_id.lower() or
                search_term in faculty.email.lower() or
                search_term in faculty.department.lower() or
                search_term in faculty.position.lower()):
                results.append(faculty)
        return results

    def update_faculty(self, faculty_id, name=None, email=None, department=None, position=None):
        """Update faculty information"""
        if faculty_id not in self.faculty:
            return False
        
        faculty = self.faculty[faculty_id]
        if name is not None:
            faculty.name = name
        if email is not None:
            faculty.email = email
        if department is not None:
            faculty.department = department
        if position is not None:
            faculty.position = position
        return True

    def delete_faculty(self, faculty_id):
        """Delete a faculty member"""
        if faculty_id in self.faculty:
            faculty = self.faculty[faculty_id]
            
            # Remove faculty from all assigned courses
            for course in faculty.assigned_courses[:]:  # Use slice to avoid modifying list during iteration
                faculty.remove_course(course)
            
            del self.faculty[faculty_id]
            return True
        return False

    # Grade Management Methods
    def add_grade(self, student_id, course_code, grade, semester, year):
        """Add a grade for a student in a course"""
        student = self.get_student(student_id)
        course = self.get_course(course_code)
        
        if student and course:
            # Check if student is enrolled in the course
            if course in student.enrolled_courses:
                key = (student_id, course_code)
                grade_obj = Grade(student, course, grade, semester, year)
                self.grades[key] = grade_obj
                return True
            else:
                # Enroll student in course if not already enrolled
                student.enroll_in_course(course)
                key = (student_id, course_code)
                grade_obj = Grade(student, course, grade, semester, year)
                self.grades[key] = grade_obj
                return True
        return False

    def get_grade(self, student_id, course_code):
        """Get a specific grade for a student in a course"""
        key = (student_id, course_code)
        return self.grades.get(key)

    def get_student_grades(self, student_id):
        """Get all grades for a specific student"""
        student_grades = []
        for key, grade in self.grades.items():
            if key[0] == student_id:
                student_grades.append(grade)
        return student_grades

    def get_course_grades(self, course_code):
        """Get all grades for a specific course"""
        course_grades = []
        for key, grade in self.grades.items():
            if key[1] == course_code:
                course_grades.append(grade)
        return course_grades

    def update_grade(self, student_id, course_code, new_grade):
        """Update a grade for a student in a course"""
        key = (student_id, course_code)
        if key in self.grades:
            self.grades[key].grade = new_grade
            return True
        return False

    # Report Generation Methods
    def generate_student_report(self):
        """Generate a report of all students"""
        print("\n--- STUDENT REPORT ---")
        students = self.get_all_students()
        if not students:
            print("No students found.")
            return
        
        print(f"{'ID':<10} {'Name':<20} {'Email':<25} {'Major':<20} {'Year':<5}")
        print("-" * 85)
        for student in students:
            print(f"{student.student_id:<10} {student.name:<20} {student.email:<25} {student.major:<20} {student.year:<5}")

    def generate_course_report(self):
        """Generate a report of all courses"""
        print("\n--- COURSE REPORT ---")
        courses = self.get_all_courses()
        if not courses:
            print("No courses found.")
            return
        
        print(f"{'Code':<10} {'Name':<30} {'Credits':<8} {'Enrolled':<10} {'Faculty':<20}")
        print("-" * 80)
        for course in courses:
            faculty_name = course.assigned_faculty.name if course.assigned_faculty else "Unassigned"
            enrolled_count = len(course.enrolled_students)
            print(f"{course.course_code:<10} {course.course_name:<30} {course.credits:<8} {enrolled_count:<10} {faculty_name:<20}")

    def generate_faculty_report(self):
        """Generate a report of all faculty"""
        print("\n--- FACULTY REPORT ---")
        faculty_list = self.get_all_faculty()
        if not faculty_list:
            print("No faculty found.")
            return
        
        print(f"{'ID':<10} {'Name':<25} {'Email':<30} {'Department':<15} {'Position':<20}")
        print("-" * 95)
        for faculty in faculty_list:
            print(f"{faculty.faculty_id:<10} {faculty.name:<25} {faculty.email:<30} {faculty.department:<15} {faculty.position:<20}")

    def generate_grade_report(self):
        """Generate a report of all grades"""
        print("\n--- GRADE REPORT ---")
        if not self.grades:
            print("No grades found.")
            return
        
        print(f"{'Student':<20} {'Course':<20} {'Grade':<8} {'Semester':<12} {'Year':<6}")
        print("-" * 70)
        for grade in self.grades.values():
            print(f"{grade.student.name:<20} {grade.course.course_name:<20} {grade.grade:<8} {grade.semester:<12} {grade.year:<6}")

    def get_student_gpa(self, student_id):
        """Calculate and return the GPA for a student"""
        student_grades = self.get_student_grades(student_id)
        if not student_grades:
            return 0.0
        
        total_points = 0
        total_credits = 0
        
        grade_points = {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'F': 0.0
        }
        
        for grade_obj in student_grades:
            course = grade_obj.course
            grade_letter = grade_obj.grade.upper()
            
            if grade_letter in grade_points:
                points = grade_points[grade_letter]
                total_points += points * course.credits
                total_credits += course.credits
        
        if total_credits == 0:
            return 0.0
        
        return round(total_points / total_credits, 2)