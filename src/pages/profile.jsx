import React, { useState } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: 'Mohamed Dhif',
    username: 'mohamed_d',
    email: 'dhif.mohamed@email.com',
    bio: 'lorem ipsum',
    avatar: null,
    jobTitle: 'Chef de projet',
    location: 'Tunis, Tunisie'
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfile({ ...profile, avatar: e.target.files[0] });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Mon Profil</h1>

      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
          {profile.avatar ? (
            <img
              src={URL.createObjectURL(profile.avatar)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Aucune image
            </div>
          )}
        </div>
        <input type="file" onChange={handleImageChange} className="mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="fullName"
          className="border rounded px-3 py-2"
          placeholder="Nom complet"
          value={profile.fullName}
          onChange={handleChange}
        />
        <input
          name="username"
          className="border rounded px-3 py-2"
          placeholder="Nom d'utilisateur"
          value={profile.username}
          onChange={handleChange}
        />
        <input
          name="email"
          className="border rounded px-3 py-2"
          placeholder="Adresse email"
          value={profile.email}
          onChange={handleChange}
        />
        <input
          name="jobTitle"
          className="border rounded px-3 py-2"
          placeholder="Poste"
          value={profile.jobTitle}
          onChange={handleChange}
        />
        <input
          name="location"
          className="border rounded px-3 py-2"
          placeholder="Localisation"
          value={profile.location}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          className="col-span-2 border rounded px-3 py-2 h-24"
          placeholder="Biographie"
          value={profile.bio}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
