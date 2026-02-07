
import React from 'react';
import { User } from '../types';
import { ViewState } from '../App';

interface BottomNavProps {
  currentView: ViewState;
  user: User | null;
  onNavigate: (view: ViewState) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, user, onNavigate }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-20 z-50 no-print shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <button 
        onClick={() => onNavigate('landing')}
        className={`flex flex-col items-center gap-1 ${currentView === 'landing' ? 'text-google-blue' : 'text-gray-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
      </button>

      <button 
        onClick={() => onNavigate('all-jobs')}
        className={`flex flex-col items-center gap-1 ${currentView === 'all-jobs' ? 'text-google-blue' : 'text-gray-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        <span className="text-[10px] font-black uppercase tracking-tighter">Jobs</span>
      </button>

      <button 
        onClick={() => onNavigate('services-listing')}
        className={`flex flex-col items-center gap-1 ${currentView === 'services-listing' ? 'text-google-blue' : 'text-gray-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        <span className="text-[10px] font-black uppercase tracking-tighter">Services</span>
      </button>

      <button 
        onClick={() => onNavigate('insurance-help')}
        className={`flex flex-col items-center gap-1 ${currentView === 'insurance-help' ? 'text-google-blue' : 'text-gray-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span className="text-[10px] font-black uppercase tracking-tighter">Insurance</span>
      </button>

      {user ? (
        <button 
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-google-blue' : 'text-gray-400'}`}
        >
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-black text-[10px] border-2 border-white shadow-sm overflow-hidden">
            {user.name[0]}
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
        </button>
      ) : (
        <button 
          onClick={() => onNavigate('auth')}
          className={`flex flex-col items-center gap-1 ${currentView === 'auth' ? 'text-google-blue' : 'text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
          <span className="text-[10px] font-black uppercase tracking-tighter">Login</span>
        </button>
      )}
    </div>
  );
};

export default BottomNav;
