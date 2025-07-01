import React from 'react';
import PropTypes from 'prop-types';

const ProjectCard = ({
  projectName = "Nouveau Projet",
  status = "Upcoming",
  statusColor = "amber",
  category = "",
  progress = 0,
  completedTasks = 0,
  totalTasks = 1,
  startDate = "February 11, 2024",
  endDate = "February 17, 2024"
}) => {
  const progressPercentage = Math.min(100, Math.max(0, progress));
  
  const statusColorMap = {
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  
  const statusClasses = statusColorMap[statusColor] || statusColorMap.amber;

  return (
    
    <div className="bg-white rounded-lg shadow-sm p-6 w-full hover:shadow-md transition-shadow border border-gray-200 flex flex-col h-full min-w-[380px]  max-w-[600px] hover:cursor-pointer">
      
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate max-w-[220px]">
          {projectName}
        </h3>
        <span className={`${statusClasses} text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap`}>
          {status}
        </span>
      </div>
      
      {category && (
        <p className="text-gray-600 mb-4 text-sm">{category}</p>
      )}
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-500">Progression</span>
          <span className="text-xs font-medium text-gray-500">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{completedTasks}</span>/
          <span className="text-gray-500">{totalTasks}</span> tâches
        </span>
        <span className="text-xs text-gray-400">
          {Math.round((completedTasks / totalTasks) * 100)}% complété
        </span>
      </div>
      
      <div className="pt-3 border-t border-gray-100 mt-auto">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Début:</span> {startDate}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium">Fin:</span> {endDate}
        </p>
      </div>
    </div>
  );
};

const ProjectsList = ({ projects, onProjectClick }) => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index}
          className="flex justify-center rounded cursor-pointer hover:shadow-md transition"
          onClick={() => onProjectClick(project)}>
            <ProjectCard
              projectName={project.projectName}
              status={project.status}
              statusColor={project.statusColor}
              category={project.category}
              progress={project.progress}
              completedTasks={project.completedTasks}
              totalTasks={project.totalTasks}
              startDate={project.startDate}
              endDate={project.endDate}
            />
          </div>
        ))}
      </div>
  );
};

export default ProjectsList;