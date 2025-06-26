
import React from 'react';
import { cn } from '@/lib/utils';

interface MilitaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const MilitaryButton: React.FC<MilitaryButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = "relative font-mono font-bold tracking-wider uppercase transition-all duration-200 border-2 hover:shadow-lg active:scale-95";
  
  const variantClasses = {
    primary: "bg-green-900/30 border-green-400 text-green-400 hover:bg-green-900/50 hover:shadow-green-400/50",
    secondary: "bg-blue-900/30 border-blue-400 text-blue-400 hover:bg-blue-900/50 hover:shadow-blue-400/50",
    danger: "bg-red-900/30 border-red-400 text-red-400 hover:bg-red-900/50 hover:shadow-red-400/50",
    ghost: "bg-transparent border-gray-400 text-gray-400 hover:bg-gray-900/30 hover:shadow-gray-400/50"
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        "before:absolute before:inset-0 before:border-2 before:border-transparent before:transition-all before:duration-200",
        "hover:before:border-current hover:before:scale-105",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};
