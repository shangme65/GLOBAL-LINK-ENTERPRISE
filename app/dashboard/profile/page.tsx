"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { FaUser, FaEnvelope, FaBuilding, FaPhone, FaMapMarkerAlt, FaSave } from "react-icons/fa";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    company: "",
    phone: "",
    address: "",
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    setEditing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold gradient-text">Profile Settings</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (editing ? handleSave() : setEditing(true))}
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold shadow-lg flex items-center space-x-2"
        >
          <FaSave />
          <span>{editing ? "Save Changes" : "Edit Profile"}</span>
        </motion.button>
      </motion.div>

      {/* Profile Picture */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-effect p-8 rounded-2xl text-center"
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-5xl font-bold mx-auto mb-4">
          {session?.user?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {session?.user?.name}
        </h2>
        <p className="text-gray-600">{session?.user?.email}</p>
      </motion.div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect p-8 rounded-2xl"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!editing}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!editing}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                disabled={!editing}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!editing}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                disabled={!editing}
                rows={3}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Account Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="glass-effect p-6 rounded-2xl text-center">
          <div className="text-3xl font-bold gradient-text mb-2">142</div>
          <p className="text-gray-600">Total Shipments</p>
        </div>
        <div className="glass-effect p-6 rounded-2xl text-center">
          <div className="text-3xl font-bold gradient-text mb-2">24</div>
          <p className="text-gray-600">Active Shipments</p>
        </div>
        <div className="glass-effect p-6 rounded-2xl text-center">
          <div className="text-3xl font-bold gradient-text mb-2">98.5%</div>
          <p className="text-gray-600">Success Rate</p>
        </div>
      </motion.div>
    </div>
  );
}
