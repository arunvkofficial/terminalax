import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    hireDate: ''
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get('/api/faculty');
      setFaculty(response.data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingFaculty) {
        // Update existing faculty
        await axios.put(`/api/faculty/${editingFaculty.id}`, formData);
      } else {
        // Create new faculty
        await axios.post('/api/faculty', formData);
      }
      
      // Reset form and refresh data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        hireDate: ''
      });
      setEditingFaculty(null);
      setShowForm(false);
      fetchFaculty();
    } catch (error) {
      console.error('Error saving faculty:', error);
    }
  };

  const handleEdit = (facultyMember) => {
    setFormData({
      firstName: facultyMember.firstName,
      lastName: facultyMember.lastName,
      email: facultyMember.email,
      phone: facultyMember.phone,
      department: facultyMember.department,
      position: facultyMember.position,
      hireDate: facultyMember.hireDate
    });
    setEditingFaculty(facultyMember);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        await axios.delete(`/api/faculty/${id}`);
        fetchFaculty();
      } catch (error) {
        console.error('Error deleting faculty:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      hireDate: ''
    });
    setEditingFaculty(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Faculty</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          Add Faculty
        </button>
      </div>

      {/* Faculty Form */}
      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
                <input
                  type="date"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="btn btn-primary">
                {editingFaculty ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Faculty Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Hire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((facultyMember) => (
                <tr key={facultyMember.id}>
                  <td>
                    <div className="font-medium">{facultyMember.firstName} {facultyMember.lastName}</div>
                    <div className="text-sm text-gray-500">ID: {facultyMember.id.substring(0, 8)}...</div>
                  </td>
                  <td>{facultyMember.email}</td>
                  <td>{facultyMember.department}</td>
                  <td>{facultyMember.position}</td>
                  <td>{new Date(facultyMember.hireDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(facultyMember)}
                      className="btn btn-primary text-sm mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(facultyMember.id)}
                      className="btn btn-danger text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Faculty;