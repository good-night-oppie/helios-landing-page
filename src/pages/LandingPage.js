import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap,
  Database,
  Activity,
  Globe,
  ArrowRight,
  Play,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Cpu,
  BarChart3
} from 'lucide-react';

const LandingPage = ({ isAuthenticated, userSession, demoUrl }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { icon: Clock, value: '<70μs', label: 'VST Commit Latency', color: 'text-yellow-400' },
    { icon: Database, value: '1000x', label: 'Memory Efficiency', color: 'text-blue-400' },
    { icon: TrendingUp, value: '500x', label: 'Performance Gain', color: 'text-green-400' },
    { icon: Activity, value: '100+', label: 'Universes/100ms', color: 'text-purple-400' }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Ultra-Fast VST Operations',
      description: 'Virtual State Tree commits in under 70 microseconds with copy-on-write optimization.',
      metrics: 'Target: <70μs achieved',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Database,
      title: 'Revolutionary Memory Efficiency',
      description: '1000x memory improvement over traditional approaches through advanced COW semantics.',
      metrics: '50GB vs 50TB traditional',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Parallel Universe Management',
      description: 'Create, manage, and operate thousands of parallel universes simultaneously.',
      metrics: '10,000+ universes supported',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Cpu,
      title: 'Massive Performance Gains',
      description: 'Execute in 10 minutes what traditionally takes 83 hours through intelligent parallelization.',
      metrics: '500x faster execution',
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  const useCases = [
    {
      title: 'State Management',
      description: 'Revolutionary approach to application state with automatic optimization',
      icon: BarChart3
    },
    {
      title: 'Simulation Systems',
      description: 'Run multiple scenarios simultaneously with minimal resource overhead',
      icon: Globe
    },
    {
      title: 'Real-time Analytics',
      description: 'Process massive datasets with unprecedented efficiency',
      icon: Activity
    }
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="text-center z-10 px-4 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                HELIOS
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-4">
              Parallel Universe Engine
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Experience revolutionary state management with{' '}
              <span className="text-cyan-400 font-semibold">1000x memory efficiency</span>,{' '}
              <span className="text-purple-400 font-semibold">500x performance gains</span>, and{' '}
              <span className="text-pink-400 font-semibold">&lt;70μs VST commits</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {isAuthenticated ? (
              <motion.a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Launch Interactive Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.a>
            ) : (
              <Link to="/access">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Request Demo Access
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
                </motion.button>
              </Link>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gray-600 rounded-full font-semibold text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
            >
              View Documentation
            </motion.button>
          </motion.div>

          {/* Authentication Status */}
          {isAuthenticated && userSession && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">
                Demo Access Active - {userSession.user?.name || 'User'}
              </span>
              <span className="text-green-300 text-sm">
                ({userSession.maxUsage - userSession.usageCount} uses remaining)
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Performance Metrics
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Breakthrough performance numbers that redefine what's possible in parallel computing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-cyan-500/50 transition-all duration-300">
                  <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Revolutionary Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Advanced capabilities that push the boundaries of parallel computing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className={`text-sm font-mono bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent font-semibold`}>
                    {feature.metrics}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Use Cases
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real-world applications where Helios delivers transformative results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {useCase.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Experience the Future?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join the revolution in parallel computing. Experience 1000x memory efficiency
            and 500x performance gains with our interactive demo.
          </p>

          {isAuthenticated ? (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
            >
              <Play className="w-6 h-6" />
              Launch Demo Now
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          ) : (
            <Link to="/access">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <Shield className="w-6 h-6" />
                Get Demo Access
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          )}

          {!isAuthenticated && (
            <p className="text-gray-400 mt-6 text-sm">
              Limited access codes available • Rate limited for optimal performance
            </p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;