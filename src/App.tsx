import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { BrowseCars } from './components/BrowseCars';
import RentersList from './components/rentersList';
import TenantsList from './components/tenantsList';
import { FAQ } from './components/FAQ';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'browse' |  'faq' | 'renters' | 'tenants'>('home');
  const [userEmail, setUserEmail] = useState<string>('');

  const handleSignIn = (email: string) => {
    setUserEmail(email);
  };

  return (
    <div className="min-h-screen bg-[#f6f8ef]">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        userEmail={userEmail}
        onSignIn={handleSignIn}
      />
      
      {/* TEMPORARY TEST BUTTONS */}
      <div className="flex gap-2 p-4 bg-gray-800">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('renters')} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          View Renters
        </button>
        <button 
          onClick={() => setCurrentPage('tenants')} 
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          View Tenants
        </button>
      </div>
      
      {currentPage === 'home' ? (
        <HomePage onNavigate={setCurrentPage} />
      ) : currentPage === 'browse' ? (
        <BrowseCars />
      ) : currentPage === 'faq' ? (
        <FAQ />
      ) : currentPage === 'renters' ? (
        <RentersList />
      ) : currentPage === 'tenants' ? (
        <TenantsList />
      ) : (
        <Dashboard onNavigate={setCurrentPage} />
      )}
    </div>
  );
}