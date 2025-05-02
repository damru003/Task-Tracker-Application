import React from 'react';
import { useParams } from 'react-router-dom';

const Project = () => {

  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Tasks for Project ID: {id}</h2>
     
    </div>
  )
}

export default Project
