import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { HelpCircle } from 'lucide-react';

export const InfoTooltip = ({ content }: { content: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="cursor-pointer text-gray-500">
            <HelpCircle size={16} />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-56 text-center">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
