
import React, { useState } from 'react';
import { UserRole, User, CompanyType } from '../types';
import { JOB_CATEGORIES, SERVICE_CATEGORIES, SHOP_CATEGORIES } from '../constants';

interface AuthPageProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [formData, setFormData] = useState<any>({
    mobile: '+91 ',
    workStatus: 'I’m a Fresher',
    jobType: 'Full Time',
    studentStatus: 'Student',
    companyType: 'Private Company'
  });
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep(true);
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') {
      setShowSuccess(true);
      setTimeout(() => {
        onLogin({
          id: Math.random().toString(),
          name: formData.firstName ? `${formData.firstName} ${formData.lastName}` : (formData.companyName || formData.fullName || formData.shopName),
          email: formData.email,
          role: role,
          mobile: formData.mobile,
          companyName: formData.companyName || formData.shopName,
          companyType: formData.companyType,
          createdAt: Date.now()
        });
      }, 2000);
    } else {
      alert("Invalid OTP! Try 1234");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: '123',
      name: 'Logged In User',
      email: formData.email || 'user@localrozgar.com',
      role: UserRole.USER,
      mobile: '9876543210',
      createdAt: Date.now()
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const companyTypes: CompanyType[] = [
    'Private Company', 'Small Business', 'Startup', 'Shop Owner', 
    'Franchise Outlet', 'Agency', 'Contractor', 'Individual Employer'
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mb-6 animate-bounce">✓</div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-500 max-w-md mx-auto font-medium">Profile verified. Redirecting to your dashboard...</p>
      </div>
    );
  }

  if (otpStep) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Mobile</h2>
          <p className="text-gray-500 mb-8 font-medium">Enter 4-digit code sent to {formData.mobile}</p>
          <form onSubmit={verifyOtp} className="space-y-6">
            <input 
              required type="text" maxLength={4} placeholder="1234" 
              className="w-full text-center text-3xl font-black bg-gray-50 border border-gray-200 py-4 rounded-2xl tracking-[1rem] focus:ring-2 focus:ring-google-blue focus:outline-none"
              value={otp} onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" className="w-full bg-google-blue text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition transform active:scale-95">Verify</button>
            <button type="button" onClick={() => setOtpStep(false)} className="text-gray-400 font-bold text-sm">Resend OTP</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="bg-google-blue md:w-1/3 p-12 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <button onClick={onBack} className="mb-12 flex items-center gap-2 text-white/80 hover:text-white font-bold transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back
        </button>
        <div className="mb-10">
          <img src="https://i.ibb.co/TDk9wgMm/Local-Rozgar-250-x-100-px-250-x-80-px.png" alt="LocalRozgar Logo" className="h-20 w-auto object-contain brightness-0 invert" />
        </div>
        <h2 className="text-3xl font-black mb-4 tracking-tight leading-tight">{isLogin ? 'Welcome Back!' : 'Start Your Journey'}</h2>
        <p className="opacity-80 font-medium text-lg leading-relaxed mb-10">Bharat ka sabse bada local jobs network. Aaj hi judiye aur badhiye.</p>
        <div className="space-y-6">
           {['Verified Employers', 'Zero Fees Application', 'Local Search Power'].map(item => (
             <div key={item} className="flex items-center gap-4">
               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
               <p className="font-bold text-sm tracking-wide">{item}</p>
             </div>
           ))}
        </div>
      </div>

      <div className="flex-1 p-6 md:p-20 overflow-y-auto bg-white">
        <div className="max-w-2xl mx-auto">
          {!isLogin && (
            <div className="mb-10">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Registration Type</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { r: UserRole.USER, l: 'User', i: '👤' },
                  { r: UserRole.COMPANY, l: 'Employer', i: '🏢' },
                  { r: UserRole.SERVICE_PROVIDER, l: 'Expert', i: '🛠️' }
                ].map(item => (
                  <button
                    key={item.r}
                    onClick={() => setRole(item.r)}
                    className={`flex flex-col items-center p-5 rounded-3xl border-2 transition-all ${role === item.r ? 'bg-blue-50 border-google-blue shadow-lg scale-105' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                  >
                    <span className="text-3xl mb-2">{item.i}</span>
                    <span className={`text-xs font-black uppercase tracking-widest ${role === item.r ? 'text-google-blue' : 'text-gray-500'}`}>{item.l}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-blue-500/5">
            <h3 className="text-2xl font-black text-gray-900 mb-10 tracking-tight">
              {isLogin ? 'Login' : `Join as ${role.replace('_', ' ')}`}
            </h3>

            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <Input label="Email or Mobile" name="email" placeholder="rahul@email.com" onChange={handleChange} />
                <div className="relative">
                  <Input label="Password" name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" onChange={handleChange} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-google-blue">
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button type="submit" className="w-full bg-google-blue text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-google-blue/30 transition transform active:scale-95">Sign In</button>
                <p className="text-center text-sm font-bold text-gray-400">New here? <span className="text-google-blue cursor-pointer underline" onClick={() => setIsLogin(false)}>Create Account</span></p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-8">
                {role === UserRole.USER && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="First Name" name="firstName" placeholder="Rahul" onChange={handleChange} required />
                      <Input label="Last Name" name="lastName" placeholder="Sharma" onChange={handleChange} required />
                    </div>
                    <Input label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
                    <Input label="Email" name="email" type="email" placeholder="rahul@email.com" onChange={handleChange} required />
                    <Select label="Work Status" name="workStatus" options={["I’m a Fresher", "I’m Experienced"]} onChange={handleChange} />
                    <Input label="Skills" name="skills" placeholder="Delivery, Tally, Driving..." onChange={handleChange} />
                  </div>
                )}

                {role === UserRole.COMPANY && (
                  <div className="space-y-6">
                    <Select label="Employer Type" name="companyType" options={companyTypes} onChange={handleChange} />
                    
                    {formData.companyType === 'Shop Owner' ? (
                      <>
                        <Input label="Shop Name" name="shopName" placeholder="Garg Kirana Store" onChange={handleChange} required />
                        <Select label="Shop Category" name="shopCategory" options={SHOP_CATEGORIES} onChange={handleChange} required />
                        <Input label="HR/Contact Person" name="hrContact" placeholder="Owner Name" onChange={handleChange} required />
                      </>
                    ) : (
                      <>
                        <Input label="Company Name" name="companyName" placeholder="TATA Motors" onChange={handleChange} required />
                        <Input label="HR Contact Person" name="hrContact" placeholder="Rahul HR" onChange={handleChange} required />
                      </>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
                      <Input label="Email" name="email" type="email" placeholder="contact@shop.com" onChange={handleChange} required />
                    </div>
                    <Input label="Address" name="address" placeholder="Full Location Details" onChange={handleChange} required />
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Company Proof</label>
                      <input type="file" className="w-full bg-gray-50 border-2 border-dashed border-gray-100 p-6 rounded-3xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-google-blue file:text-white" />
                    </div>
                  </div>
                )}

                {role === UserRole.SERVICE_PROVIDER && (
                  <div className="space-y-6">
                    <Input label="Full Name" name="fullName" placeholder="Rajesh Kumar" onChange={handleChange} required />
                    <Input label="Business Name" name="businessName" placeholder="Rajesh Electric Services" onChange={handleChange} required />
                    <Select label="Category" name="serviceCategory" options={SERVICE_CATEGORIES.map(s => s.name)} onChange={handleChange} />
                    <Input label="Service Area (PINs)" name="area" placeholder="1100XX, 1100YY" onChange={handleChange} required />
                  </div>
                )}

                <div className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <input required type="checkbox" className="mt-1 w-5 h-5 accent-google-blue rounded-lg" />
                    <p className="text-xs text-gray-500 font-bold leading-relaxed">I agree to the <span className="text-google-blue underline">Terms & Privacy Policy</span>.</p>
                  </div>
                  <button type="submit" className="w-full bg-google-blue text-white py-5 rounded-[1.25rem] font-black text-lg shadow-2xl shadow-blue-500/20 transition transform active:scale-95">
                    {role === UserRole.COMPANY && formData.companyType === 'Shop Owner' ? 'Register My Shop' : 'Register Now'}
                  </button>
                  <p className="text-center text-sm font-bold text-gray-400">Already a member? <span className="text-google-blue cursor-pointer underline" onClick={() => setIsLogin(true)}>Login</span></p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, required, ...props }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      {...props} 
      className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none focus:ring-2 focus:ring-google-blue/10 focus:border-google-blue transition text-gray-900 font-bold placeholder:text-gray-300" 
    />
  </div>
);

const Select = ({ label, options, required, ...props }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select 
      {...props} 
      className="w-full bg-gray-50 border-2 border-gray-50 px-6 py-4 rounded-[1.25rem] focus:outline-none focus:ring-2 focus:ring-google-blue/10 focus:border-google-blue transition text-gray-900 font-bold appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-[length:20px_20px] bg-[right_1.5rem_center] bg-no-repeat"
    >
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default AuthPage;
