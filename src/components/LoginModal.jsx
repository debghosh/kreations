import React, { useState } from 'react';
import { LogIn, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ mobile, onClose, setCurrentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('subscriber');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userRole = login(email, password, role);
    setIsOpen(false);
    if (onClose) onClose();
    
    // Redirect admin users to admin dashboard
    if (userRole === 'admin' && setCurrentView) {
      setCurrentView('admin');
    }
  };

  if (mobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg transition-all font-medium"
        >
          <LogIn className="w-5 h-5" />
          <span>Login / Sign Up</span>
        </button>
        {isOpen && <ModalContent 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isSignup={isSignup}
          setIsSignup={setIsSignup}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          handleSubmit={handleSubmit}
          setCurrentView={setCurrentView}
        />}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg transition-all font-medium"
      >
        <LogIn className="w-4 h-4" />
        <span>Login</span>
      </button>

      {isOpen && <ModalContent 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isSignup={isSignup}
        setIsSignup={setIsSignup}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        handleSubmit={handleSubmit}
        setCurrentView={setCurrentView}
      />}
    </>
  );
};

const ModalContent = ({ 
  isOpen, 
  setIsOpen, 
  isSignup, 
  setIsSignup, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  role, 
  setRole, 
  handleSubmit,
  setCurrentView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isSignup ? 'Join our community of art lovers' : 'Login to access exclusive features'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            >
              <option value="subscriber">Subscriber</option>
              <option value="admin">Admin (Demo)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
