import { Outlet, Link, useLocation } from "react-router";
import { Ghost, Skull, Ticket, Map } from "lucide-react";
import { motion } from "motion/react";

export default function Root() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Ghost },
    { path: "/attractions", label: "Attractions", icon: Skull },
    { path: "/tickets", label: "Tickets", icon: Ticket },
    { path: "/map", label: "Map", icon: Map },
  ];

  return (
    <div className="min-h-screen bg-black text-red-50">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-red-950/20 to-black pointer-events-none" />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <motion.h1 
                className="text-3xl font-bold text-red-600"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-red-500">🎃</span> NIGHTMARE PARK
              </motion.h1>
            </Link>
            
            <nav className="flex gap-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path}>
                    <motion.div
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? "bg-red-900/50 text-red-400" 
                          : "hover:bg-red-950/30 text-red-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} />
                      <span>{link.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative bg-black border-t border-red-900/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-400/60">
            <p>Enter if you dare... Open Friday-Sunday, 7PM-Midnight</p>
            <p className="mt-2 text-sm">⚠️ Not recommended for children under 13</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
