
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: 'landing' | 'auth' | 'dashboard' | 'all-jobs' | 'financial-services') => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-4 md:px-8 h-20 flex items-center justify-between">
      <div 
        className="flex items-center cursor-pointer h-full py-2" 
        onClick={() => onNavigate('landing')}
      >
        <img 
          src="https://i.ibb.co/TDk9wgMm/Local-Rozgar-250-x-100-px-250-x-80-px.png" 
          alt="LocalRozgar Logo" 
          className="h-12 w-auto object-contain"
        />
      </div>

      <div className="hidden md:flex items-center gap-8 ml-8">
        <button onClick={() => onNavigate('all-jobs')} className="text-sm font-bold text-gray-600 hover:text-google-blue">Browse Jobs</button>
        <button onClick={() => onNavigate('financial-services')} className="text-sm font-bold text-gray-600 hover:text-google-blue">Insurance & Loans</button>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase().replace('_', ' ')}</p>
            </div>
            <div 
              className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-google-blue font-bold cursor-pointer border-2 border-white shadow-sm"
              onClick={() => onNavigate('dashboard')}
            >
              {user.name[0]}
            </div>
            <button 
              onClick={onLogout}
              className="text-sm text-red-500 hover:text-red-700 font-bold ml-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('auth')}
              className="px-5 py-2.5 text-google-blue font-bold hover:bg-blue-50 rounded-xl transition-all"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigate('auth')}
              className="px-6 py-2.5 bg-google-blue text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
