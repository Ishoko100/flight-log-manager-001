
import React, { useState, useEffect } from 'react';
import { Page, User, Drone, Flight } from './types';
import { MOCK_USER, MOCK_DRONES, MOCK_FLIGHTS } from './constants';
import { Auth } from './components/Auth';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { AddFlight } from './components/AddFlight';
import { Maintenance } from './components/Maintenance';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { SideMenu } from './components/SideMenu';
import { AnalyzeImage } from './components/AnalyzeImage';
import { PreFlightChecklist } from './components/PreFlightChecklist';
import { summarizeFlights } from './services/geminiService';
import { SparklesIcon } from './components/icons/IconComponents';
import { Upgrade } from './components/Upgrade';
import { Referral } from './components/Referral';
import { TermsOfService } from './components/TermsOfService';
import { PrivacyPolicy } from './components/PrivacyPolicy';

function checkPlanStatus(user: User): User {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Compare dates only
  const expiry = new Date(user.plan_expiry);
  
  const updatedUser = { ...user };

  if (today > expiry && updatedUser.plan_type === "free_trial") {
    updatedUser.plan_type = "free";
    updatedUser.unlimited_logs = false;
    updatedUser.drone_log_limit = 1;
    alert("Your free trial has ended. Upgrade to Pro to unlock unlimited flights and AI features.");
  }

  return updatedUser;
}

const AISummary: React.FC<{ flights: Flight[], drones: Drone[] }> = ({ flights, drones }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchSummary = async () => {
          setIsLoading(true);
          const recentFlights = flights.slice(0, 5);
          const result = await summarizeFlights(recentFlights, drones);
          setSummary(result);
          setIsLoading(false);
      };
      fetchSummary();
  }, [flights, drones]);

  if (isLoading) {
      return (
          <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 text-center text-slate-600 animate-slide-in-up">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-3"></div>
              <p className="font-semibold">AI is analyzing your flights...</p>
          </div>
      );
  }

  return (
      <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight animate-slide-in-up">AI Flight Summary</h2>
          <div className="bg-white p-5 rounded-3xl shadow-lg shadow-slate-200/50 space-y-2 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><SparklesIcon className="w-5 h-5 text-teal-500"/> Flight Analysis</h3>
              <div
                  className="prose prose-sm text-slate-600 max-w-none"
                  dangerouslySetInnerHTML={{ __html: summary.replace(/## (.*)/g, '<h4 class="text-teal-600 font-semibold mt-3 mb-1">$1</h4>') }}
              />
          </div>
      </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [drones, setDrones] = useState<Drone[]>(MOCK_DRONES);
  const [flights, setFlights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [showPage, setShowPage] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      document.body.classList.remove('auth-bg');
      setUser(currentUser => checkPlanStatus(currentUser));
    } else {
      document.body.classList.add('auth-bg');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
        setIsLoggedIn(false);
        setCurrentPage(Page.Home);
    }, 300);
  };

  const handleNavigate = (page: Page) => {
    if (page === currentPage) return;

    setShowPage(false);
    setTimeout(() => {
        setCurrentPage(page);
        setShowPage(true);
    }, 200);
  };

  const addFlightLog = (newFlightData: Omit<Flight, 'id' | 'coords' | 'status'>) => {
    if (!user.unlimited_logs && flights.length >= user.drone_log_limit) {
      alert("You’ve reached your limit. Upgrade to Pro for unlimited logs.");
      handleNavigate(Page.Upgrade);
      return;
    }
    
    const newFlight: Flight = {
      ...newFlightData,
      id: flights.length + 1,
      coords: { lat: 34.0522, lng: -118.2437 }, // Default to LA for demo
      status: 'Completed',
    };
    setFlights(prevFlights => [newFlight, ...prevFlights]);
    alert("Flight log added successfully!");
    handleNavigate(Page.Home);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Dashboard 
                  flights={flights} 
                  drones={drones}
                />;
      case Page.PreFlight:
        return <PreFlightChecklist onChecklistComplete={() => handleNavigate(Page.Add)} />;
      case Page.Add:
        return <AddFlight drones={drones} addFlightLog={addFlightLog} onNavigateBack={() => handleNavigate(Page.Home)} />;
      case Page.Analyze:
        return <AnalyzeImage />;
      case Page.Status:
        return <Maintenance drones={drones} />;
      case Page.AISummary:
        return <AISummary flights={flights} drones={drones} />;
      case Page.Profile:
        return <Profile user={user} drones={drones} flights={flights} onNavigate={handleNavigate} />;
      case Page.Settings:
        return <Settings onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} onNavigate={handleNavigate} />;
      case Page.Upgrade:
        return <Upgrade onNavigateBack={() => handleNavigate(Page.Home)} />;
      case Page.Referral:
        return <Referral user={user} />;
      case Page.TermsOfService:
        return <TermsOfService />;
      case Page.PrivacyPolicy:
        return <PrivacyPolicy />;
      default:
        return <Dashboard 
                  flights={flights} 
                  drones={drones}
                />;
    }
  };

  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
        <div className="relative max-w-md mx-auto bg-slate-50 dark:bg-slate-950 min-h-screen">
            <Header 
              onOpenMenu={() => setIsMenuOpen(true)}
            />
            <SideMenu 
              isOpen={isMenuOpen} 
              onClose={() => setIsMenuOpen(false)}
              onNavigate={(page) => {
                  handleNavigate(page);
                  setIsMenuOpen(false);
              }}
              onLogout={handleLogout}
              user={user}
              activePage={currentPage}
            />
            <main className={`pt-20 pb-24 px-4 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                {renderPage()}
            </main>
            <BottomNav activePage={currentPage} onNavigate={handleNavigate} />
        </div>
    </div>
  );
}