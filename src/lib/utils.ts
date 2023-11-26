import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// format date to locale string vietnam
export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

export const countDays = (
  from: Date | undefined,
  to: Date | undefined,
): number => {
  if (!from || !to) return 0;

  return Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24));
};
