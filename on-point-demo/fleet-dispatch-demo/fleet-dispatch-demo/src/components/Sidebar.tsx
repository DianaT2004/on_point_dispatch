import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '../stores/authStore';
import { TruckIcon, PackageIcon, FileTextIcon, MapIcon, MessageSquareIcon, SettingsIcon, LogOutIcon } from 'lucide-react';

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
    <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <TruckIcon className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
        </div>
        <h1 className="text-xl font-headline font-bold text-foreground">FleetDispatch</h1>
      </div>

      <Separator className="bg-border" />

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 ${
                  isActive
                    ? 'bg-primary text-primary-foreground hover:bg-primary hover:opacity-90'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                } transition-all ease-in duration-150`}
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                <span className="font-normal">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-border" />

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-sm text-foreground capitalize">{user?.status || 'Online'}</span>
        </div>
        
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 text-foreground hover:bg-muted hover:text-foreground transition-all ease-in duration-150"
        >
          <LogOutIcon className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
