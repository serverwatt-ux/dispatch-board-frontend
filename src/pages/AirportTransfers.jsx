import React from 'react';
import { Plane, Plus } from 'lucide-react';

function AirportTransfers() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Airport Transfers</h1>
          <p className="text-gray-600 mt-2">Manage airport transportation services</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          New Transfer
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col items-center justify-center h-64">
          <Plane size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Airport Transfers</h2>
          <p className="text-gray-600 text-center max-w-md">
            This section will display and manage all airport transfer bookings with flight integration and real-time tracking.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AirportTransfers;
