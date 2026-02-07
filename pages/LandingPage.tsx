
import React, { useState, useEffect } from 'react';
import { SERVICE_CATEGORIES, MOCK_JOBS, MOCK_HIRING_COMPANIES, FINANCIAL_SERVICES } from '../constants';
// Added import for ContactPage to resolve "Cannot find name 'ContactPage'" error
import ContactPage from './ContactPage';

interface LandingPageProps {
  onNavigate: (view: any) => void;
}

const ServiceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'ac': return <span className="text-4xl">❄️</span>;
    case 'electrician': return <span className="text-4xl">🔌</span>;
    case 'plumber': return <span className="text-4xl">🚰</span>;
    case 'tailor': return <span className="text-4xl">👕</span>;
    case 'press': return <span className="text-4xl">🧺</span>;
    case 'cleaning': return <span className="text-4xl">🧹</span>;
    case 'mechanic': return <span className="text-4xl text-gray-400">🔧</span>;
    case 'tutor': return <span className="text-4xl">👨‍🏫</span>;
    case 'mobile': return <span className="text-4xl">📱</span>;
    default: return <span>❓</span>;
  }
};

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const dynamicPhrases = [
    { prefix: "Ab Naukri Paana hai", highlight: "Bahut Aasaan" },
    { prefix: "Apne hi Shehar mein", highlight: "Kaam Payein" },
    { prefix: "Direct Company se", highlight: "Baat Karein" },
    { prefix: "Ghar baithe Services", highlight: "Book Karein" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % dynamicPhrases.length);
        setIsTransitioning(false);
      }, 600);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const marqueeItems = [...MOCK_HIRING_COMPANIES, ...MOCK_HIRING_COMPANIES, ...MOCK_HIRING_COMPANIES];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 3000);
  };

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white px-4 pt-12 pb-12 md:px-8 md:pt-20 lg:pb-16">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6 leading-tight">
              It’s Easy to Get <br />
              <span className="text-[#ff6b2c]">Your Dream Job</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto md:mx-0 font-medium">
              LocalRozgar – Apne Shehar ki Naukri aur Services ek hi jagah. Seedha hiring, koi fees nahi.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 border rounded-2xl shadow-xl max-w-2xl mx-auto md:mx-0">
              <div className="flex-1 flex items-center px-4 w-full border-b sm:border-b-0 sm:border-r border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Job / Skill" className="w-full py-3 px-3 focus:outline-none text-base font-medium" />
              </div>
              <div className="flex-1 flex items-center px-4 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <input type="text" placeholder="Location" className="w-full py-3 px-3 focus:outline-none text-base font-medium" />
              </div>
              <button 
                onClick={() => onNavigate('all-jobs')}
                className="bg-[#ff6b2c] hover:bg-[#e85a1b] text-white px-10 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 w-full sm:w-auto"
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg md:max-w-none flex justify-center">
            <div 
              className="relative w-full max-w-[450px] cursor-pointer group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img 
                src={isHovered ? "https://i.ibb.co/jkkRYBtv/PAST-A-1.png" : "https://i.ibb.co/99q2xpr2/PAST-A.png"} 
                alt="LocalRozgar Success" 
                className="w-full h-auto object-contain transition-opacity duration-300 ease-in-out" 
                style={{ minHeight: '400px' }} 
              />
              <div className={`absolute bottom-10 left-0 bg-white p-4 rounded-2xl shadow-xl border border-orange-100 transition-all duration-500 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600 font-bold">✓</div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Success</p>
                    <p className="text-sm font-bold text-gray-900">Naukri Lag Gayi!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Blue Strip Overlay */}
      <div className="bg-google-blue w-full py-8 shadow-lg relative z-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="relative h-10 md:h-12 overflow-hidden flex justify-center items-center">
            <div 
              className={`flex flex-wrap justify-center items-center gap-3 text-xl md:text-3xl font-black transition-all duration-500 ease-in-out transform ${
                isTransitioning ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
              }`}
            >
               <span className="text-white">{dynamicPhrases[textIndex].prefix}</span>
               <span className="text-yellow-400 underline decoration-4 underline-offset-8">
                 {dynamicPhrases[textIndex].highlight}
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Partner Hero Addition */}
      <section className="py-24 bg-[#f8f9ff] px-4 md:px-8 border-b">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-[3.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center gap-2 bg-google-blue text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                <span>NEW PROGRAM</span>
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                <span>FOR STUDENTS</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Become a Student <br />
                <span className="text-google-blue">Recruitment Partner</span>
              </h2>
              <p className="text-xl text-gray-600 font-bold mb-10 leading-relaxed">
                Field visit based earning opportunity for students. Apne area mein hiring connect karke commission kamaiye.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: '📍', text: 'Work in your own area' },
                  { icon: '🎓', text: 'Best for students' },
                  { icon: '🏪', text: 'Help local shops hire' },
                  { icon: '💰', text: 'Commission per hire' }
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-black text-gray-700 uppercase tracking-tight">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('slrp-form')}
                  className="bg-google-blue text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Apply as Student Partner
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-100 rounded-[3rem] rotate-6 group-hover:rotate-3 transition-transform"></div>
                <img 
                  src="https://images.unsplash.com/photo-1523240715634-d1c651177e49?q=80&w=1000&auto=format&fit=crop" 
                  alt="Student Partner" 
                  className="relative z-10 w-full max-sm rounded-[3rem] shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Companies Hiring Strip */}
      <section className="bg-white py-12 border-b overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 mb-8">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center mb-2">Direct Hiring Companies</h2>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="marquee-container py-4 flex items-center">
            {marqueeItems.map((company, idx) => (
              <div key={`${company.id}-${idx}`} className="mx-8 flex items-center justify-center w-[120px] h-[60px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Job Categories Grid */}
      <section className="py-20 bg-gray-50 px-4 md:px-8 border-b">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Browse Job Categories</h2>
            <p className="text-gray-500 mt-4 text-lg font-medium">Quick links to help you find work in seconds</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Delivery', 'Sales', 'BPO', 'Teacher', 'Guard', 'Driver', 'Cooking', 'Helper', 'Billing'].map(cat => (
              <div 
                key={cat} 
                onClick={() => onNavigate('all-jobs')}
                className="bg-white p-8 rounded-3xl border border-white shadow-sm flex flex-col items-center justify-center hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-google-blue mb-4 group-hover:bg-google-blue group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-gray-800">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Local Services Section */}
      <section className="py-20 px-4 md:px-8 bg-white border-b">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Best Local Services Near You</h2>
            <p className="text-gray-500 mt-4 text-lg font-medium">Top-rated experts for your daily home needs</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-5">
            {SERVICE_CATEGORIES.map(cat => (
              <div 
                key={cat.id} 
                onClick={() => onNavigate('services-listing')}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="mb-4 group-hover:scale-110 transition"><ServiceIcon type={cat.type} /></div>
                <span className="text-xs font-bold text-gray-800 text-center leading-tight uppercase tracking-wider">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Insurance Help Strip */}
      <section className="py-16 bg-google-blue/5 border-b px-4">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white border border-blue-100 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-500/5">
            <div className="flex gap-6 items-center">
              <div className="text-5xl">🛡️</div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">Insurance & Policy Help Center</h3>
                <p className="text-gray-500 font-medium">Get free guidance for bike, car, and health protection.</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('insurance-help')}
              className="bg-google-blue text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all w-full md:w-auto"
            >
              Get Free Help
            </button>
          </div>
        </div>
      </section>

      {/* 6. LRP Partner Section */}
      <section className="py-24 bg-white px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-[#f0f4ff] rounded-[3.5rem] p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden shadow-2xl shadow-blue-500/10">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-google-blue/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center gap-2 bg-google-blue text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                <span>NEW MODEL</span>
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                <span>PARTNER PROGRAM</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
                Become a Local <br />
                <span className="text-google-blue">Recruitment Partner</span>
              </h2>
              <p className="text-lg text-gray-600 font-bold mb-10">
                Students aur local field partners ke liye earning opportunity — apne area me hiring connect karke commission kamaiye.
              </p>
              
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                {[
                  { icon: '🎓', title: 'Best for Students', desc: 'Study ke saath extra income kamayein.' },
                  { icon: '🏪', title: 'Shop Hiring', desc: 'Local shops ki vacancy register karayein.' },
                  { icon: '📍', title: 'Area Based', desc: 'Work in your locality.' },
                  { icon: '💰', title: 'Commission Model', desc: 'Har successful hiring par attractive commission.' },
                  { icon: '📱', title: 'Simple Workflow', desc: 'Sirf details portal par submit karni hain.' },
                  { icon: '🤝', title: 'No Office', desc: 'Ghar se ya field se direct kaam karein.' }
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base leading-none mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-[11px] font-medium leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('lrp-form')}
                  className="bg-google-blue text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Apply as Local Partner
                </button>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center lg:justify-end relative">
              <div className="relative">
                <div className="w-72 h-72 md:w-[480px] md:h-[480px] bg-white rounded-[4rem] shadow-2xl rotate-3 overflow-hidden border-[12px] border-white relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1523240715634-d1c651177e49?q=80&w=1000&auto=format&fit=crop" 
                    alt="Collaboration" 
                    className="w-full h-full object-cover -rotate-3 scale-110" 
                  />
                </div>
                {/* Floating Partner Badge */}
                <div className="absolute -bottom-6 -left-6 bg-google-blue p-6 rounded-[2rem] shadow-2xl z-20 flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">Partner Portal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured Jobs Grid */}
      <section className="py-24 bg-gray-50 px-4 md:px-8 border-b">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Latest Job Openings</h2>
              <p className="text-gray-500 mt-4 text-lg font-medium">Recently posted shop and company jobs near you</p>
            </div>
            <button onClick={() => onNavigate('all-jobs')} className="text-google-blue font-black uppercase text-sm tracking-widest hover:underline">View All Jobs &rarr;</button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_JOBS.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/40 hover:shadow-2xl transition-all group flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center font-black text-google-blue text-2xl group-hover:bg-google-blue group-hover:text-white transition-all">{job.companyName[0]}</div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${job.employerType === 'Shop' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}>
                    {job.employerType} Job
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-1 leading-tight">{job.title}</h3>
                <p className="text-google-blue font-bold text-sm mb-6">{job.companyName}</p>
                <div className="flex flex-wrap gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tight mt-auto">
                  <span className="bg-gray-50 px-3 py-1.5 rounded-lg">📍 {job.location}</span>
                  <span className="bg-gray-50 px-3 py-1.5 rounded-lg">💰 {job.salary}</span>
                </div>
                <button 
                  onClick={() => onNavigate('auth')}
                  className="mt-8 w-full py-4 bg-google-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/10 hover:shadow-none active:scale-95 transition-all"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Trust Badges / Testimonials */}
      <section className="py-20 bg-white px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Registered Users', val: '4.5k+' },
            { label: 'Active Jobs', val: '1.2k+' },
            { label: 'Verified Partners', val: '800+' },
            { label: 'Success Story', val: '98%' }
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{stat.val}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactPage onNavigate={onNavigate} />
    </div>
  );
};

const ContactDetailItem = ({ icon, label, text }: { icon: React.ReactNode, label: string, text: string }) => (
  <div className="flex gap-4 items-start group">
    <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-yellow-400 shadow-xl group-hover:scale-105 transition duration-300 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-xs font-black text-gray-900 uppercase tracking-tighter leading-tight mb-1 italic">{label}</h4>
      <p className="text-[10px] text-gray-500 font-bold max-w-[180px] leading-tight opacity-90">{text}</p>
    </div>
  </div>
);

export default LandingPage;
