
import React from 'react';

interface TermsPageProps {
  onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <button onClick={onBack} className="mb-8 text-google-blue font-bold flex items-center gap-2">
          ← Back
        </button>
        <h1 className="text-4xl font-black text-gray-900 mb-8">Terms & Conditions</h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">1. Platform Usage Rules</h2>
            <p>Users must be at least 18 years old to use the platform. All accounts must use valid personal information. Misrepresentation of identity is strictly prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">2. Job Posting Rules</h2>
            <p>Employers (Companies and Shop Owners) must post legitimate vacancies. Posting of fraudulent jobs, MLM schemes, or paid-entry positions is forbidden. Admin reserves the right to remove any listing.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">3. Service Booking Disclaimer</h2>
            <p>LocalRozgar is a facilitator. We do not employ service providers directly. Users are responsible for checking credentials and safety during home visits.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">4. Insurance Help Disclaimer</h2>
            <p>We provide a connector platform only. We do not sell insurance policies. Final pricing and terms are determined by the partner insurance provider.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">5. Partner Responsibility</h2>
            <p>LRP Partners must act in good faith and assist local communities with job applications without charging illegal fees for LocalRozgar access.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
