import React,  { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Home from './pages/Home';
import { AppContent } from './context/AppContext';
import Profile from './components/Profile';
import ProjectTask from './pages/ProjectTask';
const App = () => {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/project/:projectId" element={<ProjectTask />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
