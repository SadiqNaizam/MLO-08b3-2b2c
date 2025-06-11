import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Menu,
  Bell,
  Grid, // For the 9-square grid icon
  Maximize, // For fullscreen
  Moon, // For theme toggle (placeholder)
  Globe, // Placeholder for flag icon
  User, // Fallback icon
  Settings, // Icon for settings in dropdown
  LogOut,   // Icon for logout in dropdown
  LifeBuoy // Icon for help/support
} from 'lucide-react';

interface HeaderProps {
  className?: string;
  onToggleSidebar?: () => void; // Optional: if sidebar can be toggled
}

const Header: React.FC<HeaderProps> = ({ className, onToggleSidebar }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  return (
    <header
      className={cn(
        'h-16 flex items-center justify-between px-6 bg-card border-b border-border sticky top-0 z-50 shadow-header',
        className
      )}
    >
      <div className="flex items-center space-x-4">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden"> {/* Example: show on small screens */}
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 h-9 w-64 bg-background focus:bg-card"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Globe className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Grid className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">3</Badge>
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Maximize className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Moon className="h-5 w-5" /> {/* Theme toggle placeholder */}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-auto px-2 space-x-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://i.pravatar.cc/150?u=annaadame" alt="Anna Adame" />
                <AvatarFallback><User size={16}/></AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs font-medium text-foreground">Anna Adame</span>
                <span className="text-xs text-muted-foreground">Founder</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Anna Adame</p>
                <p className="text-xs leading-none text-muted-foreground">
                  anna.adame@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
