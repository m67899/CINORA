import type { HTMLAttributes } from "react";

export function Toast({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="status" className={`ui-toast ${className}`} {...props} />;
}