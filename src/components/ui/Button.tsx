import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium transition-all duration-200 ease-in-out rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#7D6E83] hover:bg-[#6a5d6f] text-white focus:ring-[#7D6E83]',
    secondary: 'bg-[#DBA39A] hover:bg-[#c9948b] text-white focus:ring-[#DBA39A]',
    outline: 'border border-[#7D6E83] text-[#7D6E83] hover:bg-[#7D6E83]/10 focus:ring-[#7D6E83]',
    text: 'text-[#7D6E83] hover:text-[#6a5d6f] hover:bg-[#7D6E83]/10 focus:ring-[#7D6E83]'
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;