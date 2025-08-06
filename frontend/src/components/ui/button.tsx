import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none border-2 border-black",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground shadow-[4px_4px_0_0_black] hover:shadow-lg hover:shadow-destructive transition-all duration-300",
        destructive_green: "bg-green-500 text-white-foreground shadow-[4px_4px_0_0_black] hover:shadow-lg hover:shadow-green-300 transition-all duration-300",
        outline: "border border-input bg-transparent shadow-[4px_4px_0_0_black] hover:shadow-lg hover:shadow-gray-300 transition-all duration-300",
        secondary: "bg-secondary text-secondary-foreground shadow-[0_8px_5px_0_skyblue]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        brutal: "bg-blue-500 border-none text-white shadow-[4px_4px_0_0_black] hover:shadow-lg hover:shadow-blue-300 transition-all duration-300",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
