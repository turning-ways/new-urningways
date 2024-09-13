"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface BaseProps {
  children: React.ReactNode;
}

interface RootModalProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ResponsiveModalProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = "(min-width: 768px)";

const Modal = ({ children, ...props }: RootModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Modal = isDesktop ? Dialog : Drawer;

  return <Modal {...props}>{children}</Modal>;
};

const ModalTrigger = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModalTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <ModalTrigger {...props} className={cn(className)}>
      {children}
    </ModalTrigger>
  );
};

const ModalClose = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModalClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <ModalClose {...props} className={cn(className)}>
      {children}
    </ModalClose>
  );
};

const ModalContent = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModalContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <ModalContent
      {...props}
      className={cn(`${isDesktop ? "overflow-auto" : ""}`, className)}>
      {children}
    </ModalContent>
  );
};

const ModalDescription = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModalDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <ModalDescription {...props} className={cn(className)}>
      {children}
    </ModalDescription>
  );
};

const ModalHeader = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModalHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <ModalHeader {...props} className={cn(className)}>
      {children}
    </ModalHeader>
  );
};

const ModalTitle = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModalTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <ModalTitle {...props} className={cn(className)}>
      {children}
    </ModalTitle>
  );
};

const ModalFooter = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModalFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <ModalFooter {...props} className={cn(className)}>
      {children}
    </ModalFooter>
  );
};

const ModalBody = ({ className, children, ...props }: ResponsiveModalProps) => {
  return (
    <div className={cn("px-4 md:px-0 overflow-auto", className)} {...props}>
      {children}
    </div>
  );
};

export {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  ModalBody,
};
