// Simple script to create a basic frontend build without using npm
const fs = require('fs');
const path = require('path');

// Create dist directory
const distDir = path.join(__dirname, 'frontend', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML file
const htmlContent = fs.readFileSync(path.join(__dirname, 'frontend', 'index.html'), 'utf8');
fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent);

// Create a basic JS bundle
const jsBundle = `
// React and ReactDOM (simplified for demo)
// In a real app, you'd use proper bundling

// Simple routing implementation
const routes = {
  '/': renderDashboard,
  '/students': renderStudents,
  '/courses': renderCourses,
  '/faculty': renderFaculty,
  '/grades': renderGrades
};

function navigateTo(path) {
  window.history.pushState({}, '', path);
  render();
}

function render() {
  const content = routes[window.location.pathname] || routes['/'];
  document.getElementById('root').innerHTML = content();
}

function renderDashboard() {
  return \`
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-blue-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="flex-shrink-0 flex items-center text-xl font-bold">
                College Management System
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Dashboard
              </a>
              <a href="/students" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/students' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Students
              </a>
              <a href="/courses" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/courses' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Courses
              </a>
              <a href="/faculty" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/faculty' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Faculty
              </a>
              <a href="/grades" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/grades' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Grades
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto px-4 py-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900">Students</h3>
              <p class="text-3xl font-bold text-blue-600 mt-2" id="student-count">0</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900">Courses</h3>
              <p class="text-3xl font-bold text-green-600 mt-2" id="course-count">0</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900">Faculty</h3>
              <p class="text-3xl font-bold text-purple-600 mt-2" id="faculty-count">0</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900">Grades</h3>
              <p class="text-3xl font-bold text-yellow-600 mt-2" id="grade-count">0</p>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white p-6 rounded-lg shadow mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/students" class="bg-blue-100 p-4 rounded-lg text-center hover:bg-blue-200 transition-colors">
                <h3 class="font-medium text-blue-800">Manage Students</h3>
              </a>
              <a href="/courses" class="bg-green-100 p-4 rounded-lg text-center hover:bg-green-200 transition-colors">
                <h3 class="font-medium text-green-800">Manage Courses</h3>
              </a>
              <a href="/faculty" class="bg-purple-100 p-4 rounded-lg text-center hover:bg-purple-200 transition-colors">
                <h3 class="font-medium text-purple-800">Manage Faculty</h3>
              </a>
              <a href="/grades" class="bg-yellow-100 p-4 rounded-lg text-center hover:bg-yellow-200 transition-colors">
                <h3 class="font-medium text-yellow-800">Manage Grades</h3>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  \`;
}

function renderStudents() {
  return \`
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-blue-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="flex-shrink-0 flex items-center text-xl font-bold">
                College Management System
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Dashboard
              </a>
              <a href="/students" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/students' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Students
              </a>
              <a href="/courses" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/courses' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Courses
              </a>
              <a href="/faculty" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/faculty' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Faculty
              </a>
              <a href="/grades" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/grades' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Grades
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto px-4 py-6">
        <div>
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Students</h1>
            <button onclick="showStudentForm()" class="btn btn-primary">
              Add Student
            </button>
          </div>
          
          <div id="student-form" class="card mb-6" style="display:none;">
            <h2 class="text-xl font-semibold mb-4">Add New Student</h2>
            <form id="student-form-element" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" name="firstName" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" name="lastName" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" name="phone" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" name="dateOfBirth" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                  <input type="date" name="enrollmentDate" class="form-control" required>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" name="address" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" class="form-control" required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div class="flex space-x-2">
                <button type="submit" class="btn btn-primary">Create</button>
                <button type="button" onclick="hideStudentForm()" class="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>

          <div class="card">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="students-table-body">
                  <tr><td colspan="5" class="text-center">Loading...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
    <script>
      function showStudentForm() {
        document.getElementById('student-form').style.display = 'block';
        document.getElementById('student-form-element').addEventListener('submit', function(e) {
          e.preventDefault();
          // Form submission would happen here
          alert('Student added successfully!');
          hideStudentForm();
          loadStudents();
        });
      }
      
      function hideStudentForm() {
        document.getElementById('student-form').style.display = 'none';
        document.getElementById('student-form-element').reset();
      }
      
      function loadStudents() {
        // Load students from API would happen here
        document.getElementById('students-table-body').innerHTML = '<tr><td colspan="5" class="text-center">No students found</td></tr>';
      }
      
      // Load students when page loads
      loadStudents();
    </script>
  \`;
}

function renderCourses() {
  return \`
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-blue-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="flex-shrink-0 flex items-center text-xl font-bold">
                College Management System
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Dashboard
              </a>
              <a href="/students" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/students' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Students
              </a>
              <a href="/courses" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/courses' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Courses
              </a>
              <a href="/faculty" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/faculty' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Faculty
              </a>
              <a href="/grades" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/grades' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Grades
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto px-4 py-6">
        <div>
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Courses</h1>
            <button onclick="showCourseForm()" class="btn btn-primary">
              Add Course
            </button>
          </div>
          
          <div id="course-form" class="card mb-6" style="display:none;">
            <h2 class="text-xl font-semibold mb-4">Add New Course</h2>
            <form id="course-form-element" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                  <input type="text" name="courseCode" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <input type="text" name="courseName" class="form-control" required>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea name="description" class="form-control" rows="3" required></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                  <input type="number" name="credits" class="form-control" min="1" max="10" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input type="text" name="department" class="form-control" required>
                </div>
              </div>
              <div class="flex space-x-2">
                <button type="submit" class="btn btn-primary">Create</button>
                <button type="button" onclick="hideCourseForm()" class="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>

          <div class="card">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Credits</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="courses-table-body">
                  <tr><td colspan="5" class="text-center">Loading...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
    <script>
      function showCourseForm() {
        document.getElementById('course-form').style.display = 'block';
        document.getElementById('course-form-element').addEventListener('submit', function(e) {
          e.preventDefault();
          // Form submission would happen here
          alert('Course added successfully!');
          hideCourseForm();
          loadCourses();
        });
      }
      
      function hideCourseForm() {
        document.getElementById('course-form').style.display = 'none';
        document.getElementById('course-form-element').reset();
      }
      
      function loadCourses() {
        // Load courses from API would happen here
        document.getElementById('courses-table-body').innerHTML = '<tr><td colspan="5" class="text-center">No courses found</td></tr>';
      }
      
      // Load courses when page loads
      loadCourses();
    </script>
  \`;
}

function renderFaculty() {
  return \`
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-blue-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="flex-shrink-0 flex items-center text-xl font-bold">
                College Management System
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Dashboard
              </a>
              <a href="/students" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/students' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Students
              </a>
              <a href="/courses" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/courses' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Courses
              </a>
              <a href="/faculty" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/faculty' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Faculty
              </a>
              <a href="/grades" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/grades' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Grades
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto px-4 py-6">
        <div>
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Faculty</h1>
            <button onclick="showFacultyForm()" class="btn btn-primary">
              Add Faculty
            </button>
          </div>
          
          <div id="faculty-form" class="card mb-6" style="display:none;">
            <h2 class="text-xl font-semibold mb-4">Add New Faculty</h2>
            <form id="faculty-form-element" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" name="firstName" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" name="lastName" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" name="phone" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input type="text" name="department" class="form-control" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input type="text" name="position" class="form-control" required>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
                  <input type="date" name="hireDate" class="form-control" required>
                </div>
              </div>
              <div class="flex space-x-2">
                <button type="submit" class="btn btn-primary">Create</button>
                <button type="button" onclick="hideFacultyForm()" class="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>

          <div class="card">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="faculty-table-body">
                  <tr><td colspan="5" class="text-center">Loading...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
    <script>
      function showFacultyForm() {
        document.getElementById('faculty-form').style.display = 'block';
        document.getElementById('faculty-form-element').addEventListener('submit', function(e) {
          e.preventDefault();
          // Form submission would happen here
          alert('Faculty added successfully!');
          hideFacultyForm();
          loadFaculty();
        });
      }
      
      function hideFacultyForm() {
        document.getElementById('faculty-form').style.display = 'none';
        document.getElementById('faculty-form-element').reset();
      }
      
      function loadFaculty() {
        // Load faculty from API would happen here
        document.getElementById('faculty-table-body').innerHTML = '<tr><td colspan="5" class="text-center">No faculty found</td></tr>';
      }
      
      // Load faculty when page loads
      loadFaculty();
    </script>
  \`;
}

function renderGrades() {
  return \`
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-blue-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="flex-shrink-0 flex items-center text-xl font-bold">
                College Management System
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Dashboard
              </a>
              <a href="/students" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/students' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Students
              </a>
              <a href="/courses" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/courses' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Courses
              </a>
              <a href="/faculty" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/faculty' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Faculty
              </a>
              <a href="/grades" class="px-3 py-2 rounded-md text-sm font-medium \${window.location.pathname === '/grades' ? 'bg-blue-700' : 'hover:bg-blue-700'}">
                Grades
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto px-4 py-6">
        <div>
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Grades</h1>
            <button onclick="showGradeForm()" class="btn btn-primary">
              Add Grade
            </button>
          </div>
          
          <div id="grade-form" class="card mb-6" style="display:none;">
            <h2 class="text-xl font-semibold mb-4">Add New Grade</h2>
            <form id="grade-form-element" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <select name="studentId" class="form-control" required>
                    <option value="">Select Student</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select name="courseId" class="form-control" required>
                    <option value="">Select Course</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <select name="grade" class="form-control" required>
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
                  <label class="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select name="semester" class="form-control" required>
                    <option value="">Select Semester</option>
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input type="number" name="year" class="form-control" min="2000" max="2100" required>
                </div>
              </div>
              <div class="flex space-x-2">
                <button type="submit" class="btn btn-primary">Create</button>
                <button type="button" onclick="hideGradeForm()" class="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>

          <div class="card">
            <div class="table-container">
              <table class="table">
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
                <tbody id="grades-table-body">
                  <tr><td colspan="6" class="text-center">Loading...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
    <script>
      function showGradeForm() {
        document.getElementById('grade-form').style.display = 'block';
        document.getElementById('grade-form-element').addEventListener('submit', function(e) {
          e.preventDefault();
          // Form submission would happen here
          alert('Grade added successfully!');
          hideGradeForm();
          loadGrades();
        });
      }
      
      function hideGradeForm() {
        document.getElementById('grade-form').style.display = 'none';
        document.getElementById('grade-form-element').reset();
      }
      
      function loadGrades() {
        // Load grades from API would happen here
        document.getElementById('grades-table-body').innerHTML = '<tr><td colspan="6" class="text-center">No grades found</td></tr>';
      }
      
      // Load grades when page loads
      loadGrades();
    </script>
  \`;
}

// Handle navigation
window.addEventListener('popstate', render);
document.addEventListener('DOMContentLoaded', function() {
  render();
  
  // Load dashboard stats
  if (window.location.pathname === '/') {
    // Simulate loading stats
    setTimeout(() => {
      document.getElementById('student-count').textContent = '2';
      document.getElementById('course-count').textContent = '2';
      document.getElementById('faculty-count').textContent = '2';
      document.getElementById('grade-count').textContent = '2';
    }, 500);
  }
});

// API functions
async function apiGet(endpoint) {
  try {
    const response = await fetch(\`/api\${endpoint}\`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

async function apiPost(endpoint, data) {
  try {
    const response = await fetch(\`/api\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

async function apiPut(endpoint, data) {
  try {
    const response = await fetch(\`/api\${endpoint}\`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

async function apiDelete(endpoint) {
  try {
    const response = await fetch(\`/api\${endpoint}\`, {
      method: 'DELETE'
    });
    return response.status === 204;
  } catch (error) {
    console.error('API Error:', error);
    return false;
  }
}
`;

fs.writeFileSync(path.join(distDir, 'assets.js'), jsBundle);

// Copy CSS file
const cssContent = fs.readFileSync(path.join(__dirname, 'frontend', 'src', 'index.css'), 'utf8');
fs.writeFileSync(path.join(distDir, 'style.css'), cssContent);

console.log('Frontend build completed successfully!');