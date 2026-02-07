
import React from 'react';

interface InsuranceDisclaimerPageProps {
  onBack: () => void;
}

const InsuranceDisclaimerPage: React.FC<InsuranceDisclaimerPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <button onClick={onBack} className="mb-8 text-google-blue font-bold flex items-center gap-2">
          ← Back
        </button>
        <h1 className="text-4xl font-black text-gray-900 mb-8 italic">Refund / Disclaimer Policy</h1>
        
        <div className="bg-orange-50 p-10 rounded-[2.5rem] border-2 border-dashed border-orange-200 mb-12">
          <h2 className="text-xl font-black text-orange-600 mb-4 uppercase tracking-widest">Insurance Help Connector Status</h2>
          <p className="text-orange-900 font-bold leading-relaxed">
            LocalRozgar is NOT an insurance company, brokerage, or authorized agent. We act solely as a technology platform that connects users with third-party insurance providers.
          </p>
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">No Direct Sales</h2>
            <p>We do not sell insurance policies directly. Any "premium" mentioned on our platform is an estimate provided by partners. Final pricing depends on the insurer's underwriting rules.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Refund Policy</h2>
            <p>Since LocalRozgar does not collect payments for insurance premiums, any refund requests regarding policies must be directed to the respective insurance provider.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Liability</h2>
            <p>LocalRozgar is not liable for policy rejections, claim disputes, or errors in coverage details provided by partners.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDisclaimerPage;
