
import React, { useState } from 'react';
import { User, StudentLead } from '../types';

interface SLRPDashboardProps {
  user: User;
}

const SLRPDashboard: React.FC<SLRPDashboardProps> = ({ user }) => {
  const [tab, setTab] = useState<'submit' | 'leads' | 'wallet' | 'guide'>('submit');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [leads, setLeads] = useState<StudentLead[]>([
    {
      id: 'L1', partnerId: user.id, businessType: 'Shop', businessName: 'Garg Kirana Store', contactPerson: 'Arun Garg',
      mobile: '9898XXXXXX', address: 'Rohini Sec 7', requirementType: 'Helper', description: 'Need helper for packing',
      salaryRange: '10k-12k', urgency: 'High', status: 'In Process', commission: 0, createdAt: Date.now() - 86400000
    },
    {
      id: 'L2', partnerId: user.id, businessType: 'Office', businessName: 'Dev Tech Solutions', contactPerson: 'Simran Kaur',
      mobile: '8877XXXXXX', address: 'Pitampura', requirementType: 'Office Boy', description: 'Maintenance and cleaning',
      salaryRange: '12k-15k', urgency: 'Medium', status: 'Completed', commission: 450, createdAt: Date.now() - 172800000
    }
  ]);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Anti-fraud logic check simulation
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const stats = [
    { label: 'Leads Submitted', val: leads.length, color: 'text-blue-500' },
    { label: 'Approved Leads', val: leads.filter(l => l.status !== 'Submitted').length, color: 'text-green-500' },
    { label: 'Converted', val: leads.filter(l => l.status === 'Completed').length, color: 'text-purple-500' },
    { label: 'Earned (₹)', val: leads.reduce((acc, cur) => acc + cur.commission, 0), color: 'text-orange-500' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">SLRP Partner Console</h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">
              {user.name} • {user.collegeName} • Partner ID: {user.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setTab('submit')}
              className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${tab === 'submit' ? 'bg-google-blue text-white shadow-xl shadow-blue-500/20' : 'bg-white text-gray-400 border border-gray-100'}`}
            >
              Submit New Lead
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(s => (
            <div key={s.label} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'submit', label: 'Lead Form' },
            { id: 'leads', label: 'My Leads' },
            { id: 'wallet', label: 'Commission' },
            { id: 'guide', label: 'Training' }
          ].map(t => (
            <button 
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`whitespace-nowrap px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${tab === t.id ? 'bg-white text-google-blue border-2 border-google-blue shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        <div className="animate-in fade-in duration-500">
          {tab === 'submit' && (
            <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="mb-10">
                <h2 className="text-2xl font-black text-gray-900 uppercase italic">Submit New Hiring Lead</h2>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Aapki area ki business requirements submit karein</p>
              </div>

              <div className="bg-red-50 border-2 border-dashed border-red-200 p-6 rounded-2xl mb-10">
                <div className="flex gap-4">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h4 className="text-xs font-black text-red-600 uppercase">Anti-Fraud Warning</h4>
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-tight leading-relaxed mt-1">
                      Fake or self leads will permanently block partner account. Humari team har lead verify karti hai.
                    </p>
                  </div>
                </div>
              </div>

              {showSuccess ? (
                <div className="text-center py-16 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">Lead Submitted!</h3>
                  <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Verification in progress.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormSelect label="Business Type" options={['Shop', 'Office', 'Small Company', 'Household Service']} />
                    <FormInput label="Business / Person Name" placeholder="e.g. Agarwal Sweets" required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormInput label="Contact Person Name" placeholder="Owner Name" required />
                    <FormInput label="Mobile Number" placeholder="Verification needed" required />
                  </div>
                  <FormInput label="Full Address / Locality" placeholder="Exact Location" required />
                  <div className="grid md:grid-cols-3 gap-8">
                    <FormSelect label="Requirement Type" options={['Helper', 'Delivery Boy', 'Sales', 'Office Staff', 'Technician']} />
                    <FormInput label="Expected Salary/Budget" placeholder="e.g. 12k - 15k" />
                    <FormSelect label="Urgency Level" options={['Normal', 'Medium', 'High / Urgent']} />
                  </div>
                  <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-google-blue text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
                    >
                      {loading ? 'Processing Lead...' : 'Submit Lead Now'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {tab === 'leads' && (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
              <div className="p-8 border-b bg-gray-50/50">
                <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">My Lead Pipeline</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/30 border-b">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client / Business</th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Requirement</th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Commission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {leads.map(l => (
                      <tr key={l.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-8 py-6">
                          <p className="text-sm font-black text-gray-900">{l.businessName}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">{l.address}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-xs font-black text-google-blue uppercase">{l.requirementType}</p>
                          <p className="text-[10px] font-bold text-gray-400">{l.salaryRange}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            l.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                            l.status === 'In Process' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right font-black text-gray-900">
                          {l.commission > 0 ? `₹${l.commission}` : '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'wallet' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10">Commission Summary</h3>
                <div className="space-y-8">
                  <div className="flex justify-between items-end border-b pb-6">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Earned</p>
                      <p className="text-4xl font-black text-gray-900">₹450</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Paid Status</p>
                      <p className="text-xs font-black text-green-500 uppercase">Settled</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pending Approval</p>
                      <p className="text-2xl font-black text-gray-400">₹0</p>
                    </div>
                    <button className="text-google-blue font-black uppercase text-[10px] tracking-widest underline underline-offset-8">View History</button>
                  </div>
                </div>
              </div>

              <div className="bg-google-blue p-12 rounded-[3rem] text-white shadow-2xl shadow-blue-500/20 flex flex-col justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-8">Payout Details</h3>
                  <p className="text-sm font-bold opacity-80 mb-2 uppercase">UPI Linkage</p>
                  <p className="text-2xl font-black">{user.upiId || 'Not Set'}</p>
                </div>
                <div className="pt-8">
                  <button className="w-full bg-white text-google-blue py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Update UPI Account</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'guide' && (
            <div className="bg-white rounded-[3rem] p-12 md:p-20 border border-gray-100 shadow-xl">
              <h2 className="text-4xl font-black text-gray-900 mb-12 uppercase italic tracking-tighter">Partner Training Guide</h2>
              <div className="grid md:grid-cols-2 gap-16">
                <section className="space-y-6">
                  <h3 className="text-xs font-black text-google-blue uppercase tracking-widest border-b-2 border-google-blue inline-block pb-1">Shop Visits Guidelines</h3>
                  <div className="space-y-4">
                    {[
                      'Hamesha owner se seedha baat karein.',
                      'Worker ki salary aur timings ki clarity lein.',
                      'Dukaan ka photo/visiting card click karein.',
                      'Kise ko platform fees ka jhuta vaada na karein.'
                    ].map((text, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-google-blue font-black">{i + 1}.</span>
                        <p className="text-sm text-gray-600 font-bold">{text}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="space-y-6">
                  <h3 className="text-xs font-black text-red-500 uppercase tracking-widest border-b-2 border-red-500 inline-block pb-1">Lead Verification Rules</h3>
                  <div className="space-y-4">
                    {[
                      'Lead phone number partner ka nahi hona chahiye.',
                      'Duplicate leads par commission nahi milega.',
                      'Requirement real honi chahiye, fake entry ban hai.',
                      'Lead process hone mein 2-5 din lagte hain.'
                    ].map((text, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-red-500 font-black">!</span>
                        <p className="text-sm text-gray-600 font-bold">{text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, required, ...props }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{label} {required && '*'}</label>
    <input {...props} className="w-full bg-gray-50 border-2 border-transparent focus:border-google-blue focus:bg-white px-6 py-4 rounded-[1.25rem] focus:outline-none transition-all text-sm font-bold text-gray-800" />
  </div>
);

const FormSelect = ({ label, options, ...props }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{label}</label>
    <select {...props} className="w-full bg-gray-50 border-2 border-transparent focus:border-google-blue focus:bg-white px-6 py-4 rounded-[1.25rem] focus:outline-none transition-all text-sm font-bold text-gray-800 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-[length:20px_20px] bg-[right_1.5rem_center] bg-no-repeat">
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

export default SLRPDashboard;
