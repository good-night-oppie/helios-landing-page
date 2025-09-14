import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Lock,
  Shield,
  Clock,
  ArrowRight,
  Eye,
  EyeOff,
  Zap,
  Database,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const DemoAccess = ({ onAuthenticate, isAuthenticated }) => {
  const [accessCode, setAccessCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessCode.trim()) {
      toast.error('Please enter an access code');
      return;
    }

    if (accessCode.length < 8) {
      toast.error('Access code must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const success = await onAuthenticate(accessCode);
      if (success) {
        // Success toast will be handled by parent component
        // Navigate to dashboard handled by parent's state change
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Clock, value: '<70μs', label: 'VST Commit Latency', color: 'text-cyan-400' },
    { icon: Database, value: '1000x', label: 'Memory Efficiency', color: 'text-purple-400' },
    { icon: TrendingUp, value: '500x', label: 'Performance Gain', color: 'text-pink-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 245, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              HELIOS
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              Demo Access
            </h1>
            <p className="text-gray-400">
              Enter your access code to experience the Parallel Universe Engine
            </p>
          </motion.div>

          {/* Access Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Access Code Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Access Code
                </label>
                <div className="relative">
                  <input
                    type={showCode ? 'text' : 'password'}
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter your access code..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    disabled={loading}
                  >
                    {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start space-x-3">
                <AlertTriangle className="text-amber-400 mt-0.5" size={16} />
                <div className="text-sm text-amber-300">
                  <p className="font-medium mb-1">Limited Access</p>
                  <p className="text-amber-400/80">
                    Demo access includes rate limiting. Sessions expire after 24 hours.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !accessCode.trim()}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    <span>Access Demo</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Features Preview */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-sm font-medium text-gray-300 mb-4 flex items-center">
                <Shield className="mr-2" size={16} />
                What you'll experience:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <Icon className={`${stat.color}`} size={16} />
                      <span className="font-mono font-semibold text-white">
                        {stat.value}
                      </span>
                      <span className="text-gray-400">{stat.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 space-y-4"
          >
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <button
                onClick={() => window.history.back()}
                className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
              >
                <ArrowRight className="rotate-180" size={16} />
                <span>Back to Home</span>
              </button>
              <span className="w-px h-4 bg-gray-600"></span>
              <a
                href="mailto:demo@oppie.xyz"
                className="hover:text-cyan-400 transition-colors"
              >
                Need Access Code?
              </a>
            </div>

            <p className="text-xs text-gray-500">
              Helios Parallel Universe Engine © 2024 oppie.xyz
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoAccess;