import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const Analytics = ({ projects, tasks }) => {
  // Prepare data: number of tasks per project
  const tasksPerProject = projects.map(project => {
    const taskCount = tasks.filter(task => task.projectId === project._id).length;
    return {
      name: project.title,
      taskCount,
    };
  });

  // Prepare data: task statuses
  const statusCounts = {
    pending: 0,
    'in progress': 0,
    completed: 0,
  };

  tasks.forEach(task => {
    statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
  });

  const statusData = Object.entries(statusCounts).map(([status, value]) => ({
    name: status,
    value,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-3">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Project & Task Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tasks per Project Bar Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Tasks per Project</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tasksPerProject}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="taskCount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Status Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
