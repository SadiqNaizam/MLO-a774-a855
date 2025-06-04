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
import {
  Menu,
  Search,
  Bell,
  Grid3X3,
  Maximize2,
  // Moon, // Theme toggle can be added later if needed
  Settings,
  LogOut,
  User,
  Globe,
  MessageSquare
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullScreen(true)).catch(err => console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullScreen(false)).catch(err => console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`));
      }
    }
  };

  return (
    <header className={cn(
      "fixed top-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-30",
      "lg:left-64 left-0 transition-all duration-300 ease-in-out" // Adjust left based on lg breakpoint for sidebar
    )}>
      {/* Left Side: Sidebar Toggle & Search */} 
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="relative hidden sm:block"> {/* Hide search on very small screens or adjust as needed */} 
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 w-64 bg-background" />
        </div>
      </div>

      {/* Right Side: Actions & User Profile */} 
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Language Selector - Placeholder */} 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" /> {/* Placeholder for flag icon */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
            <DropdownMenuItem>French</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="hidden sm:inline-flex"> {/* Hide on xs screens */} 
          <Grid3X3 className="h-5 w-5" />
        </Button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">New message</p>
                        <p className="text-xs text-muted-foreground">From John Doe, 5 mins ago</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-2">
                    <MessageSquare className="h-8 w-8 text-blue-500 mt-1" />
                     <div>
                        <p className="text-sm font-medium">Your order is shipped</p>
                        <p className="text-xs text-muted-foreground">Order #12345, 1 hour ago</p>
                    </div>
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-primary hover:underline cursor-pointer">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={toggleFullScreen}  className="hidden sm:inline-flex"> {/* Hide on xs screens */} 
          <Maximize2 className="h-5 w-5" />
        </Button>

        {/* <Button variant="ghost" size="icon">
          <Moon className="h-5 w-5" />
        </Button> */} 
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="Anna Adame" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
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
