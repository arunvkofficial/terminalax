#!/usr/bin/env python3
"""
Example usage of the College Management System
Demonstrates how to use the system programmatically
"""

from controllers.college_controller import CollegeController

def example_usage():
    print("Example Usage of College Management System")
    print("="*50)
    
    # Create a college controller instance
    college = CollegeController()
    
    print("\n1. Adding new students:")
    student1 = college.add_student("Emma Wilson", "emma.w@college.edu", "Computer Science", 3)
    student2 = college.add_student("Michael Brown", "michael.b@college.edu", "Mathematics", 2)
    print(f"   - Added: {student1.name}")
    print(f"   - Added: {student2.name}")
    
    print("\n2. Adding new courses:")
    course1 = college.add_course("CS201", "Data Structures", 3, "Advanced programming concepts")
    course2 = college.add_course("MATH301", "Linear Algebra", 4, "Vector spaces and matrices")
    print(f"   - Added: {course1.course_name}")
    print(f"   - Added: {course2.course_name}")
    
    print("\n3. Adding faculty members:")
    faculty1 = college.add_faculty("Dr. Sarah Johnson", "sarah.j@college.edu", "Computer Science", "Associate Professor")
    faculty2 = college.add_faculty("Dr. Robert Davis", "robert.d@college.edu", "Mathematics", "Professor")
    print(f"   - Added: {faculty1.name}")
    print(f"   - Added: {faculty2.name}")
    
    print("\n4. Assigning faculty to courses:")
    college.assign_faculty_to_course("CS201", faculty1.faculty_id)
    college.assign_faculty_to_course("MATH301", faculty2.faculty_id)
    print(f"   - Assigned {faculty1.name} to {course1.course_name}")
    print(f"   - Assigned {faculty2.name} to {course2.course_name}")
    
    print("\n5. Enrolling students in courses and adding grades:")
    # Enroll students in courses and add grades
    college.add_grade(student1.student_id, "CS201", "A", "Spring", 2024)
    college.add_grade(student1.student_id, "MATH301", "B+", "Spring", 2024)
    college.add_grade(student2.student_id, "MATH301", "A-", "Spring", 2024)
    print(f"   - Added grades for {student1.name}")
    print(f"   - Added grades for {student2.name}")
    
    print("\n6. Searching for students:")
    search_results = college.search_students("Emma")
    for student in search_results:
        print(f"   - Found: {student.name} (ID: {student.student_id})")
    
    print("\n7. Getting student grades:")
    grades = college.get_student_grades(student1.student_id)
    print(f"   - Grades for {student1.name}:")
    for grade in grades:
        print(f"     * {grade.course.course_name}: {grade.grade} ({grade.semester} {grade.year})")
    
    print("\n8. Generating reports:")
    print("   - Student Report:")
    college.generate_student_report()
    
    print("\n   - Course Report:")
    college.generate_course_report()
    
    print("\n   - Faculty Report:")
    college.generate_faculty_report()
    
    print("\n   - Grade Report:")
    college.generate_grade_report()
    
    print("\nExample usage completed successfully!")

if __name__ == "__main__":
    example_usage()