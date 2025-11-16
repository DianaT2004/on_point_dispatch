import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '../stores/authStore';
import { TruckIcon, PackageIcon, FileTextIcon, MapIcon, MessageSquareIcon, SettingsIcon, LogOutIcon, User } from 'lucide-react';

const navItems = [
  { path: '/loads', label: 'Loads Feed', icon: PackageIcon },
  { path: '/services', label: 'Services', icon: TruckIcon },
  { path: '/documents', label: 'Documents', icon: FileTextIcon },
  { path: '/map', label: 'Maps', icon: MapIcon },
  { path: '/chat', label: 'Chat', icon: MessageSquareIcon },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuthStore();

  return (
    <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r-2 border-gray-100 z-40 shadow-sm">
      {/* Logo */}
      <motion.div 
        className="p-6 flex items-center justify-center border-b-2 border-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/images/onpoint-logo.jpg" 
          alt="OnPoint" 
          className="h-12 w-auto"
        />
      </motion.div>

      <Separator className="bg-gray-200" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link to={item.path}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  {/* Animated background on hover for inactive items */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId="navbar-hover"
                    />
                  )}
                  
                  <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} strokeWidth={1.5} />
                  <span className={`font-medium relative z-10 ${isActive ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full"
                      layoutId="navbar-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <Separator className="bg-gray-200" />

      {/* User Profile */}
      <motion.div 
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold shadow-lg">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'Dachi Ghambashidze'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'dachi@onpoint.ge'}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 font-medium shadow-sm hover:shadow-lg hover:shadow-red-500/30 group"
        >
          <LogOutIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          <span className="font-medium">Logout</span>
        </Button>
      </motion.div>
    </aside>
  );
}
