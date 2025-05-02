import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import projectRouter from './routes/projectRoute.js';
import taskRouter from './routes/taskRoute.js';


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/task', taskRouter);

connectDb();

app.get('/', (req,res) => {
    res.send("API Working Successfully...")
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT} PORT.`)
});
