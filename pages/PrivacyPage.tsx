
import React from 'react';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <button onClick={onBack} className="mb-8 text-google-blue font-bold flex items-center gap-2">
          ← Back
        </button>
        <h1 className="text-4xl font-black text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Data Collection</h2>
            <p>We collect personal information such as name, mobile number, email, and location for the sole purpose of connecting job seekers with employers and service seekers with experts.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">OTP & Contact Storage</h2>
            <p>Mobile numbers are verified via OTP. We store contact details securely to enable the "Lead Forwarding" system, ensuring employers can reach applicants.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Document Upload Handling</h2>
            <p>Resumes and business proofs are stored in encrypted formats. These are only visible to the Admin and the relevant prospective employer during the application process.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">No Data Resale</h2>
            <p>LocalRozgar maintains a strict policy: We do NOT sell user data to third-party marketing agencies. Your information stays within our platform ecosystem.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
