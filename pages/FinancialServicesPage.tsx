
import React, { useState } from 'react';
import { FINANCIAL_SERVICES } from '../constants';

const FinancialServicesPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedProduct(null);
    }, 3000);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-20 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">Insurance & Loans <br /><span className="text-google-blue">Support for Bharat</span></h1>
          <p className="text-xl text-gray-500 font-medium">LocalRozgar partners with top financial companies to bring you verified insurance and loan options. Simple, fast and trusted.</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FINANCIAL_SERVICES.map(service => (
            <div key={service.id} className="bg-white border-2 border-white rounded-[2.5rem] p-10 hover:border-google-blue hover:shadow-2xl transition group flex flex-col items-center text-center shadow-xl shadow-gray-200/30">
              <div className="text-6xl mb-8 group-hover:scale-110 transition">{service.icon}</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-500 font-bold mb-10 leading-relaxed uppercase tracking-widest text-[10px]">{service.text}</p>
              <button 
                onClick={() => setSelectedProduct(service)}
                className="mt-auto w-full py-5 bg-gray-50 text-google-blue font-black rounded-[1.25rem] hover:bg-google-blue hover:text-white transition shadow-sm uppercase tracking-widest text-xs"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-12 shadow-2xl relative animate-in zoom-in duration-300">
              {success ? (
                <div className="text-center py-12">
                   <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
                   <h3 className="text-2xl font-black text-gray-900">Application Submitted!</h3>
                   <p className="text-gray-500 font-bold mt-4 tracking-tight">Humare financial partner aapse jald hi sampark karenge.</p>
                </div>
              ) : (
                <>
                  <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Apply for {selectedProduct.title}</h2>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-10">Trusted Financial Support Portal</p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput label="Full Name" placeholder="Rahul Sharma" required />
                      <FormInput label="Mobile Number" placeholder="+91" required />
                    </div>
                    <FormInput label="City" placeholder="Enter City" required />
                    <FormSelect label="Monthly Income Range" options={["Below ₹15,000", "₹15k - ₹30k", "₹30k - ₹50k", "Above ₹50k"]} />
                    <div className="pt-6">
                      <button type="submit" className="w-full bg-google-blue text-white py-5 rounded-[1.25rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">Submit Lead Form</button>
                    </div>
                  </form>
                </>
              )}
            </div>
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
    <select {...props} className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none transition text-gray-900 font-bold">
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

export default FinancialServicesPage;
