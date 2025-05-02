import React, { useState, useEffect, useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Analytics from '../components/Analytics.jsx';


const Dashboard = () => {
  const { backendUrl, setisLoggedin, userData, setuserData, getUserData } = useContext(AppContent);
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendUrl}/api/project/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setProjects(res.data.projects);
      } else {
        toast.error(res.data.message || 'Failed to fetch projects.');
      }
    } catch (err) {
      console.error('API request failed:', err);
      toast.error('Something went wrong while fetching projects.');
    }
  };

  useEffect(() => {
    fetchProjects();
    getUserData();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${backendUrl}/api/project/create`,
        { title: projectTitle, description: projectDescription, userId: userData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success('Project created successfully!');
        setIsProjectModalOpen(false);
        fetchProjects();
      } else {
        toast.error(res.data.message || 'Failed to create project.');
      }
    } catch (err) {
      toast.error('Error creating project.');
      console.error(err);
    }
  };


  const goToProject = (id) => {
    navigate(`/project/${id}`);
  };

  const [allTasks, setAllTasks] = useState([]);

  const fetchAllTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication required.');
        navigate('/login');
        return;
      }

      const res = await axios.get(`${backendUrl}/api/task/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setAllTasks(res.data.tasks);  // Set the tasks in state
      } else {
        toast.error(res.data.message || 'Could not load tasks.');
      }
    } catch (err) {
      toast.error('Failed to fetch tasks.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllTasks();  // Fetch all tasks when the component is mounted
  }, []);


  return (
    <div>
      <Navbar />
      
      <div className="flex bg-gray-100">
        <div className="flex-1 overflow-y-auto mb-10 px-5 md:px-7">
          <div className="flex flex-col md:flex-row items-end md:items-center justify-between py-6 gap-4">
            <h2 className="text-xl md:text-3xl font-semibold text-gray-800">
            "Welcome, {userData?.name?.split(' ')[0] || 'User'} ! Your tasks are waiting. Let's go! 🚀"</h2>

            {projects.length < 4 ? (
              <button
                onClick={() => setIsProjectModalOpen(true)}
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
              >
                + Create Project
              </button>
            ) : (
              <p className="text-red-500 font-medium">
                You’ve reached the maximum projects limit.
              </p>
            )}
          </div>

          <div>
          <Analytics projects={projects} tasks={allTasks} />
          </div>

          <div className="mt-5 md:mt-12 mb-2 md:mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your Projects</h2>
            <p className="text-gray-500 mt-2">Here’s a list of all your active projects. Dive in and manage tasks efficiently.</p>
          </div>

          <hr className="border-gray-300 mb-8" />

          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border-t-4 border-blue-500 hover:border-blue-800 h-full">
                  <h3 className="text-xl font-semibold text-blue-500 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <button onClick={() => goToProject(project._id)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition">View Tasks</button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No projects available. Create one to get started!</p>
            )}
          </div>
        </div>
      </div>

      {/* Project Creation Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Create New Project</h3>
            <form onSubmit={handleCreateProject}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
                <input
                  type="text"
                  id="title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  required
                  className="w-full p-2 mt-1 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Project Description</label>
                <textarea
                  id="description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                  className="w-full p-2 mt-1 border rounded-md"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)} // Close modal without submitting
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;
