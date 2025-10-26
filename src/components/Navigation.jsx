import React, { useState, useEffect } from 'react';
import { Camera, User, LogIn, LogOut, Menu, X, Home, Grid, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const Navigation = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    setCurrentView('home');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Artisan Crafts
              </h1>
              <p className="text-xs text-gray-600">Handcrafted Excellence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user?.role === 'admin' ? (
              // Admin sees only logout
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            ) : (
              // Regular users see all navigation
              <>
                <NavLink onClick={() => setCurrentView('home')} active={currentView === 'home'}>
                  <Home className="w-4 h-4" />
                  Home
                </NavLink>
                <NavLink onClick={() => setCurrentView('portfolio')} active={currentView === 'portfolio'}>
                  <Grid className="w-4 h-4" />
                  Portfolio
                </NavLink>
                
                {user ? (
                  <>
                    <NavLink onClick={() => setCurrentView('profile')} active={currentView === 'profile'}>
                      <User className="w-4 h-4" />
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <LoginModal setCurrentView={setCurrentView} />
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {user?.role === 'admin' ? (
              // Admin sees only logout on mobile
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            ) : (
              // Regular users see all navigation
              <>
                <MobileNavLink onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}>
                  <Home className="w-5 h-5" />
                  Home
                </MobileNavLink>
                <MobileNavLink onClick={() => { setCurrentView('portfolio'); setMobileMenuOpen(false); }}>
                  <Grid className="w-5 h-5" />
                  Portfolio
                </MobileNavLink>
                {user ? (
                  <>
                    <MobileNavLink onClick={() => { setCurrentView('profile'); setMobileMenuOpen(false); }}>
                      <User className="w-5 h-5" />
                      Profile
                    </MobileNavLink>
                    <button
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <LoginModal mobile onClose={() => setMobileMenuOpen(false)} setCurrentView={setCurrentView} />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
      active 
        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const MobileNavLink = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
  >
    {children}
  </button>
);

export default Navigation;
