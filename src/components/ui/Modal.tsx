import type { DialogHTMLAttributes } from "react";

export function Modal({ className = "", ...props }: DialogHTMLAttributes<HTMLDialogElement>) {
  return <dialog className={`ui-modal ${className}`} {...props} />;
}