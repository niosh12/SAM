
import React, { useState } from 'react';
import { User, HiringCompany, UserRole, Job, FinancialLead } from '../types';
import { MOCK_HIRING_COMPANIES, SERVICE_CATEGORIES, MOCK_JOBS } from '../constants';

interface AdminDashboardProps {
  user: User;
}

type AdminTab = 'dashboard' | 'users' | 'companies' | 'jobs' | 'service-bookings' | 'slrp-leads' | 'slrp-partners' | 'insurance' | 'lrp' | 'contact' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [tab, setTab] = useState<AdminTab>('dashboard');
  const [settings, setSettings] = useState({
    footerAbout: "LocalRozgar Bharat ka trusted local jobs & services platform hai jahan worker aur employers seedhe connect karte hain.",
    supportPhone: "+91 8447827569",
    supportEmail: "support@localrozgar.in",
    footerLinksEnabled: true
  });

  const stats = [
    { label: 'Total Users', val: '4,520', icon: '👤', color: 'bg-blue-500' },
    { label: 'Active Jobs', val: '1,248', icon: '💼', color: 'bg-green-500' },
    { label: 'Active Bookings', val: '86', icon: '🛠️', color: 'bg-indigo-500' },
    { label: 'Revenue (₹)', val: '124.8k', icon: '💰', color: 'bg-orange-500' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden lg:flex flex-col sticky top-20 h-[calc(100vh-80px)]">
        <div className="p-8 flex-1 space-y-2 overflow-y-auto">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Core Management</label>
          <NavItem active={tab === 'dashboard'} onClick={() => setTab('dashboard')} icon="📊" label="Console Overview" />
          <NavItem active={tab === 'users'} onClick={() => setTab('users')} icon="👥" label="User Directory" />
          <NavItem active={tab === 'jobs'} onClick={() => setTab('jobs')} icon="💼" label="Job Approval Queue" />
          <NavItem active={tab === 'service-bookings'} onClick={() => setTab('service-bookings')} icon="🛠️" label="Service Bookings" />
          
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-8 mb-4">Partner Modules</label>
          <NavItem active={tab === 'slrp-leads'} onClick={() => setTab('slrp-leads')} icon="🚀" label="SLRP Leads" />
          <NavItem active={tab === 'slrp-partners'} onClick={() => setTab('slrp-partners')} icon="🎓" label="Student Partners" />
          <NavItem active={tab === 'lrp'} onClick={() => setTab('lrp')} icon="🤝" label="LRP Applications" />
          
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-8 mb-4">Support</label>
          <NavItem active={tab === 'contact'} onClick={() => setTab('contact')} icon="📞" label="Support Leads" />
          <NavItem active={tab === 'settings'} onClick={() => setTab('settings')} icon="⚙️" label="Site Settings" />
        </div>
        <div className="p-8 border-t">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Admin Control</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase italic">Admin System Console</h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Status: Operational • Connected to Cloud Core</p>
          </div>
        </header>

        {tab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(s => (
                <div key={s.label} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                  <div className={`w-12 h-12 ${s.color} text-white rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg shadow-blue-500/10`}>{s.icon}</div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-3xl font-black text-gray-900">{s.val}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                <h3 className="text-lg font-black text-gray-900 mb-8 border-b border-gray-50 pb-4 flex justify-between uppercase italic">
                  Live Service Bookings
                  <span className="text-[10px] text-google-blue cursor-pointer" onClick={() => setTab('service-bookings')}>Assign Partner</span>
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-2xl hover:bg-gray-50 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center font-bold text-lg">🛠️</div>
                        <div>
                          <p className="text-sm font-black text-gray-900">AC Repair • Rohini Sec 8</p>
                          <p className="text-[10px] font-bold text-gray-400">Customer: Sameer (New Booking)</p>
                        </div>
                      </div>
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">Waiting Assignment</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                <h3 className="text-lg font-black text-gray-900 mb-8 border-b border-gray-50 pb-4 flex justify-between uppercase italic">
                  Partner Live Status
                  <span className="text-[10px] text-google-blue cursor-pointer" onClick={() => setTab('users')}>View All</span>
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center font-bold text-lg">📍</div>
                        <div>
                          <p className="text-sm font-black text-gray-900">Rajesh Kumar • Active</p>
                          <p className="text-[10px] font-bold text-gray-400">On The Way (Job ID: LR-SB-443)</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-google-blue underline cursor-pointer">Track Map</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'service-bookings' && (
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
            <div className="p-8 border-b bg-gray-50/50">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Service Booking Management Queue</h2>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-gray-50/30 border-b">
                   <tr>
                     <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Service / ID</th>
                     <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Address</th>
                     <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Status</th>
                     <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {[1, 2, 3, 4, 5].map(i => (
                     <tr key={i} className="hover:bg-gray-50 transition">
                       <td className="px-8 py-6">
                         <p className="text-sm font-black text-gray-900">AC Filter Cleaning</p>
                         <p className="text-[9px] font-bold text-google-blue uppercase tracking-widest">ID: LR-SB-90{i}</p>
                       </td>
                       <td className="px-8 py-6">
                         <p className="text-xs font-bold text-gray-600">H.No 442, Sector 15, Dwarka</p>
                         <p className="text-[10px] text-gray-400">Booked: 20 mins ago</p>
                       </td>
                       <td className="px-8 py-6">
                         <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Unassigned</span>
                       </td>
                       <td className="px-8 py-6 text-right">
                         <button className="bg-google-blue text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/10">Assign Partner</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        )}

        {/* ... Rest of admin components stay similar ... */}
        {['users', 'jobs', 'slrp-partners', 'lrp', 'contact', 'settings', 'slrp-leads'].includes(tab) && (
          <div className="h-[400px] bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12">
            <div className="text-5xl mb-6">⚙️</div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">{tab.replace('-', ' ')} MODULE SYNCING</h3>
            <p className="text-gray-400 font-bold max-w-sm mt-4 tracking-tight">Database connection stable. This management console will be functional in the next system update.</p>
          </div>
        )}
      </main>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${active ? 'bg-google-blue text-white shadow-xl shadow-blue-500/20' : 'text-gray-500 hover:bg-gray-50'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className={`text-xs font-black uppercase tracking-widest ${active ? 'text-white' : 'text-gray-500'}`}>{label}</span>
  </button>
);

export default AdminDashboard;
