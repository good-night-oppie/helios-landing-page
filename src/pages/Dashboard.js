import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Clock,
  Database,
  TrendingUp,
  ExternalLink,
  Shield,
  Activity,
  Zap,
  Globe,
  BarChart3,
  Settings,
  LogOut,
  CheckCircle,
  AlertCircle,
  Timer,
  Cpu
} from 'lucide-react';

const Dashboard = ({ userSession, demoUrl }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeRemaining = userSession ? Math.max(0, userSession.expiresAt - Date.now()) : 0;
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  const usagePercentage = userSession ?
    Math.min(100, (userSession.usageCount / userSession.maxUsage) * 100) : 0;

  const stats = [
    {
      icon: Clock,
      title: 'VST Commit Latency',
      value: '<70μs',
      description: 'Ultra-fast state transitions',
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-400'
    },
    {
      icon: Database,
      title: 'Memory Efficiency',
      value: '1000x',
      description: 'Compared to traditional state management',
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-400'
    },
    {
      icon: TrendingUp,
      title: 'Performance Gain',
      value: '500x',
      description: 'Faster than conventional approaches',
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-400'
    },
    {
      icon: Cpu,
      title: 'Active Universes',
      value: '42',
      description: 'Parallel state branches',
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Real-time Performance Monitoring',
      description: 'Track VST operations and commit latencies in real-time'
    },
    {
      icon: Globe,
      title: 'Parallel Universe Management',
      description: 'Create, merge, and manage multiple state branches'
    },
    {
      icon: Activity,
      title: 'Memory Analytics',
      description: 'Visualize COW memory optimizations and efficiency gains'
    },
    {
      icon: BarChart3,
      title: 'Performance Benchmarks',
      description: 'Compare against traditional state management approaches'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-gray-800 bg-slate-900/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                HELIOS
              </div>
              <div className="w-px h-6 bg-gray-600"></div>
              <div>
                <h1 className="text-lg font-semibold text-white">Demo Dashboard</h1>
                <p className="text-sm text-gray-400">
                  Welcome, {userSession?.user?.name || 'User'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Session Status */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg">
                <CheckCircle className="text-emerald-400" size={16} />
                <span className="text-sm text-emerald-400 font-medium">Active Session</span>
              </div>

              {/* Time Remaining */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg">
                <Timer className="text-amber-400" size={16} />
                <span className="text-sm text-white font-mono">
                  {hoursRemaining}h {minutesRemaining}m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Demo Access Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 rounded-2xl p-8 mb-8 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Experience the Parallel Universe Engine
              </h2>
              <p className="text-gray-300 mb-4 max-w-2xl">
                Access the live Helios demo featuring real-time VST operations,
                parallel universe management, and performance analytics.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield size={16} />
                  <span>Secure Session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity size={16} />
                  <span>Real-time Monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe size={16} />
                  <span>Interactive Demo</span>
                </div>
              </div>
            </div>
            <div>
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 group shadow-lg hover:shadow-cyan-500/25"
              >
                <span>Launch Demo</span>
                <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Usage Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <User className="mr-2 text-cyan-400" size={20} />
            Session Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Access Code</p>
              <p className="font-mono text-white">
                {userSession?.accessCode?.slice(0, 4) + '••••••••'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Usage</p>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
                <span className="text-sm font-mono text-white">
                  {userSession?.usageCount || 0}/{userSession?.maxUsage || 100}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Session Expires</p>
              <p className="text-white flex items-center space-x-2">
                <Clock size={16} className="text-amber-400" />
                <span className="font-mono">
                  {hoursRemaining > 0 ? `${hoursRemaining}h ${minutesRemaining}m` : `${minutesRemaining}m`}
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-slate-900/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-10 mb-4`}>
                  <Icon className={stat.textColor} size={24} />
                </div>
                <h4 className="font-semibold text-white mb-2">{stat.title}</h4>
                <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>
                  {stat.value}
                </div>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Demo Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

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
  );
};

export default Dashboard;