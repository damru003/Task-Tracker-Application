import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const ProjectTask = () => {
    const { projectId } = useParams();
    const { backendUrl } = useContext(AppContent);
    const [tasks, setTasks] = useState([]);
    const [projectTitle, setProjectTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [editTaskId, setEditTaskId] = useState(null);

    const navigate = useNavigate();

    const fetchProjectTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication required.');
                navigate('/login');
                return;
            }

            const res = await axios.get(`${backendUrl}/api/task/project/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                setTasks(res.data.tasks);
                setProjectTitle(res.data.projectTitle);
            } else {
                toast.error(res.data.message || 'Could not load tasks.');
            }
        } catch (err) {
            toast.error('Failed to fetch tasks.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProjectTasks();
    }, [projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !status) {
            toast.error('Please fill all the fields.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication required.');
                return;
            }

            const res = await axios.post(
                `${backendUrl}/api/task/create`,
                { title, description, status, projectId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                toast.success('Task created successfully!');
                setIsModalOpen(false);
                fetchProjectTasks();
            } else {
                toast.error(res.data.message || 'Task creation failed.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error creating task.');
        }
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !description || !status) {
            toast.error('Please fill all the fields.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication required.');
                return;
            }

            const res = await axios.put(
                `${backendUrl}/api/task/update/${editTaskId}`,
                { title, description, status },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                toast.success('Task updated successfully!');
                setIsEditModalOpen(false);
                fetchProjectTasks();
            } else {
                toast.error(res.data.message || 'Task update failed.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating task.');
        }
    };


    const handleDelete = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication required.');
                return;
            }

            const res = await axios.delete(`${backendUrl}/api/task/delete/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                toast.success('Task deleted successfully!');
                fetchProjectTasks();  // Refresh the task list
            } else {
                toast.error(res.data.message || 'Task deletion failed.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error deleting task.');
        }
    };

    return (
        <div className="bg-gray-100 p-3 min-h-fit">
            <div className="max-w-md mx-10 my-5 mb-4">
                <button onClick={() => navigate('/dashboard')} className="flex items-center bg-blue-500 text-white px-4 py-3 rounded-full cursor-pointer hover:bg-blue-700 font-medium mb-4">
                    <ArrowLeft className="mr-2 w-5 h-5" />Back to Dashboard
                </button>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
                <div className='flex justify-between gap-3 mb-2'>
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">
                        Tasks for Project: {projectTitle}
                    </h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 md:px-6 md:py-2.5 rounded-full text-sm shadow-md transition duration-300 ease-in-out">
                        + Add Task
                    </button>

                </div>

                {tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks found for this project.</p>
                ) : (
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <div key={task._id} className="p-4 bg-gray-50 rounded border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                                <p className="text-gray-600">{task.description}</p>
                                <p className="text-sm mt-2">
                                    Status: <span className="font-medium text-blue-500">{task.status}</span>
                                </p>
                                <p className="text-sm text-gray-400">
                                    Created: {new Date(task.createdAt).toLocaleDateString()}
                                </p>
                                <div className="flex space-x-3 mt-3">
                                    <button
                                        onClick={() => {
                                            setTitle(task.title);
                                            setDescription(task.description);
                                            setStatus(task.status);
                                            setEditTaskId(task._id);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Add New Task</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)} // Close the modal without submitting
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Task Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Update Task</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                    className="w-full p-2 mt-1 border rounded-md"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)} // Close the modal without submitting
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                    Update Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        
    );
};

export default ProjectTask;
