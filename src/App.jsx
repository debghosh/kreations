import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AdminDashboard from './pages/AdminDashboard';

// Import other pages (simplified versions for file size)
// You'll need to create: PortfolioPage, ItemDetailPage, ProfilePage
// See REFACTORING-GUIDE.md for complete structure

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedItem]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-x-hidden">
        <Navigation 
          currentView={currentView}
          setCurrentView={setCurrentView}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main className="relative">
          {currentView === 'home' && (
            <HomePage 
              setCurrentView={setCurrentView}
              setSelectedCategory={setSelectedCategory}
              setSelectedItem={setSelectedItem}
            />
          )}
          
          {currentView === 'portfolio' && (
            <PortfolioPage 
              setSelectedItem={setSelectedItem}
              setCurrentView={setCurrentView}
            />
          )}

          {currentView === 'admin' && <AdminDashboard />}
          
          {/* Add other views here: item-detail, profile */}
        </main>

        <Footer setCurrentView={setCurrentView} />
      </div>
    </AuthProvider>
  );
};

export default App;
