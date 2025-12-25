"""
Grade model for the College Management System
"""

class Grade:
    def __init__(self, student, course, grade, semester, year):
        self.student = student
        self.course = course
        self.grade = grade
        self.semester = semester
        self.year = year

    def __str__(self):
        return f"Grade(Student: {self.student.name}, Course: {self.course.course_name}, Grade: {self.grade}, Semester: {self.semester}, Year: {self.year})"