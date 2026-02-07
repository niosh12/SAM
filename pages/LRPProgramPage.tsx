
import React from 'react';
import { ViewState } from '../App';

interface LRPProgramPageProps {
  onNavigate: (view: ViewState) => void;
}

const LRPProgramPage: React.FC<LRPProgramPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#f0f4ff] py-24 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-google-blue text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          <span>PARTNER PROGRAM</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-none uppercase italic">Become a Local <br /> Recruitment Partner (LRP)</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-bold mb-10 leading-relaxed">
          Students aur local field partners ke liye earning opportunity — apne area me hiring connect karke commission kamaiye.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => onNavigate('lrp-form')}
            className="bg-google-blue text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
          >
            Start as Student Partner
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-google-blue border-2 border-google-blue px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest"
          >
            See Earnings Model
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl py-24 px-6">
        <div className="grid md:grid-cols-2 gap-20 mb-32 items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight italic">Apne Shehar me Kaam Karein</h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-6 text-lg">
              Apne local area me visit kijiye aur dukaan, shop, office, workshop, coaching, ya business owners se baat kijiye jinko worker ki zarurat hai. Unki requirement hamare portal par register karwaiye.
            </p>
            <p className="text-gray-600 font-medium leading-relaxed text-lg">
              Hamari team unki job requirement publish karegi aur hiring complete hone par aapko partner commission milega. Yeh model specially students aur local network wale logon ke liye design kiya gaya hai.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎓', title: 'Best for Students', desc: 'No fixed timings.' },
              { icon: '🏪', title: 'Local Hiring', desc: 'Connect shops & staff.' },
              { icon: '📍', title: 'Area Based', desc: 'Work in your locality.' },
              { icon: '💰', title: 'Commission', desc: 'Per successful hire.' }
            ].map(item => (
              <div key={item.title} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center shadow-sm">
                <span className="text-4xl mb-4">{item.icon}</span>
                <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                <p className="text-gray-500 text-[10px] font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works - Timeline */}
        <div id="how-it-works" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">How it Works (5 Easy Steps)</h2>
            <div className="w-20 h-1.5 bg-google-blue mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: '1', title: 'Local Visit', desc: 'Apne area me shops aur offices visit karein.' },
              { step: '2', title: 'Collect Data', desc: 'Jinko staff chahiye unki details lein.' },
              { step: '3', title: 'Submit Lead', desc: 'Requirement LocalRozgar portal par submit karein.' },
              { step: '4', title: 'Promote', desc: 'Hum job promote karke candidates connect karenge.' },
              { step: '5', title: 'Earn', desc: 'Successful hiring par aapko commission milega.' }
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white border-4 border-google-blue text-google-blue rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-xl group-hover:bg-google-blue group-hover:text-white transition-all z-10">
                  {item.step}
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gray-100 -z-0"></div>
                )}
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-2 leading-tight">{item.title}</h4>
                <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Disclaimer */}
        <div className="grid md:grid-cols-2 gap-12 bg-gray-50 p-12 rounded-[3rem] border border-gray-100">
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-widest italic">Partner Requirements</h2>
            <ul className="space-y-4 text-gray-600 font-bold text-sm">
              <li className="flex gap-3"><span className="text-google-blue">✔</span> No Office Required - Work from Home/Field</li>
              <li className="flex gap-3"><span className="text-google-blue">✔</span> Smartphone with Internet Access</li>
              <li className="flex gap-3"><span className="text-google-blue">✔</span> Good Communication Skills (Local Language)</li>
              <li className="flex gap-3"><span className="text-google-blue">✔</span> Area Knowledge (Shops & Businesses)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-widest italic">Important Note</h2>
            <p className="text-gray-500 font-medium leading-relaxed text-sm">
              Partner sirf hiring lead provide karega. Final selection aur joining employer aur candidate ke beech hogi. 
              Commission sirf approved and successful hiring (joining confirm hone ke baad) par hi diya jayega.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => onNavigate('lrp-form')}
                className="bg-[#111] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all"
              >
                Start Earning Now →
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LRPProgramPage;
