import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PackageIcon, TruckIcon, FileTextIcon, MapIcon, MessageSquareIcon } from 'lucide-react';

const navItems = [
  { path: '/loads', label: 'Loads', icon: PackageIcon },
  { path: '/services', label: 'Services', icon: TruckIcon },
  { path: '/documents', label: 'Docs', icon: FileTextIcon },
  { path: '/map', label: 'Map', icon: MapIcon },
  { path: '/chat', label: 'Chat', icon: MessageSquareIcon },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t-2 border-gray-100 z-40 shadow-lg">
      <div className="h-full flex items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 min-w-[60px] relative ${
                isActive
                  ? 'text-red-600'
                  : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <motion.div
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
              <span className={`text-xs font-medium transition-all duration-300 ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
