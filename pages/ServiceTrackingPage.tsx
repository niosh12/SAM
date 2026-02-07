
import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../App';

// Add global declaration for Google Maps API to fix TypeScript errors
declare const google: any;

interface ServiceTrackingPageProps {
  onNavigate: (view: ViewState) => void;
}

const ServiceTrackingPage: React.FC<ServiceTrackingPageProps> = ({ onNavigate }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // Fix: Use any type for Google Maps objects to fix TypeScript errors
  const googleMap = useRef<any>(null);
  const partnerMarker = useRef<any>(null);
  const [status, setStatus] = useState(0);
  const [eta, setEta] = useState(18);

  const statuses = [
    { label: 'Request Received', icon: '📝', sub: 'Aapki request receive ho gayi hai.' },
    { label: 'Partner Assigned', icon: '👤', sub: 'LocalRozgar Expert assigned.' },
    { label: 'On The Way', icon: '🚚', sub: 'Partner is travelling to you.' },
    { label: 'Reached Location', icon: '📍', sub: 'Expert reached your place.' },
    { label: 'Work Started', icon: '🛠️', sub: 'Repairing work in progress.' },
    { label: 'Completed', icon: '✅', sub: 'Dhanyawad! Work completed.' }
  ];

  // Simulated path coordinates (Rohini area demo)
  const userLoc = { lat: 28.715, lng: 77.114 };
  const startLoc = { lat: 28.698, lng: 77.085 };

  useEffect(() => {
    if (!mapRef.current) return;

    /* Fix: Using global google object for Maps API */
    // Initialize Map
    googleMap.current = new google.maps.Map(mapRef.current, {
      center: userLoc,
      zoom: 14,
      styles: [
        { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }] },
        { "featureType": "administrative.country", "elementType": "geometry", "stylers": [{ "visibility": "on" }] },
        { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f2f4f7" }] },
        { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#d2d9e1" }] }
      ],
      disableDefaultUI: true,
      zoomControl: false,
      clickableIcons: false
    });

    // Home Marker
    new google.maps.Marker({
      position: userLoc,
      map: googleMap.current,
      icon: {
        url: 'https://cdn-icons-png.flaticon.com/512/1216/1216733.png',
        scaledSize: new google.maps.Size(40, 40)
      },
      title: 'Aapka Ghar'
    });

    // Partner Marker
    partnerMarker.current = new google.maps.Marker({
      position: startLoc,
      map: googleMap.current,
      icon: {
        url: 'https://cdn-icons-png.flaticon.com/512/2830/2830305.png', // Delivery truck icon
        scaledSize: new google.maps.Size(45, 45)
      },
      title: 'Partner'
    });

    // Animate Partner Movement
    let step = 0;
    const totalSteps = 1000;
    const interval = setInterval(() => {
      if (step < totalSteps) {
        step++;
        const lat = startLoc.lat + (userLoc.lat - startLoc.lat) * (step / totalSteps);
        const lng = startLoc.lng + (userLoc.lng - startLoc.lng) * (step / totalSteps);
        partnerMarker.current?.setPosition({ lat, lng });
        
        // Auto-update status every few seconds
        if (step === 200) setStatus(1);
        if (step === 400) setStatus(2);
        if (step === 800) setStatus(3);
        
        if (eta > 2 && step % 50 === 0) setEta(prev => prev - 1);
      } else {
        clearInterval(interval);
        setStatus(4);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Google Map Section */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="absolute inset-0 z-0"></div>

        {/* Back Button */}
        <button 
          onClick={() => onNavigate('dashboard')}
          className="absolute top-8 left-8 w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-gray-900 border border-gray-50 active:scale-95 transition-all z-30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>

        {/* Floating ETA Overlay */}
        <div className="absolute top-8 right-8 bg-black text-white p-6 rounded-[2rem] shadow-2xl z-30 backdrop-blur-md animate-in slide-in-from-right duration-700">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Estimated Arrival</p>
           <div className="flex items-end gap-1">
              <span className="text-4xl font-black italic leading-none">{eta}</span>
              <span className="text-xs font-black uppercase mb-1 tracking-widest">Mins</span>
           </div>
        </div>
      </div>

      {/* Tracking Info Card (Swiggy Style Bottom Sheet) */}
      <div className="h-[45vh] bg-white rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 relative z-40 animate-in slide-in-from-bottom duration-700 border-t border-gray-50">
        <div className="w-12 h-1.5 bg-gray-100 mx-auto rounded-full mb-8"></div>
        
        <div className="flex flex-col md:flex-row gap-12 h-full">
          {/* Status Tracker */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-google-blue text-white rounded-3xl flex items-center justify-center text-3xl shadow-xl shadow-blue-500/20">
                {statuses[status].icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter leading-none mb-2">{statuses[status].label}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">{statuses[status].sub}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2">
               {statuses.map((_, i) => (
                 <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-700 ${i <= status ? 'bg-google-blue shadow-sm' : 'bg-gray-100'}`}></div>
               ))}
            </div>

            <div className="pt-4 flex gap-4">
              <a href="tel:+918447827569" className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl">
                📞 CALL PARTNER
              </a>
              <a href="https://wa.me/918447827569" className="flex-1 bg-green-500 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl">
                💬 WHATSAPP
              </a>
            </div>
          </div>

          {/* Partner Info Card */}
          <div className="w-full md:w-80 bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col justify-between shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-3xl border-4 border-white shadow-xl overflow-hidden shrink-0">
                <img src="https://i.pravatar.cc/150?u=partner88" alt="Partner" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-lg font-black text-gray-900 italic">Rajesh Expert</p>
                <div className="flex gap-1 text-[11px] text-yellow-500 mt-1">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-dashed border-gray-200 mt-6">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Service Partner Verified</p>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl font-black">✓</span>
                <span className="text-xs font-black text-gray-900 tracking-widest">ID: LR-EP-9344</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTrackingPage;
