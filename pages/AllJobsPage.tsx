
import React, { useState, useMemo } from 'react';
import { MOCK_JOBS, JOB_CATEGORIES } from '../constants';

interface AllJobsPageProps {
  onNavigate: (view: 'landing' | 'auth' | 'dashboard' | 'all-jobs' | 'financial-services') => void;
}

const AllJobsPage: React.FC<AllJobsPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [jobType, setJobType] = useState('All');
  const [employerType, setEmployerType] = useState('All');

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                          job.companyName.toLowerCase().includes(search.toLowerCase()) ||
                          job.location.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesType = jobType === 'All' || job.type === jobType;
      const matchesEmployer = employerType === 'All' || job.employerType === employerType;
      return matchesSearch && matchesCategory && matchesType && matchesEmployer;
    });
  }, [search, selectedCategory, jobType, employerType]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="bg-white border-b py-8 px-4 md:px-8 shadow-sm sticky top-20 z-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Naukri, Dukaan ya Skill search karein..." 
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-google-blue/10 focus:border-google-blue transition text-gray-800 font-bold"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div className="flex gap-2">
              <select 
                className="bg-gray-50 border-2 border-gray-100 px-6 py-4 rounded-[1.5rem] focus:outline-none font-black text-gray-500 text-xs uppercase tracking-widest cursor-pointer"
                value={employerType} onChange={(e) => setEmployerType(e.target.value)}
              >
                <option value="All">All Jobs</option>
                <option value="Company">Company Jobs</option>
                <option value="Shop">Shop Jobs</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-xl shadow-gray-200/50">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Role Categories</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${selectedCategory === 'All' ? 'bg-google-blue text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                All Categories
              </button>
              {JOB_CATEGORIES.map(cat => (
                <button 
                  key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${selectedCategory === cat ? 'bg-google-blue text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="lg:w-3/4 space-y-4">
          <div className="flex items-center justify-between mb-8 px-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Found <span className="text-gray-900">{filteredJobs.length}</span> Opportunities
            </p>
          </div>

          {filteredJobs.map(job => (
            <div key={job.id} className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:border-google-blue/20 transition-all duration-500 relative overflow-hidden">
              {job.employerType === 'Shop' && (
                <div className="absolute top-0 right-0 bg-[#ff6b2c] text-white px-8 py-1.5 text-[10px] font-black uppercase tracking-widest transform rotate-45 translate-x-8 translate-y-2 shadow-sm">Shop Job</div>
              )}
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-8 items-start">
                  <div className="w-20 h-20 bg-blue-50 rounded-[1.5rem] flex items-center justify-center font-black text-google-blue text-3xl group-hover:bg-google-blue group-hover:text-white transition-all duration-500">{job.companyName[0]}</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-google-blue transition-colors leading-tight mb-1">{job.title}</h3>
                    <p className="text-[#ff6b2c] font-black text-xs uppercase tracking-[0.1em]">{job.companyName}</p>
                    {job.employerType === 'Shop' && (
                      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Shop Type: {job.shopCategory}</p>
                    )}
                    <div className="flex flex-wrap gap-4 mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">📍 {job.location}</span>
                      <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">💰 {job.salary}</span>
                      <span className="flex items-center gap-1.5 bg-google-blue/5 text-google-blue px-3 py-1.5 rounded-full">🕒 {job.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 min-w-[180px]">
                  <button 
                    onClick={() => onNavigate('auth')}
                    className="w-full bg-google-blue text-white py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-google-blue/20 transition-all active:scale-95"
                  >
                    Apply Now
                  </button>
                  <p className="text-center text-[10px] font-black text-green-500 uppercase tracking-widest">Verified Employer</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AllJobsPage;
