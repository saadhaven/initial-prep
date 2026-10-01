import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div" | "nav" | "header";
};

export function Card({ as: Element = "div", className = "", ...props }: CardProps) {
  return <Element className={`border border-border bg-card ${className}`} {...props} />;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet";
  size?: "default" | "small";
};

const buttonVariants = {
  primary: "border-primary bg-primary text-foreground hover:border-primary-hover hover:bg-primary-hover",
  secondary: "border-border bg-card text-foreground hover:border-muted hover:bg-card/80",
  quiet: "border-transparent bg-transparent text-muted hover:bg-card hover:text-foreground",
};

export function buttonClassName({ variant = "primary", size = "default", className = "" }: ButtonProps) {
  const dimensions = size === "small" ? "min-h-10 px-3 text-sm" : "min-h-11 px-4 text-sm";
  return `inline-flex items-center justify-center gap-2 border font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 ${dimensions} ${buttonVariants[variant]} ${className}`;
}

export function Button({ variant = "primary", size = "default", className = "", ...props }: ButtonProps) {
  return <button className={buttonClassName({ variant, size, className })} {...props} />;
}

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "success" | "danger";
};

const badgeTones = {
  neutral: "border-border text-muted",
  accent: "border-accent/40 text-accent",
  success: "border-correct/40 text-correct",
  danger: "border-wrong/40 text-wrong",
};

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex min-h-7 items-center border px-2 font-mono text-[10px] uppercase ${badgeTones[tone]} ${className}`}>
      {children}
    </span>
  );
}

type ProgressProps = {
  value: number;
  label: string;
  className?: string;
};

export function Progress({ value, label, className = "" }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={percentage}
      className={`h-1.5 overflow-hidden bg-border ${className}`}
      role="progressbar"
    >
      <div className="h-full bg-primary transition-[width]" style={{ width: `${percentage}%` }} />
    </div>
  );
}