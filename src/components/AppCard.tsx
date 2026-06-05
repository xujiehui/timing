import * as React from "react"
import { Card } from "@arco-design/web-react"
import { cn } from "@/lib/utils"

interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
}

export function AppCard({ 
  title, 
  description, 
  actions, 
  children, 
  className,
  ...props 
}: AppCardProps) {
  return (
    <Card 
      className={cn(
        "minimal-card",
        className
      )}
      title={title || description ? (
        <div className="flex flex-row items-center justify-between">
          <div>
            {title && <div className="text-lg font-semibold">{title}</div>}
            {description && <div className="text-sm text-muted-foreground">{description}</div>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      ) : undefined}
      {...props}
    >
      {children}
    </Card>
  )
}
