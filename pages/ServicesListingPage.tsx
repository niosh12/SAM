
import React, { useState } from 'react';
import { SERVICE_CATEGORIES, MOCK_PROVIDERS } from '../constants';
import { ViewState } from '../App';

interface ServicesListingPageProps {
  onNavigate: (view: ViewState) => void;
  onBook: (service: any) => void;
}

const ServicesListingPage: React.FC<ServicesListingPageProps> = ({ onNavigate, onBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProviders = selectedCategory 
    ? MOCK_PROVIDERS.filter(p => p.serviceType.toLowerCase().includes(selectedCategory.toLowerCase()))
    : MOCK_PROVIDERS;

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Local Service Experts</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Verified professionals for your daily home needs</p>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mb-16">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center ${!selectedCategory ? 'bg-google-blue border-google-blue text-white shadow-xl shadow-blue-500/20' : 'bg-white border-white hover:border-gray-100 shadow-sm'}`}
          >
            <span className="text-2xl mb-2">⚡</span>
            <span className="text-[10px] font-black uppercase tracking-widest">All</span>
          </button>
          {SERVICE_CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center ${selectedCategory === cat.name ? 'bg-google-blue border-google-blue text-white shadow-xl shadow-blue-500/20' : 'bg-white border-white hover:border-gray-100 shadow-sm'}`}
            >
              <span className="text-2xl mb-2">{cat.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Providers Listing */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProviders.map(provider => (
            <div key={provider.id} className="bg-white rounded-[2.5rem] p-8 border border-white shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:border-google-blue/10 transition-all flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center font-black text-google-blue text-xl border-4 border-white shadow-sm overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${provider.id}`} alt={provider.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{provider.name}</h3>
                    <p className="text-[10px] font-black text-google-blue uppercase tracking-widest">{provider.serviceType}</p>
                  </div>
                </div>
                {provider.verified && (
                  <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" title="Verified Provider">✓</div>
                )}
              </div>
              
              <div className="flex items-center gap-6 mb-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><span className="text-yellow-400 text-lg">★</span> {provider.rating} Rating</span>
                <span className="flex items-center gap-1.5"><span className="text-lg">💼</span> {provider.experience}</span>
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <button 
                  onClick={() => onBook(provider)}
                  className="w-full bg-google-blue text-white py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:shadow-none transition-all active:scale-95"
                >
                  Book Visit
                </button>
                <button className="w-full bg-gray-50 text-gray-400 py-3 rounded-[1rem] font-black text-[10px] uppercase tracking-widest">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesListingPage;
