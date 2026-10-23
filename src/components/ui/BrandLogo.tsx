import React from 'react';
import { Link } from 'react-router-dom';

export interface BrandLogoProps {
  to?: string;
  className?: string;
  iconSize?: string;
  textSize?: string;
  showText?: boolean;
  onClick?: () => void;
  variant?: 'dark' | 'light' | 'auto';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  to = '/',
  className = '',
  iconSize = 'w-7 h-7',
  textSize = 'text-xl sm:text-[22px]',
  showText = true,
  onClick,
  variant = 'auto',
}) => {
  const colorClass =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-[#0F172A]'
      : 'text-[#0F172A] dark:text-white';

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${colorClass} ${className}`}>
      {/* Target / Eye icon: clean outer ring with centered solid dot */}
      <svg
        className={`${iconSize} shrink-0`}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          r="10.5"
          stroke="currentColor"
          strokeWidth="2.5"
          className="transition-colors group-hover:opacity-80"
        />
        <circle
          cx="14"
          cy="14"
          r="4"
          fill="currentColor"
          className="transition-colors group-hover:opacity-80"
        />
      </svg>

      {showText && (
        <span
          className={`font-black tracking-tight font-sans leading-none ${textSize}`}
        >
          satyadrishti
        </span>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
};

export default BrandLogo;
