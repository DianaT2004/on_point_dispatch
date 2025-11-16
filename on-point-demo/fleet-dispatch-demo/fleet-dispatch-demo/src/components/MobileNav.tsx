import { Link, useLocation } from 'react-router-dom';
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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-40">
      <div className="h-full flex items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ease-in duration-150 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-xs font-normal">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
