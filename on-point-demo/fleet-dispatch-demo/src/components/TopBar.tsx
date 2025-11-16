import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '../stores/authStore';
import { SearchIcon, BellIcon, MenuIcon } from 'lucide-react';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const user = useAuthStore((state) => state.user);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 lg:h-20 bg-white border-b-2 border-gray-100 z-30 px-4 lg:px-8 shadow-sm">
      <div className="h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-300"
          >
            <MenuIcon className="w-6 h-6" strokeWidth={1.5} />
          </Button>
          
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <Input
              type="search"
              placeholder="Search loads or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500 transition-colors duration-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-300"
          >
            <BellIcon className="w-6 h-6" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full shadow-sm animate-pulse" />
          </Button>

          <Avatar className="w-10 h-10 border-2 border-gray-200 shadow-sm hover:border-red-500 transition-colors duration-300">
            <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white font-medium">
              {user?.name?.split(' ').map((n) => n[0]).join('') || 'DG'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
