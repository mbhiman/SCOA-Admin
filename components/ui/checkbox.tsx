"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ checked, onCheckedChange, className }: CheckboxProps) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0",
        checked ? "border-transparent" : "",
        className
      )}
      style={{
        background: checked ? "var(--primary)" : "transparent",
        borderColor: checked ? "var(--primary)" : "var(--border)",
      }}
    >
      {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
    </button>
  );
}
