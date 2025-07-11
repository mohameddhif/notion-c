import { useState } from 'react';
import {
  Bell,
  FolderKanban,
  ClipboardList,
  CalendarDays,
  Users,
  UserPlus,
  Info,
  Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { sampleProjects } from '../constants/index';

const projectProgressData = sampleProjects.map((project) => {
  const progress = Math.round((project.completedTasks / project.totalTasks) * 100);
  return {
    name: project.projectName,
    progress,
  };
});


const Dashboard = () => {
  const [activeRange, setActiveRange] = useState('1M');
  const navigate = useNavigate();

  const [team, setTeam] = useState([
    { id: 1, name: "Mohamed", role: "Développeur Frontend", email: "mohamed@example.com" },
    { id: 2, name: "Sami", role: "Développeur Backend", email: "sami@example.com" },
  ]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', email: '' });

  const handleRemove = (id) => {
    setTeam(team.filter(member => member.id !== id));
  };

  const handleShowDetails = (member) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const handleAddMember = () => {
    if (!newMember.name.trim()) return;
    setTeam(prev => [...prev, { ...newMember, id: Date.now() }]);
    setNewMember({ name: '', role: '', email: '' });
    setShowAddModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Cartes en haut */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="hover:cursor-pointer bg-yellow-100 p-4 rounded shadow flex items-center space-x-3">
          <Bell className="text-yellow-600" />
          <div>
            <div className="font-semibold text-yellow-800">Notifications</div>
            <div className="text-sm text-yellow-600">6 alertes non lues</div>
          </div>
        </div>
        <div onClick={() => navigate('/u/projets')} className="hover:cursor-pointer bg-green-100 p-4 rounded shadow flex items-center space-x-3">
          <FolderKanban className="text-green-600" />
          <div>
            <div className="font-semibold text-green-800">Projets</div>
            <div className="text-sm text-green-600">4 projets actifs</div>
          </div>
        </div>
        <div onClick={() => navigate('/u/taches')} className="hover:cursor-pointer bg-indigo-100 p-4 rounded shadow flex items-center space-x-3">
          <ClipboardList className="text-indigo-600" />
          <div>
            <div className="font-semibold text-indigo-800">Tâches</div>
            <div className="text-sm text-indigo-600">6 nouvelles tâches</div>
          </div>
        </div>
        <div className="hover:cursor-pointer bg-blue-600 text-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <div className="font-semibold">Nouveau Projet</div>
            <div className="text-sm opacity-90">Créer un nouveau projet</div>
          </div>
          <button className="bg-white text-blue-600 rounded px-3 py-1 font-semibold text-sm">+</button>
        </div>
      </div>

      {/* Aperçu et calendrier */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4 col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <FolderKanban className="text-blue-600" size={18} />
              Aperçu des Projets
            </h2>
            <div className="space-x-2">
              {['1M', '3M', '6M', 'Tout'].map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`text-sm px-2 py-1 rounded ${activeRange === r ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={projectProgressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Line type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-blue-600 text-white p-4 rounded shadow flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <CalendarDays className="text-white" size={20} />
              Aperçu du calendrier
            </h2>
            <p className="text-sm opacity-90">Consultez vos réunions, tâches et événements à venir.</p>
          </div>
          <button className="self-start mt-4 bg-white text-blue-600 rounded px-4 py-2 text-sm font-semibold">Voir</button>
        </div>
      </div>

      {/* Section équipe et progression */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Progression */}
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="font-semibold mb-2">Progression</h3>
          <div className="w-32 h-32 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-2xl font-bold text-purple-700">
            84%
          </div>
          <p className="text-sm text-gray-500 mt-2">Avancement global du projet</p>
        </div>

        {/* Tâches complétées */}
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="font-semibold mb-2">Tâches complétées</h3>
          <div className="w-32 h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
            80%
          </div>
          <p className="text-sm text-gray-500 mt-2">Tâches terminées par l’équipe</p>
        </div>

        {/* Équipe */}
        <div className="bg-white p-4 rounded shadow h-60 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              Équipe
            </h3>
            <button onClick={() => setShowAddModal(true)} className="text-sm bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1">
              <UserPlus size={16} /> Ajouter
            </button>
          </div>
          {team.length > 0 ? (
            <ul className="space-y-2">
              {team.map((member) => (
                <li key={member.id} className="bg-gray-100 px-4 py-2 rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleShowDetails(member)} className="text-blue-600 text-sm flex items-center gap-1">
                      <Info size={14} /> Détails
                    </button>
                    <button onClick={() => handleRemove(member.id)} className="text-red-500 text-sm flex items-center gap-1">
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Aucun membre dans l'équipe.</p>
          )}
        </div>
      </div>

      {/* Modal Détails Membre */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button onClick={() => setShowMemberModal(false)} className="absolute top-2 right-4 text-gray-500 text-2xl">&times;</button>
            <h2 className="text-lg font-semibold mb-4">Détails du membre</h2>
            <p><strong>Nom :</strong> {selectedMember.name}</p>
            <p><strong>Rôle :</strong> {selectedMember.role}</p>
            <p><strong>Email :</strong> {selectedMember.email}</p>
          </div>
        </div>
      )}

      {/* Modal Ajouter Membre */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-2 right-4 text-gray-500 text-2xl">&times;</button>
            <h2 className="text-lg font-semibold mb-4">Ajouter un membre</h2>
            {['name', 'role', 'email'].map(field => (
              <div key={field} className="mb-3">
                <label className="block text-sm font-medium capitalize mb-1">{field}</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newMember[field]}
                  onChange={e => setNewMember(prev => ({ ...prev, [field]: e.target.value }))}
                />
              </div>
            ))}
            <div className="flex justify-end">
              <button onClick={handleAddMember} className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
