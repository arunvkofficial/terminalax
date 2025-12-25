import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    faculty: 0,
    grades: 0
  });

  useEffect(() => {
    // Fetch statistics from the backend
    const fetchStats = async () => {
      try {
        const [studentsRes, coursesRes, facultyRes, gradesRes] = await Promise.all([
          axios.get('/api/students'),
          axios.get('/api/courses'),
          axios.get('/api/faculty'),
          axios.get('/api/grades')
        ]);

        setStats({
          students: studentsRes.data.length,
          courses: coursesRes.data.length,
          faculty: facultyRes.data.length,
          grades: gradesRes.data.length
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Students</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.students}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Courses</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.courses}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Faculty</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.faculty}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Grades</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.grades}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/students" className="bg-blue-100 p-4 rounded-lg text-center hover:bg-blue-200 transition-colors">
            <h3 className="font-medium text-blue-800">Manage Students</h3>
          </a>
          <a href="/courses" className="bg-green-100 p-4 rounded-lg text-center hover:bg-green-200 transition-colors">
            <h3 className="font-medium text-green-800">Manage Courses</h3>
          </a>
          <a href="/faculty" className="bg-purple-100 p-4 rounded-lg text-center hover:bg-purple-200 transition-colors">
            <h3 className="font-medium text-purple-800">Manage Faculty</h3>
          </a>
          <a href="/grades" className="bg-yellow-100 p-4 rounded-lg text-center hover:bg-yellow-200 transition-colors">
            <h3 className="font-medium text-yellow-800">Manage Grades</h3>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-600">Recent activity would be displayed here in a full implementation.</p>
      </div>
    </div>
  );
};

export default Dashboard;