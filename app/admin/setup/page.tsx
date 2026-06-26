"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaEnvelope,
  FaKey,
  FaUser,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaArrowRight,
  FaTrash,
} from "react-icons/fa";
import Link from "next/link";

export default function AdminSetupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [adminInitialized, setAdminInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    checkAdminInitialization();
  }, []);

  const checkAdminInitialization = async () => {
    try {
      const response = await fetch("/api/admin/init");
      const data = await response.json();
      setAdminInitialized(data.initialized);
    } catch (error) {
      console.error("Error checking admin status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInitializeAdmin = async () => {
    setInitializing(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/init", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize admin account");
      }

      setSuccess("Admin account created successfully! Logging you in...");
      setAdminInitialized(true);

      // Auto-login with the credentials
      if (data.credentials) {
        const result = await signIn("credentials", {
          email: data.credentials.email,
          password: data.credentials.password,
          redirect: false,
        });

        if (result?.ok) {
          setTimeout(() => {
            router.push("/admin/dashboard");
          }, 1500);
        } else {
          setError("Account created but auto-login failed. Please login manually.");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to initialize admin account");
    } finally {
      setInitializing(false);
    }
  };

  const handleDeleteAdmin = async () => {
    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/init", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete admin account");
      }

      setSuccess("Admin account deleted successfully! Logging out...");
      setAdminInitialized(false);

      // Sign out and redirect to home
      setTimeout(async () => {
        await signOut({ redirect: false });
        router.push("/");
      }, 2000);
    } catch (error: any) {
      setError(error.message || "Failed to delete admin account");
    } finally {
      setDeleting(false);
      setShowConfirmDelete(false);
    }
  };

  const isAdmin = status === "authenticated" && (session?.user as any)?.role === "ADMIN";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <FaSpinner className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 py-6 sm:py-8 md:py-12 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-block p-4 sm:p-5 md:p-6 bg-purple-100 rounded-3xl mb-4 sm:mb-6"
          >
            <FaShieldAlt className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-purple-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
          >
            Admin <span className="text-purple-600">Setup</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-sm sm:text-base md:text-lg"
          >
            Initialize and manage your super admin account
          </motion.p>

          {/* Authenticated Badge */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium"
            >
              <FaCheckCircle className="text-sm sm:text-base" />
              Authenticated as Admin
            </motion.div>
          )}
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Initialize Section */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-xl flex-shrink-0">
                <FaShieldAlt className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                  Initialize Origin Admin
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Create or update the super admin account using credentials from your environment configuration.
                </p>
              </div>
            </div>

            {/* Environment Variables */}
            <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <FaKey className="text-purple-600 text-sm sm:text-base" />
                <h3 className="font-semibold text-purple-900 text-sm sm:text-base">Required Environment Variables</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                  <FaEnvelope className="text-purple-600 flex-shrink-0 text-xs sm:text-sm" />
                  <code className="text-xs sm:text-sm font-mono bg-white px-2 sm:px-3 py-1 rounded">ORIGIN_ADMIN_EMAIL</code>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                  <FaKey className="text-purple-600 flex-shrink-0 text-xs sm:text-sm" />
                  <code className="text-xs sm:text-sm font-mono bg-white px-2 sm:px-3 py-1 rounded">ORIGIN_ADMIN_PASSWORD</code>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                  <FaUser className="text-purple-600 flex-shrink-0 text-xs sm:text-sm" />
                  <code className="text-xs sm:text-sm font-mono bg-white px-2 sm:px-3 py-1 rounded">ORIGIN_ADMIN_NAME</code>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
              >
                <FaExclamationTriangle className="flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4"
              >
                <FaCheckCircle className="flex-shrink-0 mt-0.5" />
                <span className="text-sm">{success}</span>
              </motion.div>
            )}

            {/* Initialize Button */}
            <motion.button
              onClick={handleInitializeAdmin}
              disabled={initializing || adminInitialized}
              whileHover={{ scale: initializing || adminInitialized ? 1 : 1.02 }}
              whileTap={{ scale: initializing || adminInitialized ? 1 : 0.98 }}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
            >
              {initializing ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Initializing Admin...
                </>
              ) : adminInitialized ? (
                <>
                  <FaCheckCircle />
                  Admin Already Initialized
                </>
              ) : (
                <>
                  <FaShieldAlt />
                  Initialize Admin
                  <FaArrowRight />
                </>
              )}
            </motion.button>
          </div>

          {/* Delete Section */}
          {adminInitialized && isAdmin && (
            <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-red-50 to-orange-50">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-red-100 rounded-xl flex-shrink-0">
                  <FaTrash className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    Danger Zone
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Permanently delete the admin account and all associated data. This action cannot be undone.
                  </p>
                </div>
              </div>

              {!showConfirmDelete ? (
                <motion.button
                  onClick={() => setShowConfirmDelete(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
                >
                  <FaTrash />
                  Remove Origin Admin
                </motion.button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white border-2 border-red-300 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-red-900 font-semibold mb-2 text-sm sm:text-base">Are you absolutely sure?</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      This will delete the admin account, all shipments, notifications, and tracking history.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      onClick={() => setShowConfirmDelete(false)}
                      className="py-2.5 sm:py-3 px-3 sm:px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAdmin}
                      disabled={deleting}
                      className="py-2.5 sm:py-3 px-3 sm:px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                    >
                      {deleting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <FaTrash />
                          Confirm Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Footer Links */}
        <div className="mt-6 sm:mt-8 text-center space-y-2">
          {isAdmin ? (
            <Link
              href="/admin/dashboard"
              className="inline-block text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base"
            >
              ← Back to Dashboard
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-block text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base"
            >
              ← Back to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
