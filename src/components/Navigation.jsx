import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Plane,
  MapPin,
  Users,
  Truck,
  Plus,
  FileText,
  Settings,
  HelpCircle,
  X
} from 'lucide-react';

function Navigation({ isOpen, setIsOpen }) {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/airport-transfers', label: 'Airport Transfers', icon: Plane },
    { path: '/door-to-door', label: 'Door-to-Door Services', icon: MapPin },
    { path: '/crew-transportation', label: 'Crew Transportation', icon: Users },
    { path: '/out-of-town', label: 'Out of Town Trips', icon: Truck },
    { divider: true },
    { path: '/add-driver', label: 'Add New Driver', icon: Plus, className: 'bg-blue-50' },
    { path: '/add-trip', label: 'Add New Trip', icon: Plus, className: 'bg-green-50' },
    { divider: true },
    { path: '/reports', label: 'Reports & Analytics', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative z-50 w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          {/* Logo/Branding */}
          <div className="mb-8 hidden md:block">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Truck className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold text-primary">TranspCo</h1>
            </div>
            <p className="text-xs text-gray-500">Dispatch Management System</p>
          </div>

          {/* Menu Items */}
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return <li key={index} className="my-4 border-t border-gray-200" />;
              }

              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${item.className || ''}`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Help & Support */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <HelpCircle size={20} />
            <span className="text-sm font-medium">Help & Support</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
