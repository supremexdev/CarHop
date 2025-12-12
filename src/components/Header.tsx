import { Car, LayoutDashboard, Menu, X, LogOut, User, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { SignInModal } from './SignInModal';

interface HeaderProps {
  currentPage: 'home' | 'dashboard' | 'browse' | 'faq';
  onNavigate: (page: 'home' | 'dashboard' | 'browse' | 'faq') => void;
  userEmail: string;
  onSignIn: (email: string) => void;
}

export function Header({ currentPage, onNavigate, userEmail, onSignIn }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignOut = () => {
    onSignIn('');
  };

  return (
    <>
      <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <Car className="w-8 h-8" />
              <h2 className="text-white">CARHOP</h2>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  currentPage === 'home'
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('browse')}
                className={`px-6 py-2 rounded-lg transition-colors font-medium shadow-md ${
                  currentPage === 'browse'
                    ? 'bg-white text-primary'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                Get Started
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium ${
                  currentPage === 'dashboard'
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              
              {userEmail ? (
                <div className="flex items-center gap-3 ml-2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{userEmail}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSignIn(true)}
                  className="px-6 py-2 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-md"
                >
                  Sign In
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-white/20">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                  currentPage === 'home' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('browse');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                  currentPage === 'browse' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium ${
                  currentPage === 'dashboard' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              
              {userEmail ? (
                <>
                  <div className="px-4 py-3 mt-2 bg-white/10 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" />
                      {userEmail}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 mt-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowSignIn(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 mt-2 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Sign In
                </button>
              )}
            </nav>
          )}
        </div>
      </header>

      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSignIn={onSignIn}
        />
      )}
    </>
  );
}