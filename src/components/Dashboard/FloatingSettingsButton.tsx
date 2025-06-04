import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FloatingSettingsButtonProps {
  className?: string;
  onClick?: () => void;
}

const FloatingSettingsButton: React.FC<FloatingSettingsButtonProps> = ({
  className,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log('Floating settings button clicked');
      // Implement default action, e.g., open a settings modal or panel
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className={cn(
              'fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50',
              'bg-primary hover:bg-primary/90 text-primary-foreground',
              className
            )}
            onClick={handleClick}
          >
            <Settings className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingSettingsButton;
