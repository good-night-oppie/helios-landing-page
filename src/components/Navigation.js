import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  Lock,
  BarChart3,
  LogOut,
  User,
  Clock,
  Shield,
  ExternalLink,
  Zap
} from 'lucide-react';

const Navigation = ({ isAuthenticated, userSession, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
      public: true
    },
    {
      name: 'Demo Access',
      path: '/access',
      icon: Lock,
      public: true,
      hideWhenAuthenticated: true
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: BarChart3,
      protected: true
    }
  ];

  const isCurrentPath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const filteredItems = navigationItems.filter(item => {
    if (item.protected && !isAuthenticated) return false;
    if (item.hideWhenAuthenticated && isAuthenticated) return false;
    return true;
  });

  const timeRemaining = userSession ? Math.max(0, userSession.expiresAt - Date.now()) : 0;
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Zap className="text-white" size={20} />
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                HELIOS
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const current = isCurrentPath(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                      current
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                    {current && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30"
                        initial={false}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* User Info & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Session Status */}
                  <div className="flex items-center space-x-3 px-3 py-2 bg-slate-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-emerald-400 font-medium">Active</span>
                    </div>
                    <div className="w-px h-4 bg-gray-600"></div>
                    <div className="flex items-center space-x-1 text-sm text-white">
                      <Clock size={14} />
                      <span className="font-mono">
                        {hoursRemaining > 0 ? `${hoursRemaining}h ${minutesRemaining}m` : `${minutesRemaining}m`}
                      </span>
                    </div>
                  </div>

                  {/* User Menu */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={16} />
                    </div>
                    <span className="text-sm text-gray-300 hidden lg:block">
                      {userSession?.user?.name || 'User'}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
                    title="Logout"
                  >
                    <LogOut size={18} />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/access"
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 group"
                >
                  <Lock size={18} />
                  <span>Demo Access</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-2">
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  const current = isCurrentPath(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
                        current
                          ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* Mobile User Section */}
                {isAuthenticated ? (
                  <div className="pt-4 mt-4 border-t border-gray-700 space-y-3">
                    <div className="flex items-center space-x-3 px-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {userSession?.user?.name || 'User'}
                        </p>
                        <p className="text-sm text-gray-400">
                          Session active
                        </p>
                      </div>
                    </div>

                    <div className="px-3 py-2 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Time remaining:</span>
                        <span className="font-mono text-white">
                          {hoursRemaining > 0 ? `${hoursRemaining}h ${minutesRemaining}m` : `${minutesRemaining}m`}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 mt-4 border-t border-gray-700">
                    <Link
                      to="/access"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold px-4 py-3 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-200"
                    >
                      <Lock size={18} />
                      <span>Demo Access</span>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;