import taskModel from '../models/task.js';
import projectModel from '../models/project.js';

// create a task

const createTask = async (req, res) => {
    try {
        const { title, description, status, projectId } = req.body;

        // Validate required fields
        if (!title || !description || !status || !projectId) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Validate status
        const validStatuses = ['pending', 'in progress', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        // Check if project exists
        const project = await projectModel.findById(projectId);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // Create new task
        const newTask = new taskModel({ title, description, status, projectId });
        const task = await newTask.save();

        res.status(201).json({ success: true, message: 'Task created successfully', task: { _id: task._id, title: task.title, status: task.status } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// get task

const getProjectTasks = async (req, res) => {

    try {

        const { projectId } = req.params;

        const project = await projectModel.findById(projectId);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        const tasks = await taskModel.find({ projectId });

        res.status(200).json({ success: true, tasks , projectTitle: project.title  });

    }
    catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// all tasks

const getAllTasks = async (req, res) => {

    try {
        const userId = req.user.id;

        const { projectId } = req.query;

        const tasks = await taskModel.find();

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ success: false, message: 'No tasks found' });
        }

        res.status(200).json({ success: true, tasks });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// update task

const updateTask = async (req, res) => {

    try {

        const { taskId } = req.params;

        const { title, description, status } = req.body;

        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }


        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        const updatedTask = await task.save();

        res.status(200).json({ success: true, message: 'Task updated successfully', updatedTask });

    }
    catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });

    }
};

// delete task

const deleteTask = async (req, res) => {

    try {

        const { taskId } = req.params;

        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        await taskModel.deleteOne({ _id: taskId });

        res.status(200).json({ success: true, message: 'Task deleted successfully' });

    }
    catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const countTasksInProject = async (req, res) => {

    try {

        const { projectId } = req.params;

        const taskCount = await taskModel.countDocuments({ projectId });

        if (taskCount === 0) {
            return res.status(404).json({ success: false, message: 'No tasks found for this project' });
        }

        res.status(200).json({ success: true, message: `Tasks count in project: ${taskCount}`, taskCount });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { createTask, getProjectTasks, updateTask, deleteTask, getAllTasks, countTasksInProject };