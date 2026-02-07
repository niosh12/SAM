
import React, { useState } from 'react';
import { ViewState } from '../App';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const columns = [
    {
      id: 'explore',
      title: 'Explore',
      links: [
        { label: 'Search Jobs', view: 'all-jobs' as ViewState },
        { label: 'Shop Jobs', view: 'all-jobs' as ViewState },
        { label: 'Company Jobs', view: 'all-jobs' as ViewState },
        { label: 'Local Services', view: 'services-listing' as ViewState },
        { label: 'Insurance Help', view: 'insurance-help' as ViewState },
        { label: 'Partner Program (LRP)', view: 'lrp-info' as ViewState },
      ]
    },
    {
      id: 'users',
      title: 'For Users',
      links: [
        { label: 'Create Profile', view: 'auth' as ViewState },
        { label: 'Upload Resume', view: 'auth' as ViewState },
        { label: 'Find Nearby Jobs', view: 'all-jobs' as ViewState },
        { label: 'Book Local Service', view: 'services-listing' as ViewState },
        { label: 'Student Opportunities', view: 'all-jobs' as ViewState },
      ]
    },
    {
      id: 'support',
      title: 'Support & Legal',
      links: [
        { label: 'Help Center', view: 'help-center' as ViewState },
        { label: 'Contact Us', view: 'contact' as ViewState },
        { label: 'Terms & Conditions', view: 'terms' as ViewState },
        { label: 'Privacy Policy', view: 'privacy' as ViewState },
        { label: 'Refund / Disclaimer Policy', view: 'insurance-disclaimer' as ViewState },
        { label: 'Partner Guidelines', view: 'lrp-info' as ViewState },
      ]
    }
  ];

  return (
    <footer className="bg-[#0a2540] text-white w-full">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Column 1: About */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="https://i.ibb.co/TDk9wgMm/Local-Rozgar-250-x-100-px-250-x-80-px.png" 
                alt="LocalRozgar Logo" 
                className="h-12 w-auto object-contain brightness-0 invert" 
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              LocalRozgar Bharat ka trusted local jobs & services platform hai jahan worker aur employers seedhe connect karte hain.
            </p>
            <div className="space-y-3">
              <TrustBadge icon="🛡️" label="Verified Leads" />
              <TrustBadge icon="📍" label="Local Hiring" />
              <TrustBadge icon="🤝" label="Partner Network" />
            </div>
          </div>

          {/* Desktop View for Links */}
          {columns.map(col => (
            <div key={col.id} className="hidden lg:block">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/80">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link.label}>
                    <button 
                      onClick={() => onNavigate(link.view)}
                      className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mobile View for Links (Accordion) */}
          <div className="lg:hidden space-y-4">
            {columns.map(col => (
              <div key={col.id} className="border-b border-white/10 pb-4">
                <button 
                  onClick={() => toggleSection(col.id)}
                  className="w-full flex justify-between items-center py-2"
                >
                  <span className="text-sm font-black uppercase tracking-widest">{col.title}</span>
                  <span className={`transform transition-transform ${openSection === col.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openSection === col.id && (
                  <ul className="mt-4 space-y-3 pl-2">
                    {col.links.map(link => (
                      <li key={link.label}>
                        <button 
                          onClick={() => onNavigate(link.view)}
                          className="text-gray-400 hover:text-white transition-colors text-sm py-1"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Column 5: Contact */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/80">Connect</h4>
            <div className="space-y-6">
              <ContactInfo 
                icon="📞" 
                label="Support Phone" 
                text="+91 8447827569" 
                link="tel:+918447827569"
              />
              <ContactInfo 
                icon="💬" 
                label="Support WhatsApp" 
                text="Chat with us" 
                link="https://wa.me/918447827569"
              />
              <ContactInfo 
                icon="✉️" 
                label="Email Support" 
                text="support@localrozgar.in" 
                link="mailto:support@localrozgar.in"
              />
              <div className="pt-2">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Working Hours</p>
                <p className="text-xs text-gray-400 font-bold">Mon - Sat: 10:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-[#07192a] py-6 border-t border-white/5 px-6 md:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-center md:text-left">
            © {new Date().getFullYear()} LOCALROZGAR PORTAL – DESIGNED FOR BHARAT WITH ❤️
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map(item => (
              <button 
                key={item} 
                onClick={() => onNavigate(item.toLowerCase() as ViewState)}
                className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const TrustBadge = ({ icon, label }: { icon: string, label: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-lg">{icon}</span>
    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{label}</span>
  </div>
);

const ContactInfo = ({ icon, label, text, link }: { icon: string, label: string, text: string, link: string }) => (
  <a href={link} className="block group">
    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-bold group-hover:text-google-blue transition-colors">{text}</span>
    </div>
  </a>
);

export default Footer;
