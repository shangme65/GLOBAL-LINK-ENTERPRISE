"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaUsers,
  FaBoxes,
  FaBell,
  FaChartLine,
  FaHome,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import Link from "next/link";

interface AdminStats {
  totalUsers: number;
  totalShipments: number;
  pendingShipments: number;
  totalNotifications: number;
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminInitialized, setAdminInitialized] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const [initError, setInitError] = useState("");
  const [initSuccess, setInitSuccess] = useState(false);

  useEffect(() => {
    checkAdminInitialization();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      // Don't redirect if admin not initialized - allow access to init button
      if (adminInitialized) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
      return;
    }

    if (status === "authenticated") {
      // Check if user is admin
      if ((session?.user as any)?.role !== "ADMIN") {
        setLoading(false);
        return;
      }

      // Load admin stats
      loadAdminStats();
    }
  }, [status, session, router, adminInitialized]);

  const checkAdminInitialization = async () => {
    try {
      const response = await fetch("/api/admin/init");
      const data = await response.json();
      setAdminInitialized(data.initialized);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const handleInitializeAdmin = async () => {
    setInitializing(true);
    setInitError("");
    setInitSuccess(false);

    try {
      const response = await fetch("/api/admin/init", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize admin account");
      }

      setInitSuccess(true);
      setAdminInitialized(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/auth/login?admin=initialized");
      }, 2000);
    } catch (error: any) {
      setInitError(error.message || "Failed to initialize admin account");
    } finally {
      setInitializing(false);
    }
  };

  const loadAdminStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error loading admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Admin not initialized - show initialization page
  if (!adminInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full glass-effect p-8 rounded-2xl text-center"
        >
          {initSuccess ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Admin Account Initialized!
              </h2>
              <p className="text-gray-600 mb-4">
                Redirecting to login page...
              </p>
            </>
          ) : (
            <>
              <FaUserShield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold gradient-text mb-4">
                Initialize Admin Account
              </h1>
              <p className="text-gray-600 mb-6">
                No admin account exists yet. Click the button below to create the
                admin account using credentials from your .env file.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-left">
                <p className="font-semibold text-blue-800 mb-2">
                  Required Environment Variables:
                </p>
                <ul className="text-blue-700 space-y-1">
                  <li>• ADMIN_EMAIL</li>
                  <li>• ADMIN_PASSWORD (min 8 characters)</li>
                  <li>• ADMIN_NAME (optional)</li>
                </ul>
              </div>

              {initError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4 flex items-start gap-2"
                >
                  <FaExclamationTriangle className="flex-shrink-0 mt-0.5" />
                  <span className="text-left">{initError}</span>
                </motion.div>
              )}

              <motion.button
                onClick={handleInitializeAdmin}
                disabled={initializing}
                whileHover={{ scale: initializing ? 1 : 1.02 }}
                whileTap={{ scale: initializing ? 1 : 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {initializing ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Initializing Admin...
                  </>
                ) : (
                  <>
                    <FaUserShield />
                    Initialize Admin Account
                  </>
                )}
              </motion.button>

              <div className="mt-6 text-center text-sm text-gray-600">
                <Link
                  href="/"
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  ← Back to Home
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <FaSpinner className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </motion.div>
      </div>
    );
  }

  // Not admin - show access denied page
  if ((session?.user as any)?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-effect p-8 rounded-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaUserShield className="w-10 h-10 text-red-600" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You do not have permission to access the admin dashboard. This area
            is restricted to administrators only.
          </p>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <FaHome />
              Go to Home Page
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Admin dashboard
  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: FaUsers,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Shipments",
      value: stats?.totalShipments || 0,
      icon: FaBoxes,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Shipments",
      value: stats?.pendingShipments || 0,
      icon: FaChartLine,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Notifications",
      value: stats?.totalNotifications || 0,
      icon: FaBell,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Header */}
      <div className="glass-effect border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaUserShield className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {session?.user?.name}
                </p>
              </div>
            </div>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <FaHome />
                Home
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
                >
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {card.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link href="/admin/users">
                <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <FaUsers className="text-primary-600" />
                  <span className="font-medium">Manage Users</span>
                </button>
              </Link>
              <Link href="/admin/shipments">
                <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <FaBoxes className="text-primary-600" />
                  <span className="font-medium">Manage Shipments</span>
                </button>
              </Link>
              <Link href="/admin/notifications">
                <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <FaBell className="text-primary-600" />
                  <span className="font-medium">Send Notifications</span>
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Recent Activity
            </h2>
            <div className="text-center py-8 text-gray-500">
              <FaChartLine className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Activity monitoring coming soon...</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
