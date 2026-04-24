import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

function Settings() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your application preferences</p>
      </div>

      <div className="card">
        <div className="flex flex-col items-center justify-center h-64">
          <SettingsIcon size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600 text-center max-w-md">
            This section will allow you to configure user preferences, system settings, and application options.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
