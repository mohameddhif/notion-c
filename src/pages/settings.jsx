import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { key: 'account', label: 'Paramètres du compte' },
    { key: 'preferences', label: 'Préférences / Interface' },
    { key: 'workspace', label: 'Espace de travail' },
    { key: 'integrations', label: 'Intégrations' },
    { key: 'billing', label: 'Abonnement & Facturation' },
    { key: 'security', label: 'Sécurité' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Informations du profil</h2>
            <div className="grid grid-cols-2 gap-4">
              <input className="border rounded px-3 py-2" placeholder="Nom" />
              <input className="border rounded px-3 py-2" placeholder="Email" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Photo de profil</label>
              <input type="file" />
            </div>
            <div>
              <h2 className="text-xl font-bold mt-6">Modifier le mot de passe</h2>
              <input className="border rounded px-3 py-2 w-full mt-2" placeholder="Nouveau mot de passe" type="password" />
            </div>
            <div>
              <h2 className="text-xl font-bold mt-6">Langue et fuseau horaire</h2>
              <select className="border rounded px-3 py-2 mr-4">
                <option>Anglais</option>
                <option>Français</option>
              </select>
              <select className="border rounded px-3 py-2">
                <option>Africa/Tunis</option>
                <option>Europe/Paris</option>
              </select>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Thème & Interface</h2>
            <select className="border rounded px-3 py-2">
              <option>Système</option>
              <option>Clair</option>
              <option>Sombre</option>
            </select>
            <h2 className="text-xl font-bold">Comportement de la barre latérale</h2>
            <label>
              <input type="checkbox" className="m-2" /> Réduire la barre latérale par défaut
            </label>
            <h2 className="text-xl font-bold">Notifications</h2>
            <label>
              <input type="checkbox" className="m-2 " /> Recevoir des notifications par email
            </label>
            <label>
              <input type="checkbox" className="m-2" /> Notifications internes
            </label>
          </div>
        );
      case 'workspace':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Informations de l’espace de travail</h2>
            <input className="border rounded px-3 py-2 w-80" placeholder="Nom de l’espace de travail" />
            <h2 className="text-xl font-bold">Paramètres par défaut du projet</h2>
            <input className="border rounded px-3 py-2 w-80" placeholder="Statut des tâches par défaut" />
            <h2 className="text-xl font-bold">Membres & Permissions</h2>
            <button className="text-sm text-purple-600">Inviter un membre</button>
            <button className="text-red-600 m-5">Supprimer l’espace de travail</button>
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Services connectés</h2>
            <ul className="list-disc pl-6">
              <li>Slack</li>
              <li>GitHub</li>
              <li>Google Calendar</li>
              <li>Zapier</li>
            </ul>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Abonnement et facturation</h2>
            <p>Formule actuelle : Pro</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Mettre à niveau</button>
            <h2 className="text-xl font-bold">Historique de facturation</h2>
            <p>Aucune facture disponible.</p>
            <button className="w-30 bg-white text-red-500 px-6 py-2 rounded hover:bg-gray-200 border-2 border-red-500">Annuler l’abonnement</button>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Paramètres de sécurité</h2>
            <p>Voir l’activité de connexion, les sessions et les clés API.</p>
            <button className="text-sm text-purple-600">Voir les appareils</button>
            <button className="text-sm text-purple-600 m-5">Gérer les tokens API</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
      <div className="flex flex-wrap gap-3 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded-full border ${
              activeTab === tab.key ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded shadow-md">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;
