import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Clock, MapPin, Users } from 'lucide-react';

function Dashboard() {
  const metrics = [
    {
      title: 'Total Trips Today',
      value: '24',
      icon: TrendingUp,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Vehicles',
      value: '18',
      icon: MapPin,
      color: 'bg-green-500',
      change: 'All Available'
    },
    {
      title: 'Pending Requests',
      value: '5',
      icon: Clock,
      color: 'bg-yellow-500',
      change: 'Awaiting Assignment'
    },
    {
      title: 'Customer Rating',
      value: '4.8/5',
      icon: Users,
      color: 'bg-purple-500',
      change: 'Excellent'
    },
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'Vehicle #103 maintenance due in 2 days',
      time: '2 hours ago'
    },
    {
      type: 'info',
      message: 'New booking request from Windhoek International Airport',
      time: '30 minutes ago'
    },
    {
      type: 'success',
      message: 'Trip #847 completed successfully',
      time: '15 minutes ago'
    },
  ];

  const recentTrips = [
    { id: 'T001', type: 'Airport Transfer', passenger: 'John Doe', status: 'Completed', driver: 'Samuel K.' },
    { id: 'T002', type: 'Door-to-Door', passenger: 'Jane Smith', status: 'In Progress', driver: 'Maria M.' },
    { id: 'T003', type: 'Crew Transport', passenger: 'Airline Crew', status: 'Pending', driver: 'Pending' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your fleet today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-sm font-medium text-green-600">{metric.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Notifications & Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                alert.type === 'info' ? 'bg-blue-50 border-blue-500' :
                'bg-green-50 border-green-500'
              }`}>
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-700">{alert.message}</p>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Fleet Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Available</span>
                <span className="text-sm font-bold text-green-600">18</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">In Service</span>
                <span className="text-sm font-bold text-blue-600">15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Maintenance</span>
                <span className="text-sm font-bold text-orange-600">2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trips */}
      <div className="card mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Trips</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Trip ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Passenger</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Driver</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map((trip, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{trip.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{trip.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{trip.passenger}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{trip.driver}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      trip.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
