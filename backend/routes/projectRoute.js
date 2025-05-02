import express from 'express';
import { createProject, getUserProjects, deleteProject } from '../controllers/projectController.js';
import authUser from '../middleware/auth.js';

const projectRouter = express.Router();

projectRouter.post('/create', authUser , createProject);
projectRouter.get('/all', authUser , getUserProjects);
projectRouter.delete('/delete/:projectId', authUser , deleteProject);

export default projectRouter;
