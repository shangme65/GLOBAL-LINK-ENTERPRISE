"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const shipments = [
    {
      id: "TRK-2026-001",
      origin: "Los Angeles, USA",
      destination: "New York, USA",
      status: "In Transit",
      weight: "25 kg",
      estimatedDelivery: "2026-06-28",
      progress: 65,
      statusColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "TRK-2026-002",
      origin: "Paris, France",
      destination: "London, UK",
      status: "Pending",
      weight: "15 kg",
      estimatedDelivery: "2026-06-30",
      progress: 15,
      statusColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "TRK-2026-003",
      origin: "Hong Kong",
      destination: "Tokyo, Japan",
      status: "Delivered",
      weight: "30 kg",
      estimatedDelivery: "2026-06-25",
      progress: 100,
      statusColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "TRK-2026-004",
      origin: "Dubai, UAE",
      destination: "Sydney, Australia",
      status: "In Transit",
      weight: "42 kg",
      estimatedDelivery: "2026-07-02",
      progress: 45,
      statusColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <h1 className="text-3xl font-bold gradient-text">My Shipments</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold shadow-lg flex items-center space-x-2"
        >
          <FaPlus />
          <span>New Shipment</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect p-6 rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tracking number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Shipments List */}
      <div className="grid gap-6">
        {shipments.map((shipment, index) => (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-effect p-6 rounded-2xl cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {shipment.id}
                </h3>
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Origin:</span>{" "}
                    {shipment.origin}
                  </div>
                  <div>
                    <span className="font-semibold">Destination:</span>{" "}
                    {shipment.destination}
                  </div>
                  <div>
                    <span className="font-semibold">Weight:</span>{" "}
                    {shipment.weight}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${shipment.bgColor} ${shipment.statusColor}`}
                >
                  {shipment.status}
                </span>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Est. Delivery</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span className="font-semibold">{shipment.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shipment.progress}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
