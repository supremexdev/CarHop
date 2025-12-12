import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { BrowseCars } from './components/BrowseCars';
import { FAQ } from './components/FAQ';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'browse' | 'faq'>('home');
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
      
      {currentPage === 'home' ? (
        <HomePage onNavigate={setCurrentPage} />
      ) : currentPage === 'browse' ? (
        <BrowseCars />
      ) : currentPage === 'faq' ? (
        <FAQ />
      ) : (
        <Dashboard onNavigate={setCurrentPage} />
      )}
    </div>
  );
}