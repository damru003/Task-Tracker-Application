import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    dateCreated: { type: Date, default: Date.now },
    dateCompleted: { type: Date }
}, { timestamps: true });

const taskModel = mongoose.models.task || mongoose.model("task", taskSchema);

export default taskModel;
