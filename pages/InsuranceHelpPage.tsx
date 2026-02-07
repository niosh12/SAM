
import React, { useState } from 'react';
import { ViewState } from '../App';

interface InsuranceHelpPageProps {
  onNavigate: (view: ViewState) => void;
}

type Step = 'TYPE' | 'FORM' | 'RESULT';

const InsuranceHelpPage: React.FC<InsuranceHelpPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<Step>('TYPE');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const insuranceTypes = [
    { id: 'bike', label: 'Bike Insurance', icon: '🏍️' },
    { id: 'car', label: 'Car Insurance', icon: '🚗' },
    { id: 'health', label: 'Health Insurance', icon: '🏥' },
    { id: 'life', label: 'Life Insurance', icon: '🛡️' },
    { id: 'student', label: 'Student Insurance', icon: '🎓' },
    { id: 'shop', label: 'Shop Insurance', icon: '🏪' },
  ];

  const handleTypeSelect = (type: any) => {
    setSelectedType(type.label);
    setStep('FORM');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('RESULT');
    }, 1500);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10 px-4 md:px-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Insurance & Policy Help Center</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Get free guidance for your protection needs</p>
        </header>

        {step === 'TYPE' && (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
            <h2 className="text-xl font-black text-gray-800 text-center">Aapko kis tarah ki help chahiye?</h2>
            <div className="grid grid-cols-2 gap-4">
              {insuranceTypes.map(type => (
                <button 
                  key={type.id}
                  onClick={() => handleTypeSelect(type)}
                  className="bg-white p-8 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/30 flex flex-col items-center hover:border-google-blue hover:scale-105 transition-all"
                >
                  <span className="text-4xl mb-4">{type.icon}</span>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-700">{type.label}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed mt-10">
              *Hum partner companies ke saath judkar aapko best plans suggest karte hain.
            </p>
          </div>
        )}

        {step === 'FORM' && (
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setStep('TYPE')} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              </button>
              <h2 className="text-2xl font-black text-gray-900">{selectedType} Help Form</h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="Full Name" placeholder="Your Name" required />
                <FormInput label="Mobile Number" placeholder="+91" required />
              </div>
              <FormInput label="City" placeholder="City Name" required />

              {(selectedType?.includes('Bike') || selectedType?.includes('Car')) && (
                <>
                  <FormInput label="Vehicle Number (If any)" placeholder="DL XX XX XXXX" />
                  <FormSelect label="Policy Status" options={["New Policy", "Renewal", "Already Expired"]} />
                </>
              )}

              {selectedType?.includes('Health') && (
                <FormSelect label="For Whom?" options={["Self", "Family", "Parents"]} />
              )}

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-google-blue text-white py-5 rounded-[1.25rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {loading ? 'Processing...' : 'Submit & Get Suggestion'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'RESULT' && (
          <div className="bg-white rounded-[3rem] p-12 text-center shadow-2xl animate-in zoom-in duration-500">
            <div className="text-6xl mb-8">💡</div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Recommended for You</h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-10">Based on your requirement for {selectedType}</p>
            
            <div className="bg-blue-50 p-8 rounded-[2rem] border-2 border-dashed border-google-blue/20 mb-10 text-left">
               <h4 className="text-xs font-black text-google-blue uppercase tracking-widest mb-4">Suggested Plans</h4>
               <ul className="space-y-4">
                 {["Comprehensive Protection Plan", "Cashless Hospitalization Support", "Instant Zero Dep Coverage"].slice(0, 2).map(txt => (
                   <li key={txt} className="flex items-start gap-3">
                     <span className="text-google-blue font-bold">✓</span>
                     <span className="text-sm font-bold text-gray-700">{txt}</span>
                   </li>
                 ))}
               </ul>
            </div>

            <button className="w-full bg-google-blue text-white py-5 rounded-[1.25rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 mb-6">Talk to Insurance Partner</button>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight leading-relaxed">
              Disclaimer: We connect you with verified insurance partners. Final policy and pricing is handled by partner company. LocalRozgar is NOT an insurer/agent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const FormInput = ({ label, required, ...props }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</label>
    <input {...props} className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-google-blue/10 focus:border-google-blue transition text-gray-900 font-bold" />
  </div>
);

const FormSelect = ({ label, options, ...props }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</label>
    <select {...props} className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none transition text-gray-900 font-bold appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-[length:20px_20px] bg-[right_1.5rem_center] bg-no-repeat">
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

export default InsuranceHelpPage;
