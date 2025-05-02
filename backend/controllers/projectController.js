import projectModel from '../models/project.js';

// Create Project

const createProject = async (req, res) => {

    const { title, description } = req.body;

    const userId = req.user.id;

    try {

        const existingProjects = await projectModel.find({ userId });

        if (existingProjects.length >= 4) {
            return res.status(400).json({ success: false, message: "Maximum 4 projects allowed per user" });
        }

        const newProject = new projectModel({ title, description, userId });

        const savedProject = await newProject.save();

        res.status(201).json({ success: true, project: savedProject });

    } catch (error) {

        console.error("Create Project Error:", error);
        res.status(500).json({ success: false, message: "Server error" });

    }
};

// Get All Project's

const getUserProjects = async (req, res) => {

    const userId = req.user.id;

    try {
        const projects = await projectModel.find({ userId });
        res.status(200).json({ success: true, projects });
    }
    catch (error) {
        console.error("Fetch Projects Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete Project

const deleteProject = async (req, res) => {

    const { projectId } = req.params;
    const { userId } = req.body;

    try {

        const project = await projectModel.findOneAndDelete({ _id: projectId, userId });

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found or not authorized" });
        }

        res.status(200).json({ success: true, message: "Project deleted" });

    }

    catch (error) {
        console.error("Delete Project Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export { createProject, getUserProjects, deleteProject };