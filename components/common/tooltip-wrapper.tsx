import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TooltipWrapperProps {
  children: React.ReactNode;
  tooltipText: string;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  tooltipText,
}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
