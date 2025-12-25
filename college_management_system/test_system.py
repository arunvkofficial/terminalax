#!/usr/bin/env python3
"""
Test script for the College Management System
"""

from controllers.college_controller import CollegeController

def test_system():
    print("Testing College Management System...")
    
    # Initialize the college controller
    college = CollegeController()
    
    print("\n1. Testing initial sample data:")
    print(f"Students: {len(college.get_all_students())}")
    print(f"Courses: {len(college.get_all_courses())}")
    print(f"Faculty: {len(college.get_all_faculty())}")
    
    print("\n2. Testing student operations:")
    # Add a new student
    new_student = college.add_student("Alice Johnson", "alice.j@college.edu", "Biology", 2)
    print(f"Added student: {new_student.name} with ID: {new_student.student_id}")
    
    # Search for the student
    search_results = college.search_students("Alice")
    print(f"Search results for 'Alice': {len(search_results)} found")
    
    # Update student
    old_major = new_student.major
    college.update_student(new_student.student_id, major="Computer Science")
    print(f"Updated student major from '{old_major}' to '{new_student.major}'")
    
    print("\n3. Testing course operations:")
    # Add a new course
    new_course = college.add_course("BIO101", "Introduction to Biology", 4, "Basic biology concepts")
    print(f"Added course: {new_course.course_name} with code: {new_course.course_code}")
    
    # Search for the course
    course_results = college.search_courses("Biology")
    print(f"Search results for 'Biology': {len(course_results)} found")
    
    print("\n4. Testing faculty operations:")
    # Add a new faculty member
    new_faculty = college.add_faculty("Dr. Charles Darwin", "charles.d@college.edu", "Biology", "Professor")
    print(f"Added faculty: {new_faculty.name} with ID: {new_faculty.faculty_id}")
    
    # Assign faculty to course
    success = college.assign_faculty_to_course("BIO101", new_faculty.faculty_id)
    print(f"Assigned faculty to course: {success}")
    
    print("\n5. Testing grade operations:")
    # Add a grade
    student_id = college.get_all_students()[0].student_id  # Get first student
    success = college.add_grade(student_id, "CS101", "A", "Fall", 2023)
    print(f"Added grade for student {student_id} in CS101: {success}")
    
    # Get student grades
    grades = college.get_student_grades(student_id)
    print(f"Student {student_id} has {len(grades)} grades")
    
    print("\n6. Testing report generation:")
    print("Generating student report...")
    college.generate_student_report()
    
    print("\nGenerating course report...")
    college.generate_course_report()
    
    print("\n7. Testing data integrity:")
    print(f"Total students after operations: {len(college.get_all_students())}")
    print(f"Total courses after operations: {len(college.get_all_courses())}")
    print(f"Total faculty after operations: {len(college.get_all_faculty())}")
    
    print("\nAll tests completed successfully!")

if __name__ == "__main__":
    test_system()