
import React, { useState } from 'react';
import { User } from '../types';

interface CompanyDashboardProps {
  user: User;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ user }) => {
  const [tab, setTab] = useState<'active' | 'post' | 'leads'>('active');
  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">Company Dashboard - Manage your listings</p>
          </div>
          <button 
            onClick={() => { setTab('post'); setShowPostModal(true); }}
            className="bg-google-blue text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition"
          >
            + Post New Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <p className="text-sm font-bold text-gray-500 uppercase">Active Jobs</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <p className="text-sm font-bold text-gray-500 uppercase">Total Leads</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">148</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <p className="text-sm font-bold text-gray-500 uppercase">Verification</p>
            <p className="text-sm font-bold text-green-600 mt-3 flex items-center gap-1">✔ COMPLETED</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <p className="text-sm font-bold text-gray-500 uppercase">Views</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">2.4k</p>
          </div>
        </div>

        <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b flex gap-6">
            <button onClick={() => setTab('active')} className={`font-bold transition ${tab === 'active' ? 'text-google-blue border-b-2 border-google-blue pb-1' : 'text-gray-400'}`}>My Jobs</button>
            <button onClick={() => setTab('leads')} className={`font-bold transition ${tab === 'leads' ? 'text-google-blue border-b-2 border-google-blue pb-1' : 'text-gray-400'}`}>Leads Received</button>
          </div>

          <div className="p-8">
            {tab === 'active' ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 border rounded-2xl hover:bg-gray-50 transition gap-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Delivery Boy (Full Time)</h4>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>Posted: 2 days ago</span>
                        <span>Views: 120</span>
                        <span>Applies: 45</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-xs font-bold text-gray-600 border rounded-lg">Edit</button>
                      <button className="px-4 py-2 text-xs font-bold text-red-600 border border-red-100 rounded-lg">Deactivate</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400">Leads forwarded by Admin will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPostModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowPostModal(false); alert('Job submitted for Admin approval!'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Job Title</label>
                <input required type="text" className="w-full bg-gray-50 border px-4 py-3 rounded-xl focus:outline-none" placeholder="e.g. Sales Executive" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                  <input required type="text" className="w-full bg-gray-50 border px-4 py-3 rounded-xl focus:outline-none" placeholder="City" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Salary Range</label>
                  <input required type="text" className="w-full bg-gray-50 border px-4 py-3 rounded-xl focus:outline-none" placeholder="e.g. 15k-20k" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Job Description</label>
                <textarea className="w-full bg-gray-50 border px-4 py-3 rounded-xl focus:outline-none h-32" placeholder="Describe requirements..."></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-google-blue text-white py-4 rounded-xl font-bold">Submit for Approval</button>
                <button type="button" onClick={() => setShowPostModal(false)} className="px-8 bg-gray-100 text-gray-600 rounded-xl font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
