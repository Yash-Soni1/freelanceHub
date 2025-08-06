import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border font-bold text-sm px-3 py-1 uppercase tracking-wide transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-gray-200 border-black",
        brutal:
          "bg-yellow-300 border-2 border-black hover:shadow-[4px_4px_0px_blue,8px_8px_0px_yellow,12px_12px_0px_red] hover:translate-x-[-2px] hover:translate-y-[-2px] cursor-pointer",
        destructive: "bg-red-500 text-white",
        outline: "border border-black bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
