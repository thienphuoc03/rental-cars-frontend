import React from 'react';

import { cn } from '@/lib/utils';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const TooltipCustom = ({
  children,
  content,
  className,
}: {
  children: React.ReactNode;
  content: any;
  className?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={cn(className)}>
          <div>{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCustom;
