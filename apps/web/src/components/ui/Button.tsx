import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

const sizeClasses = {
  xs: "px-3 py-1 text-xs",
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg",
} as const;

const variantClasses = {
  primary: "bg-forge-cyan text-forge-dark font-semibold hover:bg-forge-cyan/80",
  secondary:
    "glass text-gray-300 hover:text-white font-medium hover:border-white/20",
  ghost: "bg-white/10 hover:bg-white/20 text-white font-semibold",
  outline: "border border-white/30 hover:bg-white/10 text-white font-semibold",
} as const;

type ButtonVariant = keyof typeof variantClasses;
type ButtonSize = keyof typeof sizeClasses;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton
  extends
    ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
  external?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
  disabled?: never;
  type?: never;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  glow = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses = [
    "inline-flex items-center justify-center rounded-xl transition-all",
    sizeClasses[size],
    variantClasses[variant],
    glow && variant === "primary"
      ? "glow-cyan hover:scale-[1.02] active:scale-[0.98]"
      : "",
    "disabled" in props && props.disabled
      ? "disabled:opacity-50 disabled:cursor-not-allowed"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Link (internal or external)
  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses} {...rest}>
        {children}
        {glow && variant === "primary" && (
          <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </Link>
    );
  }

  // Button element
  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={baseClasses} {...buttonProps}>
      {children}
    </button>
  );
}
