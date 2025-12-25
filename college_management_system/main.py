#!/usr/bin/env python3
"""
College Management System
Main application entry point
"""

from models.student import Student
from models.course import Course
from models.faculty import Faculty
from models.grade import Grade
from controllers.college_controller import CollegeController

def main():
    print("Welcome to the College Management System!")
    
    # Initialize the college controller
    college = CollegeController()
    
    # Main menu loop
    while True:
        print("\n" + "="*50)
        print("COLLEGE MANAGEMENT SYSTEM")
        print("="*50)
        print("1. Student Management")
        print("2. Course Management")
        print("3. Faculty Management")
        print("4. Grade Management")
        print("5. Generate Reports")
        print("6. Exit")
        print("-"*50)
        
        choice = input("Enter your choice (1-6): ").strip()
        
        if choice == '1':
            student_menu(college)
        elif choice == '2':
            course_menu(college)
        elif choice == '3':
            faculty_menu(college)
        elif choice == '4':
            grade_menu(college)
        elif choice == '5':
            report_menu(college)
        elif choice == '6':
            print("Thank you for using the College Management System!")
            break
        else:
            print("Invalid choice. Please try again.")

def student_menu(college):
    """Student management submenu"""
    while True:
        print("\n--- STUDENT MANAGEMENT ---")
        print("1. Add Student")
        print("2. View All Students")
        print("3. Search Student")
        print("4. Update Student")
        print("5. Delete Student")
        print("6. Back to Main Menu")
        
        choice = input("Enter your choice (1-6): ").strip()
        
        if choice == '1':
            # Add student
            name = input("Enter student name: ")
            email = input("Enter student email: ")
            major = input("Enter student major: ")
            year = int(input("Enter student year (1-4): "))
            student = college.add_student(name, email, major, year)
            if student:
                print(f"Student {student.name} added successfully with ID: {student.student_id}")
        elif choice == '2':
            # View all students
            students = college.get_all_students()
            if students:
                print("\nAll Students:")
                for student in students:
                    print(f"ID: {student.student_id}, Name: {student.name}, Email: {student.email}, Major: {student.major}, Year: {student.year}")
            else:
                print("No students found.")
        elif choice == '3':
            # Search student
            search_term = input("Enter student name or ID to search: ")
            students = college.search_students(search_term)
            if students:
                print("\nSearch Results:")
                for student in students:
                    print(f"ID: {student.student_id}, Name: {student.name}, Email: {student.email}, Major: {student.major}, Year: {student.year}")
            else:
                print("No students found matching the search term.")
        elif choice == '4':
            # Update student
            student_id = input("Enter student ID to update: ")
            name = input("Enter new name (or press Enter to skip): ")
            email = input("Enter new email (or press Enter to skip): ")
            major = input("Enter new major (or press Enter to skip): ")
            year_input = input("Enter new year (or press Enter to skip): ")
            
            name = name if name else None
            email = email if email else None
            major = major if major else None
            year = int(year_input) if year_input else None
            
            success = college.update_student(student_id, name, email, major, year)
            if success:
                print("Student updated successfully.")
            else:
                print("Student not found.")
        elif choice == '5':
            # Delete student
            student_id = input("Enter student ID to delete: ")
            success = college.delete_student(student_id)
            if success:
                print("Student deleted successfully.")
            else:
                print("Student not found.")
        elif choice == '6':
            break
        else:
            print("Invalid choice. Please try again.")

def course_menu(college):
    """Course management submenu"""
    while True:
        print("\n--- COURSE MANAGEMENT ---")
        print("1. Add Course")
        print("2. View All Courses")
        print("3. Search Course")
        print("4. Update Course")
        print("5. Delete Course")
        print("6. Assign Faculty to Course")
        print("7. Back to Main Menu")
        
        choice = input("Enter your choice (1-7): ").strip()
        
        if choice == '1':
            # Add course
            course_code = input("Enter course code: ")
            course_name = input("Enter course name: ")
            credits = int(input("Enter course credits: "))
            description = input("Enter course description: ")
            course = college.add_course(course_code, course_name, credits, description)
            if course:
                print(f"Course {course.course_name} added successfully with code: {course.course_code}")
        elif choice == '2':
            # View all courses
            courses = college.get_all_courses()
            if courses:
                print("\nAll Courses:")
                for course in courses:
                    print(f"Code: {course.course_code}, Name: {course.course_name}, Credits: {course.credits}, Description: {course.description}")
            else:
                print("No courses found.")
        elif choice == '3':
            # Search course
            search_term = input("Enter course code or name to search: ")
            courses = college.search_courses(search_term)
            if courses:
                print("\nSearch Results:")
                for course in courses:
                    print(f"Code: {course.course_code}, Name: {course.course_name}, Credits: {course.credits}, Description: {course.description}")
            else:
                print("No courses found matching the search term.")
        elif choice == '4':
            # Update course
            course_code = input("Enter course code to update: ")
            course_name = input("Enter new course name (or press Enter to skip): ")
            credits_input = input("Enter new credits (or press Enter to skip): ")
            description = input("Enter new description (or press Enter to skip): ")
            
            course_name = course_name if course_name else None
            credits = int(credits_input) if credits_input else None
            description = description if description else None
            
            success = college.update_course(course_code, course_name, credits, description)
            if success:
                print("Course updated successfully.")
            else:
                print("Course not found.")
        elif choice == '5':
            # Delete course
            course_code = input("Enter course code to delete: ")
            success = college.delete_course(course_code)
            if success:
                print("Course deleted successfully.")
            else:
                print("Course not found.")
        elif choice == '6':
            # Assign faculty to course
            course_code = input("Enter course code: ")
            faculty_id = input("Enter faculty ID: ")
            success = college.assign_faculty_to_course(course_code, faculty_id)
            if success:
                print("Faculty assigned to course successfully.")
            else:
                print("Failed to assign faculty to course. Check if course and faculty exist.")
        elif choice == '7':
            break
        else:
            print("Invalid choice. Please try again.")

def faculty_menu(college):
    """Faculty management submenu"""
    while True:
        print("\n--- FACULTY MANAGEMENT ---")
        print("1. Add Faculty")
        print("2. View All Faculty")
        print("3. Search Faculty")
        print("4. Update Faculty")
        print("5. Delete Faculty")
        print("6. Back to Main Menu")
        
        choice = input("Enter your choice (1-6): ").strip()
        
        if choice == '1':
            # Add faculty
            name = input("Enter faculty name: ")
            email = input("Enter faculty email: ")
            department = input("Enter faculty department: ")
            position = input("Enter faculty position: ")
            faculty = college.add_faculty(name, email, department, position)
            if faculty:
                print(f"Faculty {faculty.name} added successfully with ID: {faculty.faculty_id}")
        elif choice == '2':
            # View all faculty
            faculty_list = college.get_all_faculty()
            if faculty_list:
                print("\nAll Faculty:")
                for fac in faculty_list:
                    print(f"ID: {fac.faculty_id}, Name: {fac.name}, Email: {fac.email}, Department: {fac.department}, Position: {fac.position}")
            else:
                print("No faculty found.")
        elif choice == '3':
            # Search faculty
            search_term = input("Enter faculty name or ID to search: ")
            faculty_list = college.search_faculty(search_term)
            if faculty_list:
                print("\nSearch Results:")
                for fac in faculty_list:
                    print(f"ID: {fac.faculty_id}, Name: {fac.name}, Email: {fac.email}, Department: {fac.department}, Position: {fac.position}")
            else:
                print("No faculty found matching the search term.")
        elif choice == '4':
            # Update faculty
            faculty_id = input("Enter faculty ID to update: ")
            name = input("Enter new name (or press Enter to skip): ")
            email = input("Enter new email (or press Enter to skip): ")
            department = input("Enter new department (or press Enter to skip): ")
            position = input("Enter new position (or press Enter to skip): ")
            
            name = name if name else None
            email = email if email else None
            department = department if department else None
            position = position if position else None
            
            success = college.update_faculty(faculty_id, name, email, department, position)
            if success:
                print("Faculty updated successfully.")
            else:
                print("Faculty not found.")
        elif choice == '5':
            # Delete faculty
            faculty_id = input("Enter faculty ID to delete: ")
            success = college.delete_faculty(faculty_id)
            if success:
                print("Faculty deleted successfully.")
            else:
                print("Faculty not found.")
        elif choice == '6':
            break
        else:
            print("Invalid choice. Please try again.")

def grade_menu(college):
    """Grade management submenu"""
    while True:
        print("\n--- GRADE MANAGEMENT ---")
        print("1. Add Grade")
        print("2. View Student Grades")
        print("3. View Course Grades")
        print("4. Update Grade")
        print("5. Back to Main Menu")
        
        choice = input("Enter your choice (1-5): ").strip()
        
        if choice == '1':
            # Add grade
            student_id = input("Enter student ID: ")
            course_code = input("Enter course code: ")
            grade_value = input("Enter grade (A, B, C, D, F, or numeric): ")
            semester = input("Enter semester: ")
            year = int(input("Enter year: "))
            
            success = college.add_grade(student_id, course_code, grade_value, semester, year)
            if success:
                print("Grade added successfully.")
            else:
                print("Failed to add grade. Check if student and course exist.")
        elif choice == '2':
            # View student grades
            student_id = input("Enter student ID: ")
            grades = college.get_student_grades(student_id)
            if grades:
                print(f"\nGrades for Student ID: {student_id}")
                for grade in grades:
                    print(f"Course: {grade.course.course_code} - {grade.course.course_name}, Grade: {grade.grade}, Semester: {grade.semester}, Year: {grade.year}")
            else:
                print("No grades found for this student.")
        elif choice == '3':
            # View course grades
            course_code = input("Enter course code: ")
            grades = college.get_course_grades(course_code)
            if grades:
                print(f"\nGrades for Course: {course_code}")
                for grade in grades:
                    print(f"Student: {grade.student.name} (ID: {grade.student.student_id}), Grade: {grade.grade}")
            else:
                print("No grades found for this course.")
        elif choice == '4':
            # Update grade
            student_id = input("Enter student ID: ")
            course_code = input("Enter course code: ")
            new_grade = input("Enter new grade: ")
            
            success = college.update_grade(student_id, course_code, new_grade)
            if success:
                print("Grade updated successfully.")
            else:
                print("Grade not found. Make sure the student is enrolled in the course.")
        elif choice == '5':
            break
        else:
            print("Invalid choice. Please try again.")

def report_menu(college):
    """Report generation submenu"""
    while True:
        print("\n--- REPORTS ---")
        print("1. Student Report")
        print("2. Course Report")
        print("3. Faculty Report")
        print("4. Grade Report")
        print("5. Back to Main Menu")
        
        choice = input("Enter your choice (1-5): ").strip()
        
        if choice == '1':
            # Student report
            college.generate_student_report()
        elif choice == '2':
            # Course report
            college.generate_course_report()
        elif choice == '3':
            # Faculty report
            college.generate_faculty_report()
        elif choice == '4':
            # Grade report
            college.generate_grade_report()
        elif choice == '5':
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()