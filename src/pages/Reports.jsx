import React from 'react';
import { FileText } from 'lucide-react';

function Reports() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">View performance and usage statistics</p>
      </div>

      <div className="card">
        <div className="flex flex-col items-center justify-center h-64">
          <FileText size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h2>
          <p className="text-gray-600 text-center max-w-md">
            This section will provide comprehensive reports, analytics, and performance metrics for your fleet operations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reports;
