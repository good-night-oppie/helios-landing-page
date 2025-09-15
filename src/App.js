import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

// Pages
import LandingPage from './pages/LandingPage';
import DemoAccess from './pages/DemoAccess';
import Dashboard from './pages/Dashboard';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Utils
import { validateAccessCode, checkRateLimit } from './utils/auth';

// Styles
import './styles/index.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedSession = localStorage.getItem('helios-session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (session.expiresAt > Date.now()) {
          setUserSession(session);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('helios-session');
        }
      } catch (error) {
        localStorage.removeItem('helios-session');
      }
    }
    setLoading(false);
  }, []);

  const handleAuthentication = async (code) => {
    setLoading(true);

    try {
      // Validate access code
      const validation = await validateAccessCode(code);

      if (!validation.valid) {
        toast.error(validation.message || 'Invalid access code');
        setLoading(false);
        return false;
      }

      // Check rate limit
      const rateLimit = await checkRateLimit(code);

      if (!rateLimit.allowed) {
        toast.error(`Rate limit exceeded. Try again in ${rateLimit.resetTime} minutes.`);
        setLoading(false);
        return false;
      }

      // Create session
      const session = {
        accessCode: code,
        user: validation.user,
        permissions: validation.permissions,
        usageCount: rateLimit.usageCount,
        maxUsage: rateLimit.maxUsage,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        createdAt: Date.now()
      };

      localStorage.setItem('helios-session', JSON.stringify(session));
      setUserSession(session);
      setIsAuthenticated(true);

      toast.success(`Welcome ${validation.user.name}! Demo access granted.`);
      setLoading(false);
      return true;

    } catch (error) {
      toast.error('Authentication failed. Please try again.');
      setLoading(false);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('helios-session');
    setUserSession(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const getDemoUrl = () => {
    if (!userSession) return '#';

    // Now returns the backend API base URL since dashboard handles API calls internally
    const demoBaseUrl = process.env.REACT_APP_DEMO_URL || 'https://p8m2dfvub9.us-east-2.awsapprunner.com';
    return demoBaseUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            HELIOS
          </div>
          <div className="text-cyan-400">Loading...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#ffffff',
              border: '1px solid rgba(0, 245, 255, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#00f5ff',
                secondary: '#0f172a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff6b6b',
                secondary: '#0f172a',
              },
            },
          }}
        />

        <Navigation
          isAuthenticated={isAuthenticated}
          userSession={userSession}
          onLogout={handleLogout}
        />

        <main className="relative">
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  isAuthenticated={isAuthenticated}
                  userSession={userSession}
                  demoUrl={getDemoUrl()}
                />
              }
            />
            <Route
              path="/access"
              element={
                <DemoAccess
                  onAuthenticate={handleAuthentication}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard
                    userSession={userSession}
                    demoUrl={getDemoUrl()}
                  />
                ) : (
                  <DemoAccess onAuthenticate={handleAuthentication} />
                )
              }
            />
          </Routes>
        </main>

        <Footer />

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 245, 255, 0.15) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>
    </Router>
  );
};

export default App;