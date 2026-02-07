
import React, { useState } from 'react';
import { ViewState } from '../App';

interface ContactPageProps {
  onNavigate: (view: ViewState) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="bg-[#f2f4f7] min-h-screen py-12 md:py-24 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background Large Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h1 className="text-[25vw] font-black text-gray-200/40 tracking-tighter uppercase leading-none">
          CONTACT
        </h1>
      </div>

      <div className="mx-auto max-w-7xl w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-[3rem] shadow-2xl shadow-gray-300/50 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 border border-white">
          
          {/* Left Column: Contact Details */}
          <div className="lg:w-1/3 w-full animate-in fade-in slide-in-from-left duration-700">
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Contact Us</p>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[1.1] mb-12 uppercase italic">
              LET'S DO <br /> WORKING <br /> TOGETHER!
            </h2>
            
            <div className="space-y-8">
              <ContactDetailItem 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>}
                label="OFFICE ADDRESS:"
                text="Lohiya street no-5, Shahdara delhi-110032"
              />
              <ContactDetailItem 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>}
                label="PHONE NUMBER:"
                text="+91 8447827569"
              />
              <ContactDetailItem 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" /></svg>}
                label="MAIL ADDRESS:"
                text="Support@deuscreation.com"
              />
            </div>
          </div>

          {/* Center: Person Image */}
          <div className="lg:w-1/3 w-full flex justify-center items-end h-full">
            <img 
              src="https://static.vecteezy.com/system/resources/thumbnails/026/748/729/small/attractive-school-teacher-isolated-png.png" 
              alt="Support Specialist" 
              className="max-h-[500px] w-auto object-contain drop-shadow-2xl animate-in fade-in zoom-in duration-1000"
            />
          </div>

          {/* Right Column: Contact Form Card */}
          <div className="lg:w-1/3 w-full animate-in fade-in slide-in-from-right duration-700">
            <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
              {success ? (
                <div className="text-center py-20 animate-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight uppercase italic">MESSAGE SENT!</h3>
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed">Team aapse jald <br /> sampark karegi.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">CONTACT US</h3>
                    <p className="text-gray-500 font-medium text-[11px] leading-relaxed max-w-[240px] mx-auto opacity-70 mt-2">
                      We work with ambitious leaders who want to define the future, not hide from it.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="relative group border-b border-gray-100 pb-2">
                      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-0.5">Name *</label>
                      <input required placeholder="Write Name..." className="w-full bg-transparent py-1 pr-10 focus:outline-none text-xs font-semibold text-gray-800" />
                      <span className="absolute right-1 bottom-3 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                      </span>
                    </div>

                    <div className="relative group border-b border-gray-100 pb-2">
                      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-0.5">Mobile Number *</label>
                      <input required placeholder="+91" className="w-full bg-transparent py-1 pr-10 focus:outline-none text-xs font-semibold text-gray-800" />
                      <span className="absolute right-1 bottom-3 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                      </span>
                    </div>

                    <div className="relative group border-b border-gray-100 pb-2">
                      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-0.5">Email Address *</label>
                      <input type="email" required placeholder="Email" className="w-full bg-transparent py-1 pr-10 focus:outline-none text-xs font-semibold text-gray-800" />
                      <span className="absolute right-1 bottom-3 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#111] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-black active:scale-95 transition-all mt-6 flex items-center justify-center gap-2">
                    LET'S GET TO WORK <span className="text-yellow-400 text-sm">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactDetailItem = ({ icon, label, text }: { icon: React.ReactNode, label: string, text: string }) => (
  <div className="flex gap-4 items-start group">
    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-yellow-400 shadow-xl group-hover:scale-110 transition duration-300 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-tighter leading-tight mb-1 italic">{label}</h4>
      <p className="text-[11px] text-gray-500 font-bold max-w-[200px] leading-tight opacity-90">{text}</p>
    </div>
  </div>
);

export default ContactPage;
