"use client";

import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export default function DashboardPage() {
  const stats = [
    {
      label: "Active Shipments",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: <FaShippingFast className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Pending Pickups",
      value: "8",
      change: "-5%",
      trend: "down",
      icon: <FaBoxOpen className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "In Transit",
      value: "16",
      change: "+8%",
      trend: "up",
      icon: <FaTruck className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Delivered",
      value: "142",
      change: "+23%",
      trend: "up",
      icon: <FaCheckCircle className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const recentShipments = [
    {
      id: "TRK-2026-001",
      destination: "New York, USA",
      status: "In Transit",
      progress: 65,
      statusColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "TRK-2026-002",
      destination: "London, UK",
      status: "Pending",
      progress: 15,
      statusColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "TRK-2026-003",
      destination: "Tokyo, Japan",
      status: "Delivered",
      progress: 100,
      statusColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "TRK-2026-004",
      destination: "Sydney, Australia",
      status: "In Transit",
      progress: 45,
      statusColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-effect p-6 rounded-2xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}
              >
                {stat.icon}
              </div>
              <div
                className={`flex items-center space-x-1 ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                <span className="text-sm font-semibold">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Shipments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold gradient-text mb-6">
          Recent Shipments
        </h2>
        <div className="space-y-4">
          {recentShipments.map((shipment, index) => (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 5 }}
              className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {shipment.id}
                  </h3>
                  <p className="text-sm text-gray-600">{shipment.destination}</p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${shipment.bgColor} ${shipment.statusColor} mt-2 sm:mt-0`}
                >
                  {shipment.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shipment.progress}%` }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-effect p-6 rounded-2xl text-left group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <FaShippingFast className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">New Shipment</h3>
          <p className="text-sm text-gray-600">Create a new shipment request</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-effect p-6 rounded-2xl text-left group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <FaTruck className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Track Shipment</h3>
          <p className="text-sm text-gray-600">Track your shipment status</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-effect p-6 rounded-2xl text-left group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <FaCheckCircle className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">View Reports</h3>
          <p className="text-sm text-gray-600">Access shipping reports</p>
        </motion.button>
      </motion.div>
    </div>
  );
}
