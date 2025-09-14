import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Twitter,
  Globe,
  Mail,
  ExternalLink,
  Zap,
  Shield,
  Clock,
  Database,
  TrendingUp,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: 'Demo Access', href: '/access', internal: true },
      { name: 'Documentation', href: 'https://docs.oppie.xyz', external: true },
      { name: 'Performance Benchmarks', href: 'https://benchmarks.oppie.xyz', external: true },
      { name: 'API Reference', href: 'https://api.oppie.xyz', external: true }
    ],
    company: [
      { name: 'About oppie.xyz', href: 'https://oppie.xyz/about', external: true },
      { name: 'Blog', href: 'https://oppie.xyz/blog', external: true },
      { name: 'Careers', href: 'https://oppie.xyz/careers', external: true },
      { name: 'Contact', href: 'mailto:hello@oppie.xyz', external: true }
    ],
    legal: [
      { name: 'Privacy Policy', href: 'https://oppie.xyz/privacy', external: true },
      { name: 'Terms of Service', href: 'https://oppie.xyz/terms', external: true },
      { name: 'Cookie Policy', href: 'https://oppie.xyz/cookies', external: true },
      { name: 'Security', href: 'https://oppie.xyz/security', external: true }
    ]
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/good-night-oppie',
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/oppie_xyz',
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Website',
      href: 'https://oppie.xyz',
      icon: Globe,
      color: 'hover:text-cyan-400'
    },
    {
      name: 'Email',
      href: 'mailto:hello@oppie.xyz',
      icon: Mail,
      color: 'hover:text-purple-400'
    }
  ];

  const stats = [
    { icon: Clock, value: '<70μs', label: 'VST Commits' },
    { icon: Database, value: '1000x', label: 'Memory Efficiency' },
    { icon: TrendingUp, value: '500x', label: 'Performance' },
    { icon: Shield, value: '99.9%', label: 'Reliability' }
  ];

  return (
    <footer className="relative bg-slate-900/60 backdrop-blur-xl border-t border-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 245, 255, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  HELIOS
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Experience the future of parallel state management with Helios Parallel Universe Engine.
                Revolutionary VST technology delivering unprecedented performance gains.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-slate-800/30 rounded-lg p-3 border border-gray-700/50"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon className="text-cyan-400" size={16} />
                        <span className="font-mono font-bold text-cyan-400 text-sm">
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-slate-800/50 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 group`}
                      title={social.name}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {links.product.map((link) => (
                  <li key={link.name}>
                    {link.internal ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 group"
                      >
                        <span>{link.name}</span>
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 group"
                    >
                      <span>{link.name}</span>
                      {link.external && (
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {links.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <p>
              © {currentYear} oppie.xyz. All rights reserved.
            </p>
            <div className="hidden md:flex items-center space-x-2">
              <span>Made with</span>
              <Heart className="text-red-400" size={14} fill="currentColor" />
              <span>for parallel computing</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
            <div className="hidden sm:block">
              <span>Powered by Helios Engine v2.1.0</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;