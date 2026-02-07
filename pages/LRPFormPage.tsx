
import React, { useState } from 'react';

interface LRPFormPageProps {
  onBack: () => void;
}

const LRPFormPage: React.FC<LRPFormPageProps> = ({ onBack }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-500">
        <div className="w-32 h-32 bg-green-100 text-green-600 rounded-[3rem] flex items-center justify-center text-6xl mb-8 shadow-2xl shadow-green-500/10 animate-bounce">✓</div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Application Received!</h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest max-w-sm mx-auto mb-10 leading-relaxed">
          Humari "Partner Support Team" aapse verification ke liye 24-48 ghanto mein sampark karegi.
        </p>
        <button 
          onClick={onBack}
          className="bg-google-blue text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="mx-auto max-w-3xl">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-black text-xs uppercase tracking-widest mb-10 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Go Back
        </button>

        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-gray-100 shadow-2xl shadow-gray-200/40">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mb-2">LRP Registration Form</h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Apne area mein LocalRozgar Partner banne ke liye apply karein</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Partner Name" placeholder="Full Name" required />
              <Input label="Shop / Center Name" placeholder="e.g. Sharma CSC Center" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Mobile Number" placeholder="+91" required />
              <Input label="City / Town" placeholder="City" required />
            </div>

            <Input label="Full Address / Area" placeholder="Locality, PIN code..." required />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Partner Type</label>
                <select className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none transition font-bold appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-[length:20px_20px] bg-[right_1.5rem_center] bg-no-repeat">
                  <option>Retail Shop / Store</option>
                  <option>Coaching Center</option>
                  <option>CSC / Cyber Cafe</option>
                  <option>Social Worker / Agent</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Space for Banner?</label>
                <select className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none transition font-bold appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-[length:20px_20px] bg-[right_1.5rem_center] bg-no-repeat">
                  <option>Yes, Available</option>
                  <option>No Space</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Upload Shop Photo / ID Proof</label>
              <div className="w-full border-2 border-dashed border-gray-100 rounded-[2rem] p-10 bg-gray-50 flex flex-col items-center justify-center text-center group hover:border-google-blue transition cursor-pointer">
                 <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition">📄</div>
                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Drag & Drop or Click to Upload</p>
                 <p className="text-[8px] font-bold text-gray-300 uppercase mt-1">Supports JPG, PNG (Max 5MB)</p>
                 <input type="file" className="hidden" />
              </div>
            </div>

            <div className="pt-8">
               <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-google-blue text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
               >
                 {loading ? 'Processing...' : 'Submit LRP Application'}
               </button>
            </div>
            
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-tight leading-relaxed">
              *LocalRozgar LRP program ke antargat final approval admin ke verification ke baad hi diya jayega.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, required, ...props }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{label}</label>
    <input {...props} className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-google-blue/10 focus:border-google-blue transition text-gray-900 font-bold" />
  </div>
);

export default LRPFormPage;
