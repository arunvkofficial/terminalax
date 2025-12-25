"""
Course model for the College Management System
"""

class Course:
    def __init__(self, course_code, course_name, credits, description=""):
        self.course_code = course_code
        self.course_name = course_name
        self.credits = credits
        self.description = description
        self.enrolled_students = []
        self.assigned_faculty = None

    def __str__(self):
        return f"Course(Code: {self.course_code}, Name: {self.course_name}, Credits: {self.credits})"

    def add_student(self, student):
        """Add a student to the course"""
        if student not in self.enrolled_students:
            self.enrolled_students.append(student)
            return True
        return False

    def remove_student(self, student):
        """Remove a student from the course"""
        if student in self.enrolled_students:
            self.enrolled_students.remove(student)
            return True
        return False

    def assign_faculty(self, faculty):
        """Assign faculty to the course"""
        self.assigned_faculty = faculty
        return True

    def get_enrolled_students(self):
        """Get list of enrolled students"""
        return self.enrolled_students