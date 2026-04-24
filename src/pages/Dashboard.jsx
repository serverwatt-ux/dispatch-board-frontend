import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, Upload, Fuel, Wrench, MapPin, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fuelEntries, setFuelEntries] = useState([
    { id: 1, date: '2026-04-20', amount: 500, liters: 50, vehicleId: 'VH-001', odoReading: 15420 },
    { id: 2, date: '2026-04-18', amount: 450, liters: 45, vehicleId: 'VH-002', odoReading: 12350 }
  ]);
  const [odoReadings, setOdoReadings] = useState([
    { vehicleId: 'VH-001', current: 15420, nextService: 15500, lastService: 15200 },
    { vehicleId: 'VH-002', current: 12350, nextService: 12500, lastService: 12100 }
  ]);
  const [outOfTownTrips, setOutOfTownTrips] = useState([
    {
      id: 1,
      destination: 'Swakopmund',
      startDate: '2026-04-25',
      endDate: '2026-04-28',
      driver: 'John Doe',
      vehicleId: 'VH-001',
      status: 'Scheduled',
      passengers: 4
    },
    {
      id: 2,
      destination: 'Etosha National Park',
      startDate: '2026-05-02',
      endDate: '2026-05-05',
      driver: 'Jane Smith',
      vehicleId: 'VH-003',
      status: 'Confirmed',
      passengers: 6
    },
    {
      id: 3,
      destination: 'Walvis Bay',
      startDate: '2026-04-24',
      endDate: '2026-04-26',
      driver: 'Peter Johnson',
      vehicleId: 'VH-002',
      status: 'In Progress',
      passengers: 3
    }
  ]);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'Fuel_Receipt_VH001_20260420.pdf', type: 'fuel_receipt', date: '2026-04-20', vehicleId: 'VH-001' },
    { id: 2, name: 'Odo_Reading_VH002_20260418.jpg', type: 'odo_reading', date: '2026-04-18', vehicleId: 'VH-002' }
  ]);
  const [showFuelForm, setShowFuelForm] = useState(false);
  const [showOdoForm, setShowOdoForm] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFuel, setNewFuel] = useState({ date: '', amount: '', liters: '', vehicleId: '', odoReading: '' });
  const [newOdo, setNewOdo] = useState({ vehicleId: '', current: '', nextService: '' });
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadType, setUploadType] = useState('fuel_receipt');

  // Update real-time date and time
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get calendar days for current month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTripDates = (startDate, endDate) => {
    const dates = [];
    const current = new Date(startDate);
    const end = new Date(endDate);
    while (current <= end) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const getTripsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return outOfTownTrips.filter(trip => {
      const tripDates = getTripDates(trip.startDate, trip.endDate);
      return tripDates.includes(dateStr);
    });
  };

  // Handle fuel entry
  const handleAddFuel = () => {
    if (newFuel.date && newFuel.amount && newFuel.vehicleId && newFuel.odoReading) {
      const fuelEntry = {
        id: fuelEntries.length + 1,
        ...newFuel,
        amount: parseFloat(newFuel.amount),
        liters: parseFloat(newFuel.liters),
        odoReading: parseInt(newFuel.odoReading)
      };
      setFuelEntries([...fuelEntries, fuelEntry]);
      setNewFuel({ date: '', amount: '', liters: '', vehicleId: '', odoReading: '' });
      setShowFuelForm(false);
    }
  };

  // Handle odo reading
  const handleAddOdo = () => {
    if (newOdo.vehicleId && newOdo.current) {
      const updated = odoReadings.map(reading =>
        reading.vehicleId === newOdo.vehicleId
          ? { ...reading, current: parseInt(newOdo.current), nextService: parseInt(newOdo.nextService) || reading.nextService }
          : reading
      );
      setOdoReadings(updated);
      setNewOdo({ vehicleId: '', current: '', nextService: '' });
      setShowOdoForm(false);
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const handleUploadSubmit = () => {
    if (uploadFile) {
      const newUpload = {
        id: uploadedFiles.length + 1,
        name: uploadFile.name,
        type: uploadType,
        date: new Date().toISOString().split('T')[0],
        vehicleId: 'VH-001'
      };
      setUploadedFiles([...uploadedFiles, newUpload]);
      setUploadFile(null);
      setShowUploadModal(false);
    }
  };

  // Calculate service urgency
  const getServiceStatus = (current, nextService) => {
    const remaining = nextService - current;
    if (remaining <= 0) return 'overdue';
    if (remaining <= 100) return 'urgent';
    if (remaining <= 500) return 'warning';
    return 'ok';
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="bg-gray-100"></div>);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const trips = getTripsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          className={`p-2 border rounded-lg min-h-20 cursor-pointer transition ${
            isToday ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'
          } ${trips.length > 0 ? 'bg-green-50 border-green-400' : ''}`}
        >
          <div className={`font-bold text-sm ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          {trips.map((trip) => (
            <div key={trip.id} className="text-xs bg-green-200 text-green-800 px-1 py-0.5 mt-1 rounded truncate">
              {trip.destination}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Active Vehicles</p>
              <p className="text-3xl font-bold text-gray-800">12</p>
            </div>
            <TrendingUp className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Trips Today</p>
              <p className="text-3xl font-bold text-gray-800">24</p>
            </div>
            <MapPin className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Fuel This Month</p>
              <p className="text-3xl font-bold text-gray-800">₦8,500</p>
            </div>
            <Fuel className="text-yellow-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Services Due</p>
              <p className="text-3xl font-bold text-gray-800">3</p>
            </div>
            <Wrench className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Operations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fuel Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Fuel className="text-yellow-500" size={24} />
                Fuel Management
              </h2>
              <button
                onClick={() => setShowFuelForm(!showFuelForm)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm"
              >
                + Add Fuel Entry
              </button>
            </div>

            {showFuelForm && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-yellow-200">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="date"
                    value={newFuel.date}
                    onChange={(e) => setNewFuel({ ...newFuel, date: e.target.value })}
                    className="border rounded px-3 py-2 text-sm"
                    placeholder="Date"
                  />
                  <select
                    value={newFuel.vehicleId}
                    onChange={(e) => setNewFuel({ ...newFuel, vehicleId: e.target.value })}
                    className="border rounded px-3 py-2 text-sm"
                  >
                    <option>Select Vehicle</option>
                    <option>VH-001</option>
                    <option>VH-002</option>
                    <option>VH-003</option>
                  </select>
                  <input
                    type="number"
                    value={newFuel.amount}
                    onChange={(e) => setNewFuel({ ...newFuel, amount: e.target.value })}
                    className="border rounded px-3 py-2 text-sm"
                    placeholder="Amount (₦)"
                  />
                  <input
                    type="number"
                    value={newFuel.liters}
                    onChange={(e) => setNewFuel({ ...newFuel, liters: e.target.value })}
                    className="border rounded px-3 py-2 text-sm"
                    placeholder="Liters"
                  />
                  <input
                    type="number"
                    value={newFuel.odoReading}
                    onChange={(e) => setNewFuel({ ...newFuel, odoReading: e.target.value })}
                    className="border rounded px-3 py-2 text-sm col-span-2"
                    placeholder="Odometer Reading"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddFuel}
                    className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowFuelForm(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Vehicle</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                    <th className="px-4 py-2 text-right">Liters</th>
                    <th className="px-4 py-2 text-right">Odo Reading</th>
                  </tr>
                </thead>
                <tbody>
                  {fuelEntries.slice(-5).reverse().map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{entry.date}</td>
                      <td className="px-4 py-2">{entry.vehicleId}</td>
                      <td className="px-4 py-2 text-right">₦{entry.amount}</td>
                      <td className="px-4 py-2 text-right">{entry.liters}L</td>
                      <td className="px-4 py-2 text-right">{entry.odoReading} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Odometer & Service Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Wrench className="text-red-500" size={24} />
                Service Schedule
              </h2>
              <button
                onClick={() => setShowOdoForm(!showOdoForm)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
              >
                + Update Odo
              </button>
            </div>

            {showOdoForm && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-red-200">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <select
                    value={newOdo.vehicleId}
                    onChange={(e) => setNewOdo({ ...newOdo, vehicleId: e.target.value })}
                    className="border rounded px-3 py-2 text-sm"
                  >
                    <option>Select Vehicle</option>
                    {odoReadings.map((odo) => (
                      <option key={odo.vehicleId} value={odo.vehicleId}>
                        {odo.vehicleId}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={newOdo.current}
                    onChange={(e) => setNewOdo({ ...newOdo, current: e.target.value })}
                    className="border rounded px-3 py-2 text-sm"
                    placeholder="Current Odometer Reading"
                  />
                  <input
                    type="number"
                    value={newOdo.nextService}
                    onChange={(e) => setNewOdo({ ...newOdo, nextService: e.target.value })}
                    className="border rounded px-3 py-2 text-sm"
                    placeholder="Next Service Km (optional)"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddOdo}
                    className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowOdoForm(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {odoReadings.map((odo) => {
                const status = getServiceStatus(odo.current, odo.nextService);
                const statusColors = {
                  ok: 'bg-green-50 border-green-200',
                  warning: 'bg-yellow-50 border-yellow-200',
                  urgent: 'bg-orange-50 border-orange-200',
                  overdue: 'bg-red-50 border-red-200'
                };
                const statusText = {
                  ok: 'On Track',
                  warning: 'Approaching Service',
                  urgent: 'Service Urgent',
                  overdue: 'Service Overdue'
                };

                return (
                  <div key={odo.vehicleId} className={`border-2 rounded-lg p-4 ${statusColors[status]}`}>
                    <h3 className="font-bold text-gray-800 mb-3">{odo.vehicleId}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-bold">{odo.current} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Service:</span>
                        <span className="font-bold">{odo.nextService} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Remaining:</span>
                        <span className="font-bold">{odo.nextService - odo.current} km</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          status === 'ok' ? 'bg-green-200 text-green-800' :
                          status === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                          status === 'urgent' ? 'bg-orange-200 text-orange-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {statusText[status]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Out of Town Trips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="text-blue-500" size={24} />
              Out of Town Trips
            </h2>
            <div className="space-y-3">
              {outOfTownTrips.map((trip) => {
                const tripDays = getTripDates(trip.startDate, trip.endDate).length;
                return (
                  <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">{trip.destination}</h3>
                        <p className="text-sm text-gray-600">{trip.driver} • {trip.vehicleId}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        trip.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                        trip.status === 'Confirmed' ? 'bg-green-200 text-green-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-bold">{trip.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">End Date</p>
                        <p className="font-bold">{trip.endDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-bold">{tripDays} days</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Passengers</p>
                        <p className="font-bold">{trip.passengers}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Calendar & Uploads */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="text-blue-500" size={20} />
                Trip Calendar
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ←
                </button>
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                  className="text-gray-600 hover:text-gray-800"
                >
                  →
                </button>
              </div>
            </div>

            <h3 className="text-center font-bold mb-4">
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-bold text-xs text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>

            <div className="mt-4 text-xs text-gray-600 space-y-1">
              <p><span className="inline-block w-3 h-3 bg-blue-100 border border-blue-400 mr-2"></span>Today</p>
              <p><span className="inline-block w-3 h-3 bg-green-50 border border-green-400 mr-2"></span>Trips Scheduled</p>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Upload className="text-green-500" size={20} />
                File Upload
              </h2>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
              >
                Upload
              </button>
            </div>

            {showUploadModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <h3 className="text-lg font-bold mb-4">Upload File</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">File Type</label>
                    <select
                      value={uploadType}
                      onChange={(e) => setUploadType(e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm"
                    >
                      <option value="fuel_receipt">Fuel Receipt</option>
                      <option value="odo_reading">Odometer Reading</option>
                      <option value="service_record">Service Record</option>
                      <option value="insurance">Insurance Document</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Select File</label>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleUploadSubmit}
                      disabled={!uploadFile}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 disabled:bg-gray-400"
                    >
                      Upload
                    </button>
                    <button
                      onClick={() => {
                        setShowUploadModal(false);
                        setUploadFile(null);
                      }}
                      className="flex-1 bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {uploadedFiles.slice(-5).reverse().map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <Upload size={16} className="text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.date} • {file.type.replace(/_/g, ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
