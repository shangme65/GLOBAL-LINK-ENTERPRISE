"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaShippingFast, FaShieldAlt, FaGlobe, FaChartLine, FaClock, FaLock } from "react-icons/fa";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features = [
    {
      icon: <FaShippingFast className="w-8 h-8" />,
      title: "Real-Time Tracking",
      description: "Track your shipments in real-time with GPS precision and instant updates.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Advanced Security",
      description: "Military-grade encryption and security protocols to protect your cargo.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaGlobe className="w-8 h-8" />,
      title: "Global Coverage",
      description: "Worldwide shipping network with presence in over 180 countries.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and analytics for your shipping operations.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your shipping needs.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <FaLock className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Multiple payment options with bank-level security standards.",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const stats = [
    { value: "500K+", label: "Shipments Delivered" },
    { value: "180+", label: "Countries Covered" },
    { value: "99.9%", label: "On-Time Delivery" },
    { value: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 glass-effect"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <FaGlobe className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold gradient-text">
                Global Link Enterprise
              </span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">
                About
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="gradient-text">Secure & Efficient</span>
              <br />
              <span className="text-gray-800">Global Shipping Solutions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Experience the future of logistics with our advanced security and real-time tracking platform. 
              Ship with confidence across the globe.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg text-lg font-semibold shadow-xl"
                >
                  Start Shipping Now
                </motion.button>
              </Link>
              <Link href="#features">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-effect text-gray-700 rounded-lg text-lg font-semibold"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-effect p-6 rounded-xl text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for secure and efficient shipping
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect p-8 rounded-2xl group cursor-pointer"
              >
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 mb-6 text-white`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:gradient-text transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-effect p-12 rounded-3xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Ready to Transform Your Shipping?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses that trust Global Link Enterprise
          </p>
          <Link href="/auth/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg text-lg font-semibold shadow-xl"
            >
              Create Free Account
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="glass-effect py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2026 Global Link Enterprise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
