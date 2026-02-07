
import React, { useState } from 'react';
import { UserRole, User } from './types';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SLRPDashboard from './pages/SLRPDashboard';
import SLRPFormPage from './pages/SLRPFormPage';
import AllJobsPage from './pages/AllJobsPage';
import FinancialServicesPage from './pages/FinancialServicesPage';
import ServicesListingPage from './pages/ServicesListingPage';
import InsuranceHelpPage from './pages/InsuranceHelpPage';
import LRPFormPage from './pages/LRPFormPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import LRPProgramPage from './pages/LRPProgramPage';
import InsuranceDisclaimerPage from './pages/InsuranceDisclaimerPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ContactPage from './pages/ContactPage';
import ServiceBookingPage from './pages/ServiceBookingPage';
import ServiceTrackingPage from './pages/ServiceTrackingPage';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';

export type ViewState = 
  | 'landing' 
  | 'auth' 
  | 'dashboard' 
  | 'all-jobs' 
  | 'financial-services' 
  | 'services-listing' 
  | 'insurance-help' 
  | 'lrp-form'
  | 'slrp-form'
  | 'service-booking'
  | 'service-tracking'
  | 'terms'
  | 'privacy'
  | 'lrp-info'
  | 'insurance-disclaimer'
  | 'help-center'
  | 'contact';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('landing');
  const [activeBooking, setActiveBooking] = useState<any>(null);

  const navigate = (newView: ViewState) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleLogin = (u: User) => {
    setUser(u);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('landing');
  };

  const startBooking = (service: any) => {
    if (!user) {
      navigate('auth');
      return;
    }
    setActiveBooking(service);
    navigate('service-booking');
  };

  const renderContent = () => {
    switch (view) {
      case 'landing': return <LandingPage onNavigate={navigate} />;
      case 'auth': return <AuthPage onLogin={handleLogin} onBack={() => navigate('landing')} />;
      case 'dashboard': 
        if (!user) return <LandingPage onNavigate={navigate} />;
        switch (user.role) {
          case UserRole.USER: return <UserDashboard user={user} onNavigate={navigate} />;
          case UserRole.COMPANY: return <CompanyDashboard user={user} />;
          case UserRole.SERVICE_PROVIDER: return <ProviderDashboard user={user} />;
          case UserRole.ADMIN: return <AdminDashboard user={user} />;
          case UserRole.STUDENT_PARTNER: return <SLRPDashboard user={user} />;
          default: return <LandingPage onNavigate={navigate} />;
        }
      case 'all-jobs': return <AllJobsPage onNavigate={navigate} />;
      case 'financial-services': return <FinancialServicesPage />;
      case 'services-listing': return <ServicesListingPage onNavigate={navigate} onBook={startBooking} />;
      case 'insurance-help': return <InsuranceHelpPage onNavigate={navigate} />;
      case 'lrp-form': return <LRPFormPage onBack={() => navigate('landing')} />;
      case 'slrp-form': return <SLRPFormPage onBack={() => navigate('landing')} onLogin={handleLogin} />;
      case 'service-booking': return <ServiceBookingPage user={user!} service={activeBooking} onComplete={() => navigate('service-tracking')} />;
      case 'service-tracking': return <ServiceTrackingPage onNavigate={navigate} />;
      case 'terms': return <TermsPage onBack={() => navigate('landing')} />;
      case 'privacy': return <PrivacyPage onBack={() => navigate('landing')} />;
      case 'lrp-info': return <LRPProgramPage onNavigate={navigate} />;
      case 'insurance-disclaimer': return <InsuranceDisclaimerPage onBack={() => navigate('landing')} />;
      case 'help-center': return <HelpCenterPage onNavigate={navigate} />;
      case 'contact': return <ContactPage onNavigate={navigate} />;
      default: return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Navbar user={user} onLogout={handleLogout} onNavigate={navigate} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Hide footer on auth and admin pages for cleaner look */}
      {view !== 'auth' && view !== 'service-tracking' && (user?.role !== UserRole.ADMIN || view !== 'dashboard') && (
        <Footer onNavigate={navigate} />
      )}

      <BottomNav currentView={view} user={user} onNavigate={navigate} />
    </div>
  );
};

export default App;
