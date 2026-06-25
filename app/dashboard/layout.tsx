"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaShippingFast,
  FaBell,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaGlobe,
} from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const menuItems = [
    { icon: FaHome, label: "Dashboard", href: "/dashboard" },
    { icon: FaShippingFast, label: "Shipments", href: "/dashboard/shipments" },
    { icon: FaBell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: FaUser, label: "Profile", href: "/dashboard/profile" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {(sidebarOpen || isDesktop) && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed md:static inset-y-0 left-0 z-50 w-64 glass-effect md:block"
        >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <FaGlobe className="w-8 h-8 text-primary-600" />
                  <span className="text-xl font-bold gradient-text">GLE</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden text-gray-600 hover:text-primary-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer"
                      >
                        <IconComponent className="text-xl" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-gray-200 pt-4">
                <div className="px-4 py-3 mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
                >
                  <FaSignOutAlt />
                  <span className="font-medium">Sign Out</span>
                </motion.button>
              </div>
            </div>
          </motion.aside>
        )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="glass-effect sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-600 hover:text-primary-600"
            >
              <FaBars className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold gradient-text">
              Welcome, {session.user.name}!
            </h1>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
