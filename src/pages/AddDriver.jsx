import React, { useState } from 'react';
import { Upload, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

function AddDriver() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    licenseNumber: '',
    licenseExpiry: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    registrationNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    availability: {
      monday: { checked: false, startTime: '08:00', endTime: '17:00' },
      tuesday: { checked: false, startTime: '08:00', endTime: '17:00' },
      wednesday: { checked: false, startTime: '08:00', endTime: '17:00' },
      thursday: { checked: false, startTime: '08:00', endTime: '17:00' },
      friday: { checked: false, startTime: '08:00', endTime: '17:00' },
      saturday: { checked: false, startTime: '08:00', endTime: '17:00' },
      sunday: { checked: false, startTime: '08:00', endTime: '17:00' },
    },
    documents: {
      license: null,
      backgroundCheck: null,
    },
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    if (!formData.licenseExpiry) newErrors.licenseExpiry = 'License expiry date is required';
    else {
      const expiryDate = new Date(formData.licenseExpiry);
      if (expiryDate < new Date()) newErrors.licenseExpiry = 'License expiry date must be in the future';
    }
    if (!formData.vehicleMake.trim()) newErrors.vehicleMake = 'Vehicle make is required';
    if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required';
    if (!formData.vehicleYear) newErrors.vehicleYear = 'Vehicle year is required';
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactNumber.trim()) newErrors.emergencyContactNumber = 'Emergency contact number is required';

    const anyDaySelected = Object.values(formData.availability).some(day => day.checked);
    if (!anyDaySelected) newErrors.availability = 'Select at least one day of availability';

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }));
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [docType]: file.name
        }
      }));
    }
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
          fullName: '',
          contactNumber: '',
          email: '',
          licenseNumber: '',
          licenseExpiry: '',
          vehicleMake: '',
          vehicleModel: '',
          vehicleYear: '',
          registrationNumber: '',
          emergencyContactName: '',
          emergencyContactNumber: '',
          availability: {
            monday: { checked: false, startTime: '08:00', endTime: '17:00' },
            tuesday: { checked: false, startTime: '08:00', endTime: '17:00' },
            wednesday: { checked: false, startTime: '08:00', endTime: '17:00' },
            thursday: { checked: false, startTime: '08:00', endTime: '17:00' },
            friday: { checked: false, startTime: '08:00', endTime: '17:00' },
            saturday: { checked: false, startTime: '08:00', endTime: '17:00' },
            sunday: { checked: false, startTime: '08:00', endTime: '17:00' },
          },
          documents: {
            license: null,
            backgroundCheck: null,
          },
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
        <h1 className="text-3xl font-bold text-gray-900">Add New Driver</h1>
        <p className="text-gray-600 mt-2">Register a new driver to your transportation fleet.</p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center gap-3">
          <CheckCircle className="text-green-600" size={24} />
          <div>
            <p className="font-semibold text-green-800">Driver added successfully!</p>
            <p className="text-sm text-green-700">The driver has been registered and can now receive trip assignments.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-8">
        {/* Personal Information */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`form-input ${errors.fullName ? 'border-red-500' : ''}`}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="form-label">Contact Number *</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.contactNumber ? 'border-red-500' : ''}`}
                placeholder="+264 81 234 5678"
              />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
            <div>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
        </section>

        {/* License Information */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">License Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">License Number *</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.licenseNumber ? 'border-red-500' : ''}`}
                placeholder="LIC123456"
              />
              {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
            </div>
            <div>
              <label className="form-label">License Expiry Date *</label>
              <input
                type="date"
                name="licenseExpiry"
                value={formData.licenseExpiry}
                onChange={handleInputChange}
                className={`form-input ${errors.licenseExpiry ? 'border-red-500' : ''}`}
              />
              {errors.licenseExpiry && <p className="text-red-500 text-sm mt-1">{errors.licenseExpiry}</p>}
            </div>
          </div>
        </section>

        {/* Vehicle Details */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Vehicle Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Vehicle Make *</label>
              <input
                type="text"
                name="vehicleMake"
                value={formData.vehicleMake}
                onChange={handleInputChange}
                className={`form-input ${errors.vehicleMake ? 'border-red-500' : ''}`}
                placeholder="Toyota"
              />
              {errors.vehicleMake && <p className="text-red-500 text-sm mt-1">{errors.vehicleMake}</p>}
            </div>
            <div>
              <label className="form-label">Vehicle Model *</label>
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleInputChange}
                className={`form-input ${errors.vehicleModel ? 'border-red-500' : ''}`}
                placeholder="Hiace"
              />
              {errors.vehicleModel && <p className="text-red-500 text-sm mt-1">{errors.vehicleModel}</p>}
            </div>
            <div>
              <label className="form-label">Vehicle Year *</label>
              <input
                type="number"
                name="vehicleYear"
                value={formData.vehicleYear}
                onChange={handleInputChange}
                className={`form-input ${errors.vehicleYear ? 'border-red-500' : ''}`}
                placeholder="2022"
                min="1990"
                max={new Date().getFullYear()}
              />
              {errors.vehicleYear && <p className="text-red-500 text-sm mt-1">{errors.vehicleYear}</p>}
            </div>
            <div>
              <label className="form-label">Registration Number *</label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.registrationNumber ? 'border-red-500' : ''}`}
                placeholder="N12345AB"
              />
              {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>}
            </div>
          </div>
        </section>

        {/* Availability Schedule */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Availability Schedule</h2>
          {errors.availability && <p className="text-red-500 text-sm mb-4">{errors.availability}</p>}
          <div className="space-y-3">
            {Object.entries(formData.availability).map(([day, times]) => (
              <div key={day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={times.checked}
                  onChange={(e) => handleAvailabilityChange(day, 'checked', e.target.checked)}
                  className="w-5 h-5 text-primary rounded"
                />
                <span className="w-24 font-medium text-gray-700 capitalize">{day}</span>
                {times.checked && (
                  <>
                    <input
                      type="time"
                      value={times.startTime}
                      onChange={(e) => handleAvailabilityChange(day, 'startTime', e.target.value)}
                      className="form-input flex-1 max-w-xs"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={times.endTime}
                      onChange={(e) => handleAvailabilityChange(day, 'endTime', e.target.value)}
                      className="form-input flex-1 max-w-xs"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Contact Name *</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className={`form-input ${errors.emergencyContactName ? 'border-red-500' : ''}`}
                placeholder="Jane Doe"
              />
              {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
            </div>
            <div>
              <label className="form-label">Emergency Number *</label>
              <input
                type="tel"
                name="emergencyContactNumber"
                value={formData.emergencyContactNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.emergencyContactNumber ? 'border-red-500' : ''}`}
                placeholder="+264 81 234 5678"
              />
              {errors.emergencyContactNumber && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactNumber}</p>}
            </div>
          </div>
        </section>

        {/* Document Uploads */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Document Uploads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Driver's License Copy</label>
              <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                <div className="flex flex-col items-center">
                  <Upload className="text-gray-400" size={24} />
                  <span className="mt-2 text-sm font-medium text-gray-700">
                    {formData.documents.license ? formData.documents.license : 'Click to upload'}
                  </span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'license')}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <label className="form-label">Background Check (Optional)</label>
              <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                <div className="flex flex-col items-center">
                  <Upload className="text-gray-400" size={24} />
                  <span className="mt-2 text-sm font-medium text-gray-700">
                    {formData.documents.backgroundCheck ? formData.documents.backgroundCheck : 'Click to upload'}
                  </span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'backgroundCheck')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Driver...' : 'Add Driver'}
          </button>
          <button
            type="reset"
            className="btn-secondary"
            onClick={() => {
              setFormData({
                fullName: '',
                contactNumber: '',
                email: '',
                licenseNumber: '',
                licenseExpiry: '',
                vehicleMake: '',
                vehicleModel: '',
                vehicleYear: '',
                registrationNumber: '',
                emergencyContactName: '',
                emergencyContactNumber: '',
                availability: {
                  monday: { checked: false, startTime: '08:00', endTime: '17:00' },
                  tuesday: { checked: false, startTime: '08:00', endTime: '17:00' },
                  wednesday: { checked: false, startTime: '08:00', endTime: '17:00' },
                  thursday: { checked: false, startTime: '08:00', endTime: '17:00' },
                  friday: { checked: false, startTime: '08:00', endTime: '17:00' },
                  saturday: { checked: false, startTime: '08:00', endTime: '17:00' },
                  sunday: { checked: false, startTime: '08:00', endTime: '17:00' },
                },
                documents: {
                  license: null,
                  backgroundCheck: null,
                },
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

export default AddDriver;
