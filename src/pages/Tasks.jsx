import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2 } from 'lucide-react';

const initialColumns = {
  todo: {
    name: 'À faire',
    items: [
      { id: '1', title: 'Créer l’UI', description: 'Design de la maquette' },
      { id: '2', title: 'Configurer le backend', description: 'Connexion à la base de données' },
    ],
  },
  inProgress: {
    name: 'En cours',
    items: [
      { id: '3', title: 'API utilisateurs', description: 'Création et authentification' },
    ],
  },
  done: {
    name: 'Terminé',
    items: [
      { id: '4', title: 'Déploiement', description: 'Déploié sur Vercel' },
    ],
  },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems },
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📋 Tableau Kanban</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, column], idx) => (
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

export default KanbanBoard;
