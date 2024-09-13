import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const headerVariants = cva("flex", {
  variants: {
    size: {
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
    },
    headerColor: {
      primary: "text-main/50",
      secondary: "text-main_DarkBlue",
    },
  },
  defaultVariants: {
    size: "md",
    headerColor: "primary",
  },
});

interface IHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {
  title: string;
  subtitle?: string;
}

export const Header = ({
  className,
  size,
  headerColor,
  title,
  subtitle,
  ...props
}: IHeaderProps) => {
  return (
    <div className={headerVariants({ size, headerColor })} {...props}>
      <h1 className="font-bold">{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};
