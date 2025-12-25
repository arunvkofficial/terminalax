"""
Faculty model for the College Management System
"""

class Faculty:
    def __init__(self, faculty_id, name, email, department, position):
        self.faculty_id = faculty_id
        self.name = name
        self.email = email
        self.department = department
        self.position = position
        self.assigned_courses = []

    def __str__(self):
        return f"Faculty(ID: {self.faculty_id}, Name: {self.name}, Email: {self.email}, Department: {self.department}, Position: {self.position})"

    def assign_course(self, course):
        """Assign a course to the faculty"""
        if course not in self.assigned_courses:
            self.assigned_courses.append(course)
            course.assign_faculty(self)
            return True
        return False

    def remove_course(self, course):
        """Remove a course from the faculty's assignment"""
        if course in self.assigned_courses:
            self.assigned_courses.remove(course)
            course.assigned_faculty = None
            return True
        return False