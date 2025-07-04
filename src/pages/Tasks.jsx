import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2 } from 'lucide-react';
import { sampleProjects } from '../constants/index';

const buildInitialColumns = (projects) => {
  const cols = { todo: { name: 'À faire', items: [] }, inProgress: { name: 'En cours', items: [] }, done: { name: 'Terminé', items: [] } };
  for (const key in projects) {
    for (const colKey in projects[key].columns) {
      projects[key].columns[colKey].items.forEach(item =>
        cols[colKey].items.push({ ...item, project: projects[key].projectName, columnId: colKey })
      );
    }
  }
  return cols;
};

const findLastUsedId = (columns) => {
  let max = 0;
  Object.values(columns).forEach(col =>
    col.items.forEach(task => {
      const id = typeof task.id === 'string' ? parseInt(task.id) : task.id;
      if (!isNaN(id)) max = Math.max(max, id);
    })
  );
  return max;
};

const Tasks = () => {
  const initialColumns = buildInitialColumns(sampleProjects);
  const [columns, setColumns] = useState(initialColumns);
  const [lastId, setLastId] = useState(findLastUsedId(initialColumns));
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalData, setModalData] = useState({
    title: '', description: '', date: '', assignedTo: '', columnId: 'todo', project: '',
  });

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const src = [...columns[source.droppableId].items];
    const dst = source.droppableId === destination.droppableId ? src : [...columns[destination.droppableId].items];
    const [moved] = src.splice(source.index, 1);
    moved.columnId = destination.droppableId;
    dst.splice(destination.index, 0, moved);

    setColumns(prev => ({
      ...prev,
      [source.droppableId]: { ...prev[source.droppableId], items: source.droppableId === destination.droppableId ? dst : src },
      [destination.droppableId]: { ...prev[destination.droppableId], items: dst },
    }));
  };

  const openAddModal = columnId => {
    setEditingTask(null);
    setModalData({ title: '', description: '', date: '', assignedTo: '', columnId, project: '' });
    setShowTaskModal(true);
  };

  const openEditModal = (columnId, task, index) => {
    setEditingTask({ columnId, index });
    setModalData({ ...task, columnId });
    setShowTaskModal(true);
  };

  const handleSave = () => {
    const isEditing = editingTask !== null;
    const newId = isEditing ? modalData.id : lastId + 1;
    const task = { ...modalData, id: newId };
  
    setColumns(prev => {
      const updated = { ...prev };
  
      // Make sure we're not mutating the array directly
      for (const colId in updated) {
        updated[colId] = { ...updated[colId], items: [...updated[colId].items] };
      }
  
      if (isEditing) {
        const { columnId: oldColId, index } = editingTask;
  
        // If column changed, remove from old column and add to new one
        if (oldColId !== task.columnId) {
          updated[oldColId].items.splice(index, 1);
          updated[task.columnId].items.push(task);
        } else {
          updated[oldColId].items[index] = task;
        }
      } else {
        updated[task.columnId].items.push(task);
        setLastId(newId); // Only update lastId if it's a new task
      }
  
      return updated;
    });
  
    setShowTaskModal(false);
  };
  

  const handleDelete = (columnId, index) => {
    setColumns(prev => {
      const items = [...prev[columnId].items];
      items.splice(index, 1);
      return { ...prev, [columnId]: { ...prev[columnId], items } };
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Tâches</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white rounded-lg shadow p-4 min-h-[500px] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{column.name}</h2>
                    <button onClick={() => openAddModal(columnId)} className="text-green-500 hover:text-green-700">
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex-1 space-y-3">
                    {column.items.map((item, idx) => (
                      <Draggable key={String(item.id)} draggableId={String(item.id)} index={idx}>
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => openEditModal(columnId, item, idx)}
                            className="p-4 bg-white border rounded shadow-sm hover:cursor-pointer"
                          >
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                            <div className="text-sm text-gray-400 mt-1">
                              📅 {item.date} — 👤 {item.assignedTo} — 🗂️ {item.project}
                            </div>
                            <div className="flex justify-end mt-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(columnId, idx);
                                }}
                                className="text-red-400 hover:text-red-600"
                              >
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

      {/* Modal partagé */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
            <button onClick={() => setShowTaskModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
            <h2 className="text-lg font-semibold mb-4">{editingTask ? 'Modifier une tâche' : 'Ajouter une tâche'}</h2>
            {['title', 'description', 'date', 'assignedTo', 'project'].map(field => (
              <div key={field} className="mb-4">
                <label className="text-sm font-medium block mb-1">{field === 'assignedTo' ? 'Assigné à' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === 'date' ? 'date' : 'text'}
                  value={modalData[field]}
                  onChange={e => setModalData(prev => ({ ...prev, [field]: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-4">
              <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">{editingTask ? 'Modifier' : 'Ajouter'}</button>
              <button onClick={() => setShowTaskModal(false)} className="bg-white text-red-500 px-6 py-2 rounded hover:bg-gray-200 border-2 border-red-500">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
