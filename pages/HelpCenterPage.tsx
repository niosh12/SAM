
import React from 'react';
import { ViewState } from '../App';

interface HelpCenterPageProps {
  onNavigate: (view: ViewState) => void;
}

const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ onNavigate }) => {
  const faqs = [
    { q: "Is job application free?", a: "Yes, LocalRozgar is 100% free for job seekers. Never pay any 'file charges' to anyone." },
    { q: "How to book a service?", a: "Go to the Services section, select an expert, and click 'Book Visit'. A lead will be sent to the expert." },
    { q: "How can I post a job?", a: "Register as an Employer (Company/Shop), login, and use the 'Post Job' button. Admin will approve it." },
    { q: "What is a Verified Badge?", a: "It means Admin has checked the employer's or provider's physical documents." },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Help Center</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">We are here to support your journey</p>
        </header>

        <div className="space-y-6 mb-20">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest border-b-4 border-google-blue inline-block pb-1">Frequently Asked Questions</h2>
          <div className="grid gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <h3 className="font-black text-gray-900 mb-3 italic">Q: {faq.q}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-google-blue p-12 rounded-[3rem] text-white text-center shadow-2xl shadow-blue-500/20">
          <h2 className="text-3xl font-black mb-4">Still need help?</h2>
          <p className="text-white/80 font-bold mb-10 text-sm uppercase tracking-widest">Our support team is available Mon-Sat</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="tel:+918447827569" className="bg-white text-google-blue px-10 py-4 rounded-2xl font-black uppercase text-xs shadow-xl">Call Us</a>
            <a href="https://wa.me/918447827569" className="bg-green-500 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs shadow-xl">WhatsApp Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
