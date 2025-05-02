import express from 'express';
import { createTask, getProjectTasks, updateTask, deleteTask, getAllTasks, countTasksInProject } from '../controllers/taskController.js';
import authUser from '../middleware/auth.js';

const taskRouter = express.Router();

taskRouter.post('/create', authUser, createTask);
taskRouter.get('/project/:projectId', getProjectTasks);
taskRouter.get('/tasks', authUser ,getAllTasks);
taskRouter.put('/update/:taskId', authUser, updateTask);
taskRouter.delete('/delete/:taskId', authUser,  deleteTask);
taskRouter.get('/count/:projectId', countTasksInProject);

export default taskRouter;
