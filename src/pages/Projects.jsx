import ProjectsList from '../components/ProjectsList';
import { sampleProjects } from '../constants/index';
import { useState } from 'react';

const defaultProject = {
  title: '',
  type: '',
  startDate: '',
  endDate: '',
  description: '',
  completedTasks: 0,
  totalTasks: 0,
  status: 'En attente',
};

const statusOptions = ['En attente', 'En cours', 'Complété', 'En pause', 'Annulé'];

const Projects = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [project, setProject] = useState(defaultProject);
  const [editProject, setEditProject] = useState(null);

  const handleCreateClick = () => {
    setEditProject(null);
    setProject(defaultProject);
    setShowCreateModal(true);
  };

  const handleProjectClick = (proj) => {
    setEditProject(proj);
    setProject({ ...proj });
    setShowCreateModal(true);
  };

  const handleSave = () => {
    const updatedProgress =
      project.totalTasks > 0
        ? Math.round((project.completedTasks / project.totalTasks) * 100)
        : 0;

    const updatedProject = {
      ...project,
      progress: updatedProgress,
    };

    // Update logic here: send to API or add to state
    console.log('Saved project:', updatedProject);
    setShowCreateModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end">
        <button
          onClick={handleCreateClick}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition duration-200"
        >
          {editProject ? 'Modifier un projet' : 'Créer un projet'}
        </button>
      </div>

      <ProjectsList projects={sampleProjects} onProjectClick={handleProjectClick} />

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-sm text-gray-400 mb-6">
              Projets / {editProject ? 'Modifier' : 'Créer'}
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
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={project.startDate}
                  onChange={(e) => setProject({ ...project, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Date de fin</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={project.endDate}
                  onChange={(e) => setProject({ ...project, endDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Statut</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={project.status}
                  onChange={(e) => setProject({ ...project, status: e.target.value })}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Tâches complétées / totales</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={project.completedTasks}
                    onChange={(e) =>
                      setProject({ ...project, completedTasks: parseInt(e.target.value || 0) })
                    }
                    className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    placeholder="Complétées"
                  />
                  <input
                    type="number"
                    min="1"
                    value={project.totalTasks}
                    onChange={(e) =>
                      setProject({ ...project, totalTasks: parseInt(e.target.value || 1) })
                    }
                    className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    placeholder="Totales"
                  />
                </div>
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

            <div className="flex justify-end space-x-4">
              <button
                className="w-36 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                onClick={handleSave}
              >
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
