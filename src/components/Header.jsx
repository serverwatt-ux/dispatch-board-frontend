import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';

function Header({ setMenuOpen }) {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const [currentTime, setCurrentTime] = React.useState(getCurrentDateTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentDateTime());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Dispatch Board</h1>
            <p className="text-sm text-gray-600">{currentTime}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 border-l pl-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">serverwatt-ux</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
