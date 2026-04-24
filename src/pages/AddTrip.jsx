import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

function AddTrip() {
  const [formData, setFormData] = useState({
    tripType: 'airport-transfer',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    passengerCount: '1',
    specialRequirements: '',
    // Airport Transfer Specific
    flightNumber: '',
    arrivalDeparture: 'arrival',
    // Door-to-Door Specific
    serviceType: 'standard',
    // Out of Town Specific
    destination: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.dropoffLocation.trim()) newErrors.dropoffLocation = 'Dropoff location is required';
    if (!formData.passengerCount || formData.passengerCount < 1) newErrors.passengerCount = 'Passenger count must be at least 1';

    if (formData.tripType === 'airport-transfer') {
      if (!formData.flightNumber.trim()) newErrors.flightNumber = 'Flight number is required';
    }

    if (formData.tripType === 'out-of-town') {
      if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
      if (formData.endDate && !formData.endTime) newErrors.endTime = 'End time is required for out-of-town trips';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      setErrors({});
      setTimeout(() => {
        setFormData({
          tripType: 'airport-transfer',
          startDate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          pickupLocation: '',
          dropoffLocation: '',
          passengerCount: '1',
          specialRequirements: '',
          flightNumber: '',
          arrivalDeparture: 'arrival',
          serviceType: 'standard',
          destination: '',
        });
        setSubmitted(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Trip</h1>
        <p className="text-gray-600 mt-2">Schedule and manage new transportation trips.</p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center gap-3">
          <CheckCircle className="text-green-600" size={24} />
          <div>
            <p className="font-semibold text-green-800">Trip created successfully!</p>
            <p className="text-sm text-green-700">The trip has been added and drivers can now view it for assignment.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-8">
        {/* Trip Basics */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Trip Basics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="form-label">Trip Type *</label>
              <select
                name="tripType"
                value={formData.tripType}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="airport-transfer">Airport Transfer</option>
                <option value="door-to-door">Door-to-Door Service</option>
                <option value="crew-transport">Crew Transportation</option>
                <option value="out-of-town">Out of Town Trip</option>
              </select>
            </div>
            <div>
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`form-input ${errors.startDate ? 'border-red-500' : ''}`}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <label className="form-label">Start Time *</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className={`form-input ${errors.startTime ? 'border-red-500' : ''}`}
              />
              {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
            </div>
          </div>
        </section>

        {/* Trip Details */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Trip Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Pickup Location *</label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className={`form-input ${errors.pickupLocation ? 'border-red-500' : ''}`}
                placeholder="e.g., Windhoek International Airport"
              />
              {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
            </div>
            <div>
              <label className="form-label">Dropoff Location *</label>
              <input
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                className={`form-input ${errors.dropoffLocation ? 'border-red-500' : ''}`}
                placeholder="e.g., City Center Hotel"
              />
              {errors.dropoffLocation && <p className="text-red-500 text-sm mt-1">{errors.dropoffLocation}</p>}
            </div>
            <div>
              <label className="form-label">Number of Passengers *</label>
              <input
                type="number"
                name="passengerCount"
                value={formData.passengerCount}
                onChange={handleInputChange}
                className={`form-input ${errors.passengerCount ? 'border-red-500' : ''}`}
                min="1"
                max="20"
              />
              {errors.passengerCount && <p className="text-red-500 text-sm mt-1">{errors.passengerCount}</p>}
            </div>
            <div>
              <label className="form-label">Special Requirements</label>
              <input
                type="text"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., wheelchair accessible, child seats"
              />
            </div>
          </div>
        </section>

        {/* Conditional Fields */}
        {formData.tripType === 'airport-transfer' && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Flight Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Flight Number *</label>
                <input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleInputChange}
                  className={`form-input ${errors.flightNumber ? 'border-red-500' : ''}`}
                  placeholder="e.g., SW340"
                />
                {errors.flightNumber && <p className="text-red-500 text-sm mt-1">{errors.flightNumber}</p>}
              </div>
              <div>
                <label className="form-label">Type</label>
                <select
                  name="arrivalDeparture"
                  value={formData.arrivalDeparture}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="arrival">Arrival</option>
                  <option value="departure">Departure</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {formData.tripType === 'door-to-door' && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Service Type</h2>
            <div>
              <label className="form-label">Service Level</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="executive">Executive</option>
              </select>
            </div>
          </section>
        )}

        {formData.tripType === 'out-of-town' && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Out of Town Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">Destination *</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className={`form-input ${errors.destination ? 'border-red-500' : ''}`}
                  placeholder="e.g., Etosha National Park"
                />
                {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
              </div>
              <div>
                <label className="form-label">Return Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Return Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className={`form-input ${errors.endTime ? 'border-red-500' : ''}`}
                />
                {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
              </div>
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Trip...' : 'Create Trip'}
          </button>
          <button
            type="reset"
            className="btn-secondary"
            onClick={() => {
              setFormData({
                tripType: 'airport-transfer',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
                pickupLocation: '',
                dropoffLocation: '',
                passengerCount: '1',
                specialRequirements: '',
                flightNumber: '',
                arrivalDeparture: 'arrival',
                serviceType: 'standard',
                destination: '',
              });
              setErrors({});
            }}
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTrip;
