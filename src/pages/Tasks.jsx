import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2 } from 'lucide-react';

const initialProjects = {
  project1: {
    name: 'Site Vitrine HVAC',
    columns: {
      todo: {
        name: 'À faire',
        items: [
          { id: '1', title: 'Créer l’UI', description: 'Design de la maquette' },
        ],
      },
      inProgress: {
        name: 'En cours',
        items: [],
      },
      done: {
        name: 'Terminé',
        items: [],
      },
    },
  },
  project2: {
    name: 'App de Gestion',
    columns: {
      todo: {
        name: 'À faire',
        items: [
          { id: '2', title: 'Connexion DB', description: 'Setup MongoDB' },
        ],
      },
      inProgress: {
        name: 'En cours',
        items: [
          { id: '3', title: 'Auth', description: 'Login & Register' },
        ],
      },
      done: {
        name: 'Terminé',
        items: [
          { id: '4', title: 'Initialisation', description: 'Projet setup' },
        ],
      },
    },
  },
};

const Tasks = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [activeProjectId, setActiveProjectId] = useState('project1');

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const project = projects[activeProjectId];
    const sourceCol = project.columns[source.droppableId];
    const destCol = project.columns[destination.droppableId];

    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
    } else {
      destItems.splice(destination.index, 0, movedItem);
    }

    const newColumns = {
      ...project.columns,
      [source.droppableId]: { ...sourceCol, items: sourceItems },
      [destination.droppableId]: { ...destCol, items: destItems },
    };

    setProjects({
      ...projects,
      [activeProjectId]: {
        ...project,
        columns: newColumns,
      },
    });
  };

  const activeProject = projects[activeProjectId];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Tâches par Projet</h1>
        <select
          value={activeProjectId}
          onChange={(e) => setActiveProjectId(e.target.value)}
          className="ml-4 p-2 border rounded"
        >
          {Object.entries(projects).map(([id, project]) => (
            <option key={id} value={id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(activeProject.columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white rounded-lg shadow p-4 min-h-[500px] flex flex-col"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{column.name}</h2>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex-1 space-y-3">
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-4 bg-white border rounded shadow-sm ${
                              snapshot.isDragging ? 'bg-blue-50 border-blue-400' : ''
                            }`}
                          >
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                            <div className="flex justify-end mt-2">
                              <button className="text-red-400 hover:text-red-600">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
