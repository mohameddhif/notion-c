import { useState } from 'react';
import ProjectsList from '../components/ProjectsList';
import { sampleProjects } from '../constants/index';

const defaultProject = {
  projectName: '',
  status: 'En attente',
  statusColor: '',
  category: '',
  progress: 0,
  completedTasks: 0,
  totalTasks: 0,
  startDate: '',
  endDate: '',
  columns: {
    todo: { name: 'À faire', items: [] },
    inProgress: { name: 'En cours', items: [] },
    done: { name: 'Terminé', items: [] },
  },
};

const statusOptions = ['En attente', 'En cours', 'Complété', 'En pause', 'Annulé'];

const Projects = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [project, setProject] = useState(defaultProject);
  const [editProject, setEditProject] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', date: '', assignedTo: '' });

  const handleCreateClick = () => {
    setEditProject(null);
    setProject({ ...defaultProject });
    setNewTask({ title: '', description: '', date: '', assignedTo: '' });
    setShowCreateModal(true);
  };

  const handleProjectClick = (proj) => {
    setEditProject(proj);
    setProject({ ...proj });
    setNewTask({ title: '', description: '', date: '', assignedTo: '' });
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

    console.log('Saved project:', updatedProject);
    setShowCreateModal(false);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    setProject((prev) => {
      const updatedItems = [...prev.columns.todo.items, newTask];
      return {
        ...prev,
        columns: {
          ...prev.columns,
          todo: {
            ...prev.columns.todo,
            items: updatedItems,
          },
        },
      };
    });
    setNewTask({ title: '', description: '', date: '', assignedTo: '' });
  };

  const handleDeleteTask = (colName, index) => {
    const updatedItems = [...project.columns[colName].items];
    updatedItems.splice(index, 1);
    setProject((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [colName]: {
          ...prev.columns[colName],
          items: updatedItems,
        },
      },
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-3xl font-bold mb-6 text-blue-600">Projets</div>
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
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 relative max-h-[90vh] overflow-y-auto">
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
                  value={project.projectName}
                  onChange={(e) => setProject({ ...project, projectName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Catégorie</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={project.category}
                  onChange={(e) => setProject({ ...project, category: e.target.value })}
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
                value={project.description || ''}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold block mb-2">Tâches (À faire)</label>
              <div className="flex flex-wrap gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Titre"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="date"
                  value={newTask.date}
                  onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Assigné à"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <button
                  onClick={handleAddTask}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Ajouter
                </button>
              </div>

              {['todo', 'inProgress', 'done'].map((col) => (
                <div key={col} className="mb-4">
                  <h4 className="text-md font-semibold mb-1">{project.columns[col].name}</h4>
                  {project.columns[col].items.length > 0 ? (
                    <ul className="divide-y border rounded bg-gray-50">
                      {project.columns[col].items.map((task, index) => (
                        <li
                          key={`${col}-${task.title}-${index}`}
                          className="p-3 flex justify-between items-start"
                        >
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-500">{task.description}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {task.date} — Assigné à {task.assignedTo}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteTask(col, index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm">Aucune tâche</p>
                  )}
                </div>
              ))}
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
