"use client";

import { motion } from "framer-motion";
import { FaBell, FaCheck, FaInfoCircle, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Shipment Delivered",
      message: "Your shipment TRK-2026-003 has been successfully delivered.",
      time: "2 hours ago",
      read: false,
      icon: <FaCheckCircle />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 2,
      type: "info",
      title: "Shipment Update",
      message: "TRK-2026-001 is now in transit and expected to arrive by June 28.",
      time: "5 hours ago",
      read: false,
      icon: <FaInfoCircle />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      type: "warning",
      title: "Delivery Delay",
      message: "TRK-2026-004 may experience a slight delay due to weather conditions.",
      time: "1 day ago",
      read: true,
      icon: <FaExclamationTriangle />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 4,
      type: "info",
      title: "New Feature Available",
      message: "Check out our new real-time GPS tracking feature!",
      time: "2 days ago",
      read: true,
      icon: <FaInfoCircle />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold gradient-text">Notifications</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaCheck />
          <span>Mark all as read</span>
        </motion.button>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className={`glass-effect p-6 rounded-2xl cursor-pointer ${
              !notification.read ? "border-l-4 border-primary-500" : ""
            }`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${notification.color} text-white flex-shrink-0`}
              >
                <div className="w-6 h-6">{notification.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className={`font-semibold text-gray-800 ${
                      !notification.read ? "font-bold" : ""
                    }`}
                  >
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {notification.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{notification.message}</p>
              </div>
              {!notification.read && (
                <div className="w-3 h-3 bg-primary-600 rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State (if no notifications) */}
      {notifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-12 rounded-2xl text-center"
        >
          <FaBell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No notifications
          </h3>
          <p className="text-gray-500">
            You're all caught up! Check back later for updates.
          </p>
        </motion.div>
      )}
    </div>
  );
}
