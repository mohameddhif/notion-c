import ProjectsList from '../components/ProjectsList';
import { sampleProjects } from '../constants/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const tasks = [
  { title: 'Wireframe UI', description: 'Create initial wireframes' },
  { title: 'Setup Backend', description: 'Configure database and server' },
  { title: 'Integrate API', description: 'Connect frontend with backend' },
  { title: 'Test Features', description: 'Run unit and integration tests' },
  { title: 'Fix Bugs', description: 'Resolve known issues' },
  { title: 'Deploy App', description: 'Push app to production' }
];

const Projects = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [project, setProject] = useState({
    title: '',
    type: '',
    startDate: '',
    endDate: '',
    description: '',
    roles: [false, false, false, false, false, false],
  });
  const [editProject, setEditProject] = useState(null); // For editing

  const navigate = useNavigate();

  const handleCreateClick = () => {
    setEditProject(null);
    setProject({
      title: '',
      type: '',
      startDate: '',
      endDate: '',
      description: '',
      roles: [false, false, false, false, false, false],
    });
    setShowCreateModal(true);
  };

  const handleRoleChange = (index) => {
    const updatedRoles = [...project.roles];
    updatedRoles[index] = !updatedRoles[index];
    setProject({ ...project, roles: updatedRoles });
  };

  const handleProjectClick = (proj) => {
    setEditProject(proj);
    setProject({
      title: proj.title,
      type: proj.type,
      startDate: proj.startDate,
      endDate: proj.endDate,
      description: proj.description,
      roles: proj.roles || [false, false, false, false, false, false],
    });
    setShowCreateModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end">
        <button
          onClick={handleCreateClick}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition duration-200"
        >
          Créer
        </button>
      </div>

      <ProjectsList projects={sampleProjects} onProjectClick={handleProjectClick} />

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-sm text-gray-400 mb-6">
              Projets / {editProject ? 'Modifier un projet' : 'Créer un projet'}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-semibold block mb-1">Titre</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={project.title}
                  onChange={(e) => setProject({ ...project, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Catégorie</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={project.type}
                  onChange={(e) => setProject({ ...project, type: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Date de début</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="JJ/MM/AAAA"
                  value={project.startDate}
                  onChange={(e) => setProject({ ...project, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Date de fin</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="JJ/MM/AAAA"
                  value={project.endDate}
                  onChange={(e) => setProject({ ...project, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold block mb-1">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
              />
            </div>

            <div className="flex grid-cols-2 gap-4">
              <div className="mb-6 w-full">
                <label className="text-sm font-semibold block mb-2">Rôles</label>
                <div className="border border-gray-300 rounded px-4 py-3 h-72 overflow-y-auto">
                  <div className="mb-2 font-semibold">Team Lead</div>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between mb-2">
                      <span>Yash</span>
                      <span className="italic text-gray-500 text-sm">Chef du projet</span>
                      <input
                        type="checkbox"
                        checked={project.roles[i]}
                        onChange={() => handleRoleChange(i)}
                        className="ml-4"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 w-full">
                <label className="text-sm font-semibold block mb-2">Tâches</label>
                <div className="border border-gray-300 rounded px-4 py-3 max-h-72 overflow-y-auto">
                  <div className="mb-2 font-semibold">Tâches assignables</div>
                  {tasks.map((task, i) => (
                    <div key={i} className="flex items-center justify-between mb-2">
                      <div>
                        <span className="block font-medium">{task.title}</span>
                        <span className="italic text-gray-500 text-sm">{task.description}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={project.roles[i]}
                        onChange={() => handleRoleChange(i)}
                        className="ml-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="w-36 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                {editProject ? 'Modifier' : 'Créer'}
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-30 bg-white text-red-500 px-6 py-2 rounded hover:bg-gray-200 border-2 border-red-500"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
