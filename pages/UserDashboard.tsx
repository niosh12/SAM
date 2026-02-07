
import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_JOBS, MOCK_PROVIDERS, SERVICE_CATEGORIES } from '../constants';
import PDFGenerator from '../components/PDFGenerator';
import { ViewState } from '../App';

interface UserDashboardProps {
  user: User;
  onNavigate: (view: ViewState) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onNavigate }) => {
  const [tab, setTab] = useState<'jobs' | 'services' | 'history'>('jobs');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPDF, setShowPDF] = useState(false);

  const handleBook = (item: any) => {
    setSelectedItem(item);
    setShowPDF(true);
    // In a real app, this would trigger email/firebase alerts
    alert(`Success! Lead forwarded to ${item.name || item.companyName}. PDF generated.`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 bg-white p-8 rounded-[2.5rem] border shadow-xl shadow-gray-200/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 italic uppercase">Namaste, {user.name}! 👋</h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Aaj hum aapki kaise madad karein?</p>
          </div>
          <div className="flex gap-2">
            <TabBtn active={tab === 'jobs'} onClick={() => setTab('jobs')} label="Jobs" />
            <TabBtn active={tab === 'services'} onClick={() => setTab('services')} label="Services" />
            <TabBtn active={tab === 'history'} onClick={() => setTab('history')} label="History" />
          </div>
        </div>

        {/* Content */}
        {tab === 'jobs' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_JOBS.map(job => (
                <JobCard key={job.id} job={job} onApply={() => handleBook(job)} />
              ))}
            </div>
          </div>
        )}

        {tab === 'services' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {SERVICE_CATEGORIES.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => onNavigate('services-listing')}
                  className="bg-white p-6 rounded-[2rem] border shadow-sm flex flex-col items-center gap-2 hover:border-google-blue hover:shadow-xl transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition">{c.icon}</span>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{c.name}</span>
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {MOCK_PROVIDERS.map(provider => (
                <ProviderCard key={provider.id} provider={provider} onBook={() => onNavigate('service-booking')} />
              ))}
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="bg-white border rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/40 animate-in fade-in duration-500">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-gray-50/50 transition">
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-gray-900">AC Repair Booking</p>
                    <p className="text-[9px] font-bold text-google-blue uppercase">ID: LR-SB-4432</p>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Service</td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-400">Today, 10:30 AM</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => onNavigate('service-tracking')}
                      className="bg-google-blue text-white px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                    >
                      Track Live 🚚
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition">
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-gray-900">Delivery Executive</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Employer: Flipkart</p>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Job</td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-400">24 Oct 2024</td>
                  <td className="px-8 py-6 text-right">
                    <span className="bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">Applied</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showPDF && selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowPDF(false)} className="absolute top-6 right-6 bg-gray-100 p-2 rounded-xl hover:bg-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="p-8">
              <PDFGenerator user={user} item={selectedItem} />
              <div className="mt-8 flex gap-4 no-print">
                <button 
                  onClick={() => window.print()} 
                  className="flex-1 bg-google-blue text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${active ? 'bg-google-blue text-white shadow-xl shadow-blue-500/20' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
  >
    {label}
  </button>
);

const JobCard: React.FC<{ job: any; onApply: () => void }> = ({ job, onApply }) => (
  <div className="bg-white border rounded-[2.5rem] p-8 hover:shadow-2xl transition-all group flex flex-col shadow-xl shadow-gray-200/40">
    <div className="flex gap-6 mb-8 items-start">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-google-blue font-black text-2xl group-hover:bg-google-blue group-hover:text-white transition-all">{job.companyName[0]}</div>
      <div>
        <h3 className="text-xl font-black text-gray-900 leading-tight italic uppercase">{job.title}</h3>
        <p className="text-google-blue font-black text-xs uppercase tracking-widest">{job.companyName}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">
      <span className="bg-gray-50 px-3 py-1.5 rounded-lg">📍 {job.location}</span>
      <span className="bg-gray-50 px-3 py-1.5 rounded-lg">💰 {job.salary}</span>
      <span className="bg-gray-50 px-3 py-1.5 rounded-lg">🕒 {job.type}</span>
    </div>
    <button onClick={onApply} className="w-full bg-google-blue text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/10 hover:shadow-none transition-all active:scale-95">
      Apply Now
    </button>
  </div>
);

const ProviderCard: React.FC<{ provider: any; onBook: () => void }> = ({ provider, onBook }) => (
  <div className="bg-white border rounded-[2.5rem] p-8 hover:shadow-2xl transition-all flex flex-col items-center text-center shadow-xl shadow-gray-200/40">
    <div className="w-20 h-20 bg-gray-50 rounded-full mb-6 border-4 border-white shadow-lg overflow-hidden shrink-0">
      <img src={`https://i.pravatar.cc/150?u=${provider.id}`} alt={provider.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex items-center gap-1 mb-1">
      <h3 className="text-lg font-black text-gray-900 uppercase italic tracking-tight">{provider.name}</h3>
      {provider.verified && <span className="text-google-blue font-bold">✓</span>}
    </div>
    <p className="text-google-blue font-black text-[10px] mb-4 uppercase tracking-[0.2em]">{provider.serviceType}</p>
    <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 mb-8 uppercase tracking-widest">
      <span className="flex items-center gap-1">⭐ {provider.rating}</span>
      <span className="flex items-center gap-1">💼 {provider.experience}</span>
    </div>
    <button onClick={onBook} className="w-full bg-google-blue text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/10 hover:shadow-none transition-all active:scale-95">
      Book Visit
    </button>
  </div>
);

export default UserDashboard;
