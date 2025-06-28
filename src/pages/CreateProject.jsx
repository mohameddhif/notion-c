import React, { useState } from 'react';
import { CalendarIcon } from 'lucide-react';

const CreateProjectPage = () => {
  const [project, setProject] = useState({
    title: '',
    type: '',
    startDate: '',
    endDate: '',
    description: '',
    roles: [false, false, false, false, false, false],
  });

  const handleRoleChange = (index) => {
    const updatedRoles = [...project.roles];
    updatedRoles[index] = !updatedRoles[index];
    setProject({ ...project, roles: updatedRoles });
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1">

        <main className="p-10 bg-gray-100 h-full overflow-auto">
          <h2 className="text-sm text-gray-400 mb-6">Projects / Create Project</h2>

          <div className="bg-white rounded-lg shadow-md p-8 border border-blue-200">
            {/* Form */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-semibold block mb-1">Project Title</label>
                <input className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Project Type</label>
                <input className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Start Date</label>
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                  <input className="flex-1 outline-none" placeholder="DD/MM/YYYY" />
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">End Date</label>
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                  <input className="flex-1 outline-none" placeholder="DD/MM/YYYY" />
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold block mb-1">Project Description</label>
              <textarea className="w-full border border-gray-300 rounded px-3 py-2 h-24" />
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold block mb-2">Project Roles</label>
              <div className="border border-gray-300 rounded px-4 py-3">
                <div className="mb-2 font-semibold">Team Lead</div>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between mb-2">
                    <span>Yash</span>
                    <span className="italic text-gray-500 text-sm">Team lead</span>
                    <input
                      type="checkbox"
                      checked={project.roles[i]}
                      onChange={() => handleRoleChange(i)}
                      className="ml-4"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Create
              </button>
              <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded hover:bg-gray-200">
                Delete
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateProjectPage;
