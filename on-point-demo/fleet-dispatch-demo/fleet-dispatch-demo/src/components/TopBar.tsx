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
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 lg:h-20 bg-card border-b border-border z-30 px-4 lg:px-8">
      <div className="h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground hover:bg-muted hover:text-foreground"
          >
            <MenuIcon className="w-6 h-6" strokeWidth={1.5} />
          </Button>
          
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            <Input
              type="search"
              placeholder="SearchIcon loads or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background text-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground hover:bg-muted hover:text-foreground"
          >
            <BellIcon className="w-6 h-6" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>

          <Avatar className="w-10 h-10 border-2 border-border">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground font-medium">
              {user?.name?.split(' ').map((n) => n[0]).join('') || 'JD'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
