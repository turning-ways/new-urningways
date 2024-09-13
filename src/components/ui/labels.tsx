import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";

//  This is a component that displays tag labels but with a twist. It can display a maximum of 3 tags and if there are more than 3 tags, it will display the number of hidden tags in a tooltip.
//  The component uses colors to differentiate the tags. The colors are gotten from the prop
// it has variants for sizing and border thickness of the tags

const labelVariants = cva("flex", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    border: {
      thin: "border",
      thick: "border-2",
    },
  },
  defaultVariants: {
    size: "md",
    border: "thin",
  },
});

export interface LabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof labelVariants> {
  label: string;
  color: string;
  id?: string;
  shouldDelete?: boolean;
  deleteFn?: Function;
}

const Label = ({
  id,
  className,
  label,
  color,
  size,
  border,
  shouldDelete,
  deleteFn,
  ...props
}: LabelProps) => {
  const colorClasses: { [key: string]: string } = {
    red: "text-red-800 bg-red-100 border-red-300",
    blue: "text-blue-800 bg-blue-100 border-blue-300",
    green: "text-green-800 bg-green-100 border-green-300",
    yellow: "text-yellow-800 bg-yellow-100 border-yellow-300",
    gray: "text-gray-800 bg-gray-100 border-gray-300",
    purple: "text-purple-800 bg-purple-100 border-purple-300",
    // Add other colors as needed
  };
  return (
    <div
      className={cn(
        "rounded-md px-2 py-1 flex items-center gap-x-1.5",
        colorClasses[color] || colorClasses["gray"],
        labelVariants({ size, border }),
        className
      )}
      {...props}>
      <span className={`${shouldDelete ? "pt-1" : ""}`}>{label}</span>
      {shouldDelete && (
        <button onClick={() => deleteFn?.(id)}>
          <X className="size-4 my-0 py-0" />
        </button>
      )}
    </div>
  );
};

// Label Stack Component that displays a stack of labels. It can display a maximum of 3 labels and if there are more than 3 labels, it will display the number of hidden labels in a tooltip.

const labelStackVariants = cva("flex", {
  variants: {
    orientation: {
      vertical: "flex-row",
      horizontal: "flex-col",
    },
    spacing: {
      sm: "gap-x-3 -gap-y-5",
      md: "gap-x-2 -gap-y-4",
      lg: "gap-x-1 -gap-y-3",
      xl: "gap-x-0.5 -gap-y-2",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    spacing: "md",
  },
});

export interface LabelStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof labelStackVariants> {
  labels: { id?: string; name: string; color: string }[];
  labelSize?: "sm" | "md" | "lg";
  maxLabelsAmount?: number;
  shouldDelete?: boolean;
  deleteFn?: Function;
}

const LabelStack = ({
  className,
  orientation,
  labels,
  labelSize,
  spacing,
  shouldDelete,
  deleteFn,
  maxLabelsAmount = 3,
  ...props
}: LabelStackProps) => {
  const shownLabels = labels.slice(0, maxLabelsAmount);
  const hiddenLabels = labels.slice(maxLabelsAmount);

  return (
    <div
      className={cn(
        "flex flex-wrap !gap-y-2",
        labelStackVariants({ orientation, spacing }),
        className,
        orientation === "horizontal" ? "gap-x-0" : "gap-y-0"
      )}
      {...props}>
      {shownLabels.map(({ id, name, color }, index) => (
        <Label
          id={id}
          label={name}
          color={color}
          key={`${name}-${index + 1}`}
          size={labelSize}
          shouldDelete={shouldDelete}
          deleteFn={deleteFn}
        />
      ))}

      {/* Conditionally render Tooltip only if there are hidden labels */}
      {hiddenLabels.length > 0 && (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="self-center cursor-pointer">
                {/* TooltipTrigger wrapping */}+{hiddenLabels.length}
              </span>
            </TooltipTrigger>
            <TooltipContent className="flex max-w-md gap-4">
              {hiddenLabels.map(({ name, color }) => (
                <Label key={name} label={name} color={color} size={labelSize} />
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export { Label, LabelStack };
