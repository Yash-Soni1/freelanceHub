import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Search,
  ShoppingCart,
  MessageSquare,
  Star,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ClientSidebarProps {
  onToggle: (collapsed: boolean) => void;
}

const ClientSidebar = ({ onToggle }: ClientSidebarProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showText, setShowText] = useState(true);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle(newState);

    if (newState) {
      setShowText(false);
    } else {
      setTimeout(() => setShowText(true), 300);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const menuItems = [
    { path: "/dashboard", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { path: "/browse-gigs", label: "Browse Gigs", icon: <Search size={20} /> },
    { path: "/dashboard/orders", label: "My Orders", icon: <ShoppingCart size={20} /> },
    { path: "/dashboard/messages", label: "Messages", icon: <MessageSquare size={20} /> },
    { path: "/dashboard/reviews", label: "Reviews", icon: <Star size={20} /> },
    { path: "/dashboard/settings", label: "Settings & Profile", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } min-h-screen border-r-2 border-black p-4 fixed left-0 top-0 bg-gray-100 z-40 transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center mb-6">
        <AnimatePresence>
          {!isCollapsed && showText && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold"
            >
              Client Panel
            </motion.h2>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleSidebar}
          className="border-2 border-black"
        >
          {isCollapsed ? <Menu size={22} /> : <X size={22} />}
        </Button>
      </div>

      {/* Menu */}
      <nav className="space-y-2 flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={item.path}>
              <Button
                variant={`${isActive ? "secondary" : "brutal"}`}
                className={`w-full justify-start border-2 border-black transition-all duration-200 flex items-center gap-3 ${
                  isActive ? "bg-black text-white" : ""
                }`}
              >
                {item.icon}
                <AnimatePresence>
                  {!isCollapsed && showText && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Link>
          );
        })}

        {/* Logout */}
        <Button
          variant="destructive"
          className="w-full justify-start mt-4 text-white flex items-center gap-3"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <AnimatePresence>
            {!isCollapsed && showText && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </nav>
    </aside>
  );
};

export default ClientSidebar;
