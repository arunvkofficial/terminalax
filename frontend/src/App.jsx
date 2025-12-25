import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Students from './components/Students';
import Courses from './components/Courses';
import Faculty from './components/Faculty';
import Grades from './components/Grades';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center text-xl font-bold">
                College Management System
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/students" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/students' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                Students
              </Link>
              <Link 
                to="/courses" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/courses' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                Courses
              </Link>
              <Link 
                to="/faculty" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/faculty' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                Faculty
              </Link>
              <Link 
                to="/grades" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/grades' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                Grades
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/grades" element={<Grades />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;