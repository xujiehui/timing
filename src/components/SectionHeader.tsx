import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
}

export function SectionHeader({ 
  title, 
  description, 
  action, 
  className,
  ...props 
}: SectionHeaderProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between mb-6",
        className
      )}
      {...props}
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
