import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { AnimatePresence, motion, MotionConfigProps } from "framer-motion";
import { Checkbox } from "./checkbox";

//  This is an animated action check list component that displays a list of actions that can be performed on a contact.
//  It uses a check mark icon to indicate that an action has been completed.

// the action Component
const actionVariants = cva("flex", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    // border: {
    //   thin: "border",
    //   thick: "border-2",
    // },
  },
  defaultVariants: {
    size: "md",
    // border: "thin",
  },
});

export interface ActionProps
  extends MotionConfigProps,
    VariantProps<typeof actionVariants> {
  className?: string;
  action: string;
  id?: string;
  completed: boolean;
  deleteAction?: Function;
  completeFn?: Function;
}

const Action = ({
  className,
  action,
  completed,
  deleteAction,
  completeFn,
  size,
  id,
  ...props
}: ActionProps) => {
  const [isCompleted, setIsCompleted] = React.useState(completed);

  function handleActionStatus() {
    setIsCompleted(!isCompleted);
    completeFn?.(id, !isCompleted);
  }

  const animations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 p-2 rounded-lg",
        isCompleted ? "bg-green-50" : "bg-gray-50"
      )}
      {...animations}
      {...props}>
      <div className="flex items-center justify-between w-full pr-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={handleActionStatus}
            className={cn(
              "text-green-500",
              isCompleted ? "!bg-main border-main" : "bg-white"
            )}
          />
          <p
            className={`text-base m-0 pt-0.5 ${
              isCompleted ? "line-through text-gray-500" : ""
            }`}>
            {action}
          </p>
        </div>
        <button onClick={() => deleteAction?.(id)} className="text-red-300">
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// the action check list component
export interface ActionCheckListProps {
  actions: { id: string; actionName: string; completed: boolean }[];
  className?: string;
  deleteFn?: Function;
  completeFn?: Function;
}

const ActionCheckList = ({
  actions,
  className,
  deleteFn,
  completeFn,
}: ActionCheckListProps) => {
  return (
    <div className={cn("flex flex-col gap-2 max-w-lg", className)}>
      <AnimatePresence>
        {actions.map((action) => (
          <Action
            key={action.id}
            id={action.id}
            deleteAction={deleteFn}
            completeFn={completeFn}
            action={action.actionName}
            completed={action.completed}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ActionCheckList;
