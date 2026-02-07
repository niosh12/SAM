
import React, { useState } from 'react';
import { UserRole, User } from '../types';

interface SLRPFormPageProps {
  onBack: () => void;
  onLogin: (user: User) => void;
}

const SLRPFormPage: React.FC<SLRPFormPageProps> = ({ onBack, onLogin }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [formData, setFormData] = useState<any>({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    area: '',
    collegeName: '',
    course: '',
    age: '',
    upiId: '',
    availableHours: '2-3 Hours'
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLogin({
          id: 'slrp-' + Math.random().toString(36).substr(2, 9),
          name: formData.fullName,
          email: formData.email,
          role: UserRole.STUDENT_PARTNER,
          mobile: formData.mobile,
          collegeName: formData.collegeName,
          course: formData.course,
          upiId: formData.upiId,
          createdAt: Date.now()
        });
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-500">
        <div className="w-32 h-32 bg-green-100 text-green-600 rounded-[3rem] flex items-center justify-center text-6xl mb-8 shadow-2xl shadow-green-500/10 animate-bounce">✓</div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Application Received!</h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest max-w-sm mx-auto mb-10 leading-relaxed">
          Verification in progress. Redirecting you to your Partner Console...
        </p>
      </div>
    );
  }

  if (otpStep) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Mobile</h2>
          <p className="text-gray-500 mb-8 font-medium">Enter code sent to {formData.mobile}</p>
          <form onSubmit={handleVerify} className="space-y-6">
            <input 
              required type="text" maxLength={4} placeholder="1234" 
              className="w-full text-center text-3xl font-black bg-gray-50 border border-gray-200 py-4 rounded-2xl tracking-[1rem] focus:ring-2 focus:ring-google-blue focus:outline-none"
            />
            <button type="submit" className="w-full bg-google-blue text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition transform active:scale-95">
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
            <p className="text-xs text-gray-400 font-bold">Resend code in 0:45</p>
          </form>
        </div>
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
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mb-2 uppercase italic">Join as SLRP Partner</h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Student Local Recruitment Partner Program</p>
          </header>

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Full Name" name="fullName" value={formData.fullName} onChange={(e: any) => setFormData({...formData, fullName: e.target.value})} placeholder="As per ID" required />
              <Input label="Mobile Number" name="mobile" value={formData.mobile} onChange={(e: any) => setFormData({...formData, mobile: e.target.value})} placeholder="+91" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Email Address" name="email" value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} placeholder="rahul@example.com" type="email" required />
              <div className="grid grid-cols-2 gap-3">
                <Input label="City" name="city" value={formData.city} onChange={(e: any) => setFormData({...formData, city: e.target.value})} placeholder="City" required />
                <Input label="Area" name="area" value={formData.area} onChange={(e: any) => setFormData({...formData, area: e.target.value})} placeholder="Locality" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="College / University" name="collegeName" value={formData.collegeName} onChange={(e: any) => setFormData({...formData, collegeName: e.target.value})} placeholder="College Name" required />
              <Input label="Course / Class" name="course" value={formData.course} onChange={(e: any) => setFormData({...formData, course: e.target.value})} placeholder="e.g. B.Com 2nd Year" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Age" name="age" type="number" value={formData.age} onChange={(e: any) => setFormData({...formData, age: e.target.value})} placeholder="18+" required />
              <Input label="UPI ID (For Payout)" name="upiId" value={formData.upiId} onChange={(e: any) => setFormData({...formData, upiId: e.target.value})} placeholder="yourname@upi" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Available Hours</label>
                <select className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none transition font-bold" onChange={(e: any) => setFormData({...formData, availableHours: e.target.value})}>
                  <option>1-2 Hours</option>
                  <option>2-3 Hours</option>
                  <option>4+ Hours</option>
                  <option>Weekends Only</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Upload ID Proof</label>
                <input type="file" className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-3.5 rounded-[1.25rem] text-xs font-bold" />
              </div>
            </div>

            <div className="pt-8 space-y-4">
               <div className="flex items-start gap-3">
                 <input type="checkbox" required className="mt-1 w-5 h-5 accent-google-blue rounded-lg" />
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">I confirm all leads will be genuine and verified. I understand that fake leads result in permanent suspension.</p>
               </div>
               <button 
                type="submit" 
                className="w-full bg-google-blue text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
               >
                 Register as Student Partner
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, required, ...props }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{label} {required && '*'}</label>
    <input {...props} className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-google-blue/10 focus:border-google-blue transition text-gray-900 font-bold" />
  </div>
);

export default SLRPFormPage;
