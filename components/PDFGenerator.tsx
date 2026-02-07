
import React from 'react';
import { User } from '../types';

interface PDFGeneratorProps {
  user: User;
  item: any;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ user, item }) => {
  const isJob = !!item.title;
  const bookingId = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="pdf-container p-10 bg-white border-2 border-dashed border-gray-200" id="pdf-content">
      <div className="flex justify-between items-start border-b-2 border-google-blue pb-6 mb-8">
        <div className="h-16">
          <img 
            src="https://i.ibb.co/TDk9wgMm/Local-Rozgar-250-x-100-px-250-x-80-px.png" 
            alt="LocalRozgar Logo" 
            className="h-full object-contain scale-110 origin-left"
          />
          <p className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-tighter">Bharat ka Apna Rozgar Portal</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">OFFICIAL {isJob ? 'APPLICATION' : 'BOOKING'}</p>
          <p className="text-xs text-gray-500 uppercase">ID: LR-{bookingId}</p>
          <p className="text-xs text-gray-500 uppercase">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-google-blue uppercase mb-4 tracking-widest border-l-4 border-google-blue pl-3">Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Customer/Applicant</p>
            <p className="text-lg font-bold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">Mob: {user.mobile}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">{isJob ? 'Company' : 'Service Provider'}</p>
            <p className="text-lg font-bold text-gray-900">{item.companyName || item.name}</p>
            <p className="text-sm text-gray-600">{item.location}</p>
            <p className="text-sm text-gray-600">Mob: {item.mobile || 'Confidential'}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border mb-10">
        <h4 className="font-bold text-gray-900 mb-2">{isJob ? 'Position Applied' : 'Service Booked'}</h4>
        <p className="text-xl font-extrabold text-google-blue">{item.title || item.serviceType}</p>
        {isJob && <p className="text-sm text-gray-600 mt-2">Salary: {item.salary}</p>}
        {!isJob && <p className="text-sm text-gray-600 mt-2">Booking Status: Confirmed for Home Visit</p>}
      </div>

      <div className="border-t pt-8">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Disclaimer: LocalRozgar is a facilitator platform. Users are advised to verify details independently. 
          This is an auto-generated document forwarded to both parties via email.
        </p>
      </div>

      <div className="mt-10 flex justify-end">
        <div className="text-center opacity-30">
          <div className="w-24 h-12 bg-gray-200 mb-1 rounded"></div>
          <p className="text-[8px] font-bold uppercase tracking-widest">Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator;
