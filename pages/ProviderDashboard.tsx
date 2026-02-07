
import React, { useState } from 'react';
import { User } from '../types';

interface ProviderDashboardProps {
  user: User;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ user }) => {
  const [online, setOnline] = useState(true);
  const [trackingActive, setTrackingActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'history'>('requests');

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="bg-white p-8 rounded-[3rem] border shadow-xl shadow-gray-200/50 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-google-blue rounded-[1.25rem] flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-blue-500/20">
              {user.name[0]}
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 italic uppercase">{user.name}</h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{online ? '🟢 Online & Receiving Jobs' : '⚪ Offline'}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setOnline(!online)}
              className={`px-8 py-3.5 rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest transition-all ${online ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-600 text-white'}`}
            >
              {online ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <StatCard label="Jobs Today" val="12" icon="📅" />
          <StatCard label="Rating" val="4.9" icon="⭐" />
          <StatCard label="Today Earning" val="₹850" icon="💰" />
          <StatCard label="Profile Status" val="VERIFIED" icon="✓" success />
        </div>

        <div className="bg-white border rounded-[3rem] shadow-2xl shadow-gray-200/50 overflow-hidden">
          <div className="p-8 border-b bg-gray-50/50 flex gap-8">
            <TabBtn active={activeTab === 'requests'} onClick={() => setActiveTab('requests')} label="New Requests" />
            <TabBtn active={activeTab === 'active'} onClick={() => setActiveTab('active')} label="Active Job" />
            <TabBtn active={activeTab === 'history'} onClick={() => setActiveTab('history')} label="History" />
          </div>

          <div className="p-8">
            {activeTab === 'requests' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {[1, 2].map(i => (
                  <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-google-blue text-[9px] font-black uppercase tracking-widest rounded-lg">NEW BOOKING</span>
                        <span className="text-gray-400 font-bold text-[10px]">2.4 km away</span>
                      </div>
                      <h4 className="text-xl font-black text-gray-900 uppercase italic">AC Filter Cleaning</h4>
                      <p className="text-gray-500 font-bold text-xs">Customer: Rahul Sharma • Rohini, Sector 8</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-google-blue text-white px-8 py-3.5 rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Accept Job</button>
                      <button className="bg-gray-50 text-gray-400 px-8 py-3.5 rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-gray-200">Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'active' && (
              <div className="animate-in slide-in-from-bottom duration-500">
                 <div className="bg-google-blue/5 border-2 border-dashed border-google-blue/20 rounded-[3rem] p-10">
                    <div className="flex flex-col md:flex-row justify-between gap-12">
                       <div className="space-y-6 flex-1">
                          <h3 className="text-3xl font-black text-gray-900 uppercase italic">Current Job</h3>
                          <div className="space-y-4">
                             <DetailItem icon="👤" label="Customer" value="Arun Gupta" />
                             <DetailItem icon="📍" label="Address" value="Plot 12, Sector 15, Dwarka" />
                             <DetailItem icon="📱" label="Contact" value="+91 98XXX-XXXXX" />
                          </div>
                          <div className="pt-8 flex gap-4">
                             <button 
                                onClick={() => setTrackingActive(!trackingActive)}
                                className={`flex-1 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all ${trackingActive ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30' : 'bg-google-blue text-white shadow-xl shadow-blue-500/30'}`}
                             >
                                {trackingActive ? '🛑 STOP LIVE LOCATION' : '📍 START LIVE TRACKING'}
                             </button>
                             <button className="flex-1 bg-black text-white py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">MARK AS REACHED</button>
                          </div>
                       </div>
                       <div className="w-full md:w-80 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50 flex flex-col items-center justify-center text-center">
                          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-xl shadow-green-500/10">📍</div>
                          <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">Tracking Active</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase leading-relaxed">Aapki location customer ke saath share ki ja rahi hai.</p>
                       </div>
                    </div>
                 </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div className="text-center py-24 opacity-30 grayscale">
                <span className="text-6xl mb-6">📦</span>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-4">Completed Jobs List is Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, val, icon, success }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border shadow-xl shadow-gray-200/50 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 shadow-lg ${success ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-900'}`}>{icon}</div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-black ${success ? 'text-green-600' : 'text-gray-900'}`}>{val}</p>
  </div>
);

const TabBtn = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`font-black text-[10px] uppercase tracking-widest transition-all ${active ? 'text-google-blue border-b-2 border-google-blue pb-1' : 'text-gray-400'}`}
  >
    {label}
  </button>
);

const DetailItem = ({ icon, label, value }: any) => (
  <div className="flex gap-4">
    <span className="text-lg opacity-60">{icon}</span>
    <div>
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-black text-gray-900 italic uppercase">{value}</p>
    </div>
  </div>
);

export default ProviderDashboard;
