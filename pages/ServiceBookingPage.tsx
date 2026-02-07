
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { SERVICE_CATEGORIES } from '../constants';

// Add global declaration for Google Maps API to fix TypeScript errors
declare const google: any;

interface ServiceBookingPageProps {
  user: User;
  service?: any;
  onComplete: () => void;
}

const ServiceBookingPage: React.FC<ServiceBookingPageProps> = ({ user, service, onComplete }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: service?.serviceType || 'AC Repair',
    address: user.location || '',
    city: 'Delhi',
    pincode: '110032',
    date: '',
    time: '10:00 AM - 12:00 PM',
    problemDesc: '',
    urgent: false
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Initialize Map Picker when Step 2 is active
  useEffect(() => {
    /* Fix: Using global google object for Maps API */
    if (step === 2 && mapRef.current) {
      const initialPos = { lat: 28.6139, lng: 77.2090 }; // Delhi center
      const map = new google.maps.Map(mapRef.current, {
        center: initialPos,
        zoom: 13,
        disableDefaultUI: true,
        zoomControl: true,
      });

      const marker = new google.maps.Marker({
        position: initialPos,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'https://cdn-icons-png.flaticon.com/512/1216/1216733.png',
          scaledSize: new google.maps.Size(35, 35)
        }
      });

      google.maps.event.addListener(marker, 'dragend', () => {
        const pos = marker.getPosition();
        // In a real app, use geocoder to update address
        console.log("New Position:", pos?.lat(), pos?.lng());
      });
    }
  }, [step]);

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12 flex items-center justify-between">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className="flex flex-col items-center gap-2 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= s ? 'bg-google-blue text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-400'}`}>
                {s}
              </div>
              <p className={`text-[8px] font-black uppercase tracking-widest ${step >= s ? 'text-google-blue' : 'text-gray-400'}`}>Step {s}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">Select Service</h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10">Choose the help you need today</p>
              <div className="grid grid-cols-2 gap-4">
                {SERVICE_CATEGORIES.map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => { setFormData({...formData, serviceType: c.name}); nextStep(); }}
                    className={`p-6 rounded-[1.5rem] border-2 flex flex-col items-center text-center transition-all ${formData.serviceType === c.name ? 'border-google-blue bg-blue-50 text-google-blue' : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'}`}
                  >
                    <span className="text-3xl mb-2">{c.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">Your Address</h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10">Where should we send the expert?</p>
              <div className="space-y-6">
                <FormInput label="Full Address" value={formData.address} onChange={(e: any) => setFormData({...formData, address: e.target.value})} placeholder="House No, Street, Landmark" />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="City" value={formData.city} onChange={(e: any) => setFormData({...formData, city: e.target.value})} />
                  <FormInput label="Pincode" value={formData.pincode} onChange={(e: any) => setFormData({...formData, pincode: e.target.value})} />
                </div>
                
                {/* Real Google Map Picker */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Pin exact location on map</label>
                  <div ref={mapRef} className="w-full h-56 bg-gray-100 rounded-[2rem] border border-gray-200 shadow-inner overflow-hidden relative">
                    {/* Map will load here */}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Back</button>
                  <button onClick={nextStep} className="flex-[2] py-4 bg-google-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Continue</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">Service Details</h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10">Explain the problem to the expert</p>
              <div className="space-y-6">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Describe the Problem</label>
                <textarea 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-google-blue focus:bg-white p-6 rounded-[1.5rem] min-h-[140px] focus:outline-none transition-all text-sm font-bold text-gray-800"
                  placeholder="e.g. AC cooling nahi kar raha, water leakage issue..."
                  value={formData.problemDesc}
                  onChange={(e) => setFormData({...formData, problemDesc: e.target.value})}
                ></textarea>
                <div className="flex items-center gap-4 bg-orange-50 p-6 rounded-[1.5rem] border border-orange-100">
                  <input type="checkbox" className="w-6 h-6 accent-orange-500 rounded-lg cursor-pointer" checked={formData.urgent} onChange={(e) => setFormData({...formData, urgent: e.target.checked})} />
                  <div>
                    <p className="text-xs font-black text-orange-600 uppercase italic">URGENT VISIT REQUIRED?</p>
                    <p className="text-[10px] font-bold text-orange-400 uppercase tracking-tight">Visit within 2 hours (Extra charges may apply)</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Back</button>
                  <button onClick={nextStep} className="flex-[2] py-4 bg-google-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Continue</button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">Schedule Visit</h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10">Pick a time that works for you</p>
              <div className="space-y-6">
                <FormInput type="date" label="Pick Date" value={formData.date} onChange={(e: any) => setFormData({...formData, date: e.target.value})} />
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Select Time Slot</label>
                <div className="grid grid-cols-2 gap-3">
                  {['10 AM - 12 PM', '12 PM - 2 PM', '2 PM - 4 PM', '4 PM - 6 PM'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setFormData({...formData, time: t})}
                      className={`py-4 rounded-xl text-[10px] font-black uppercase transition-all ${formData.time === t ? 'bg-google-blue text-white shadow-lg shadow-blue-500/20 scale-105' : 'bg-gray-50 text-gray-400 border border-transparent'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Back</button>
                  <button onClick={nextStep} className="flex-[2] py-4 bg-google-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Continue</button>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">Confirm Booking</h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10">Review and finish your request</p>
              
              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-6 mb-10 shadow-inner">
                <SummaryRow label="Service" value={formData.serviceType} />
                <SummaryRow label="Location" value={formData.address} />
                <SummaryRow label="Timing" value={`${formData.date} | ${formData.time}`} />
                <div className="border-t border-dashed border-gray-200 pt-6">
                  <SummaryRow label="Est. Visit Fee" value="₹199" highlight />
                  <p className="text-[8px] font-bold text-gray-400 uppercase mt-2 text-right">*Total bill after inspection</p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Back</button>
                <button 
                  onClick={handleComplete} 
                  disabled={loading}
                  className="flex-[2] py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
                >
                  {loading ? 'BOOKING...' : 'CONFIRM & TRACK'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, ...props }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{label}</label>
    <input {...props} className="w-full bg-gray-50 border-2 border-transparent focus:border-google-blue focus:bg-white px-6 py-4 rounded-[1.25rem] focus:outline-none transition-all text-sm font-bold text-gray-800" />
  </div>
);

const SummaryRow = ({ label, value, highlight }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    <span className={`text-sm font-black italic uppercase ${highlight ? 'text-google-blue' : 'text-gray-900'}`}>{value}</span>
  </div>
);

export default ServiceBookingPage;
