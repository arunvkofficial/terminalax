"""
Student model for the College Management System
"""

class Student:
    def __init__(self, student_id, name, email, major, year):
        self.student_id = student_id
        self.name = name
        self.email = email
        self.major = major
        self.year = year
        self.enrolled_courses = []

    def __str__(self):
        return f"Student(ID: {self.student_id}, Name: {self.name}, Email: {self.email}, Major: {self.major}, Year: {self.year})"

    def enroll_in_course(self, course):
        """Enroll the student in a course"""
        if course not in self.enrolled_courses:
            self.enrolled_courses.append(course)
            course.add_student(self)
            return True
        return False

    def drop_course(self, course):
        """Drop a course from the student's enrollment"""
        if course in self.enrolled_courses:
            self.enrolled_courses.remove(course)
            course.remove_student(self)
            return True
        return False