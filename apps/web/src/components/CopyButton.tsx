"use client";

import { useState, useCallback } from "react";
import { useToast } from "./Toast";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

interface CopyButtonProps {
  text: string;
  label?: string;
  successMessage?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CopyButton({
  text,
  label = "Copy",
  successMessage = "Copied to clipboard!",
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = useCallback(async () => {
    if (!text || disabled) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast(successMessage, "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy", "error");
    }
  }, [text, disabled, successMessage, showToast]);

  const baseStyles =
    "font-medium transition-all rounded-xl flex items-center justify-center gap-2";

  const variantStyles = {
    primary: copied
      ? "bg-green-500 text-white"
      : "bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: copied
      ? "bg-green-500 text-white"
      : "bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed",
    ghost: copied
      ? "bg-green-500/20 text-green-400"
      : "bg-transparent hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={handleCopy}
      disabled={disabled || !text}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <CopyIcon className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  );
}
