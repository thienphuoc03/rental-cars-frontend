import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// format date to dd/mm/yyyy format (e.g. 01/01/2021)
export const formatDateToDMY = (date: Date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

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

export const convertBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const formatNumberToCurrency = (value: number) => {
  const number = value / 1000;

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
    .format(number)
    .replace(/,00/g, '')
    .replace(/\./g, '.')
    .replace(/₫/g, 'K');
};

export const formatDateToISO = (date: any) => {
  const [day, month, year] = date.split('/');

  return `${year}-${month}-${day}`;
};
