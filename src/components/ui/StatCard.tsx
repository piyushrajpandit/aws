import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'accent' | 'warning' | 'danger' | 'success';
  description?: string;
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  trendLabel,
  icon: Icon,
  variant = 'default',
  description,
  className,
  titleClassName,
  valueClassName,
}) => {
  const iconVariants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    accent: 'bg-slate-100 text-slate-800 border-slate-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const isRedCategory =
    variant === 'danger' ||
    /violation|grievance|complaint/i.test(title);

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all duration-200 flex flex-col justify-between',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              'text-[11px] font-bold uppercase tracking-wider text-slate-500',
              titleClassName
            )}
          >
            {title}
          </span>
          {Icon && (
            <div className={cn('p-2 rounded-lg border', iconVariants[variant])}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-sans',
              isRedCategory && 'text-rose-600',
              valueClassName
            )}
          >
            {value}
          </span>
        </div>
      </div>

      {(change || description || trendLabel) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          {change && (
            <span
              className={cn(
                'inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px]',
                trend === 'up' && 'text-emerald-800 bg-emerald-50 border border-emerald-200/60',
                trend === 'down' && 'text-rose-800 bg-rose-50 border border-rose-200/60',
                trend === 'neutral' && 'text-slate-700 bg-slate-100 border border-slate-200'
              )}
            >
              {trend === 'up' && <TrendingUp className="h-3 w-3" />}
              {trend === 'down' && <TrendingDown className="h-3 w-3" />}
              {change}
            </span>
          )}
          <span className="text-[11px] text-slate-500 font-medium leading-snug">
            {trendLabel || description}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
