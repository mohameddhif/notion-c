import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

const defaultMember = {
  name: '',
  role: '',
  email: '',
  joinedDate: '',
};

const Equipe = () => {
  const [members, setMembers] = useState([
    { name: 'Mohamed', role: 'Développeur Frontend', email: 'mohamed@example.com', joinedDate: '2024-05-01' },
    { name: 'Noura', role: 'Designer UI/UX', email: 'noura@example.com', joinedDate: '2024-04-15' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState(defaultMember);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) return;
    setMembers([...members, newMember]);
    setNewMember(defaultMember);
    setShowAddModal(false);
  };

  const handleRemove = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Équipe</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Ajouter
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer relative"
            onClick={() => setSelectedMember(member)}
          >
            <div className="font-semibold text-lg text-gray-800">{member.name}</div>
            <div className="text-sm text-gray-500">{member.role}</div>
            <div className="text-xs text-gray-400 mt-1">Entré le {member.joinedDate}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(index);
              }}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Modal Ajouter */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Ajouter un membre</h2>
            {['name', 'role', 'email', 'joinedDate'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {field === 'name'
                    ? 'Nom'
                    : field === 'role'
                    ? 'Rôle'
                    : field === 'email'
                    ? 'Email'
                    : 'Date d’entrée'}
                </label>
                <input
                  type={field === 'joinedDate' ? 'date' : 'text'}
                  value={newMember[field]}
                  onChange={(e) => setNewMember({ ...newMember, [field]: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
            <div className="flex justify-end">
              <button
                onClick={handleAddMember}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Infos membre */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              <X />
            </button>
            <h2 className="text-lg font-semibold mb-4">Informations</h2>
            <div className="space-y-2">
              <div><strong>Nom:</strong> {selectedMember.name}</div>
              <div><strong>Rôle:</strong> {selectedMember.role}</div>
              <div><strong>Email:</strong> {selectedMember.email}</div>
              <div><strong>Date d’entrée:</strong> {selectedMember.joinedDate}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipe;
