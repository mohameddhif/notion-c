import React, { useState } from 'react';
import { Settings, User, Sliders, Users, Plug, CreditCard, Shield } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { key: 'account', label: 'Compte', icon: <User size={16} /> },
    { key: 'preferences', label: 'Préférences', icon: <Sliders size={16} /> },
    { key: 'workspace', label: 'Espace de travail', icon: <Users size={16} /> },
    { key: 'integrations', label: 'Intégrations', icon: <Plug size={16} /> },
    { key: 'billing', label: 'Facturation', icon: <CreditCard size={16} /> },
    { key: 'security', label: 'Sécurité', icon: <Shield size={16} /> },
  ];

  const inputClass = 'border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400';
  const sectionClass = 'border border-gray-200 p-6 rounded-lg bg-white shadow-sm space-y-4';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className={sectionClass}>
            <h2 className="text-lg font-semibold mb-4">Paramètres du compte</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Adresse email</label>
                <input className={inputClass} placeholder="Email" />
              </div>

              <div>
                <label className="block font-medium mb-1">Mot de passe actuel</label>
                <input type="password" className={inputClass} placeholder="Mot de passe actuel" />
              </div>

              <div>
                <label className="block font-medium mb-1">Nouveau mot de passe</label>
                <input type="password" className={inputClass} placeholder="Nouveau mot de passe" />
              </div>

              <div className="flex gap-4">
                <div>
                  <label className="block font-medium mb-1">Langue</label>
                  <select className={inputClass}>
                    <option>Français</option>
                    <option>Anglais</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Fuseau horaire</label>
                  <select className={inputClass}>
                    <option>Africa/Tunis</option>
                    <option>Europe/Paris</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className={sectionClass}>
            <h2 className="text-lg font-semibold">Interface utilisateur</h2>
            <select className={inputClass}>
              <option>Mode système</option>
              <option>Clair</option>
              <option>Sombre</option>
            </select>

            <div>
              <h2 className="text-lg font-semibold mt-4">Barre latérale</h2>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Réduire par défaut
              </label>
            </div>

            <div>
              <h2 className="text-lg font-semibold mt-4">Notifications</h2>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Par email
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                In-app
              </label>
            </div>
          </div>
        );

      case 'workspace':
        return (
          <div className={sectionClass}>
            <h2 className="text-lg font-semibold">Espace de travail</h2>
            <input className={inputClass} placeholder="Nom de l’espace de travail" />
            <input className={inputClass} placeholder="Statut de tâche par défaut" />
            <button className="text-purple-600 text-sm mt-2">Inviter un membre</button>
            <div className="mt-6 border-t pt-4">
              <h2 className="text-red-600 font-semibold">Zone de danger</h2>
              <button className="text-red-600 text-sm">Supprimer l’espace de travail</button>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className={sectionClass}>
            <h2 className="text-lg font-semibold">Intégrations connectées</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Slack</li>
              <li>GitHub</li>
              <li>Google Calendar</li>
              <li>Zapier</li>
            </ul>
          </div>
        );

      case 'billing':
        return (
          <div className={sectionClass}>
            <h2 className="text-lg font-semibold">Formule actuelle</h2>
            <p>Pro</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded mt-2">Mettre à niveau</button>

            <h2 className="text-lg font-semibold mt-6">Historique de facturation</h2>
            <p>Aucune facture disponible.</p>

            <div className="mt-6 border-t pt-4">
              <h2 className="text-red-600 font-semibold">Zone de danger</h2>
              <button className="text-red-600 text-sm">Annuler l’abonnement</button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className={sectionClass}>
            <h2 className="text-lg font-semibold">Sécurité</h2>
            <p>Consulter l’activité de connexion, les sessions actives et les tokens API.</p>
            <button className="text-sm text-purple-600">Voir les appareils connectés</button>
            <button className="text-sm text-purple-600 ml-4">Gérer les tokens API</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Paramètres</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default SettingsPage;
