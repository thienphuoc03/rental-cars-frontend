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

  return Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24)) + 1;
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

export const formatCurrencyToNumber = (value: string) => {
  const number = value.replace(/,/g, '').replace(/₫/g, '');

  return Number(number) * 1000;
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

export const formatIsoToDate = (date: any) => {
  const [year, month, day] = date.split('-');

  return `${day}/${month}/${year}`;
};

export const translateEnglishToVietnamese = (value: string) => {
  switch (value) {
    case 'id':
      return 'ID';
    case 'name':
      return 'Tên';
    case 'licensePlates':
      return 'Biển số xe';
    case 'brand':
      return 'Hãng xe';
    case 'model':
      return 'Mẫu xe';
    case 'seats':
      return 'Số ghế';
    case 'transmission':
      return 'Hộp số';
    case 'fuel':
      return 'Nhiên liệu';
    case 'features':
      return 'Tính năng';
    case 'pricePerDay':
      return 'Giá/ngày';
    case 'createdAt':
      return 'Ngày tạo';
    case 'status':
      return 'Trạng thái';
    case 'orderId':
      return 'Mã đơn hàng';
    case 'carId':
      return 'Mã xe';
    case 'deposits':
      return 'Tiền cọc';
    case 'totalAmount':
      return 'Tổng tiền';
    case 'orderDetailStatus':
      return 'Trạng thái đơn hàng';
    case 'paymentStatus':
      return 'Trạng thái thanh toán';
    case 'startDate':
      return 'Ngày bắt đầu';
    case 'endDate':
      return 'Ngày kết thúc';
    case 'role':
      return 'Vai trò';
    case 'orderStatus':
      return 'Trạng thái đơn hàng';
    default:
      return value;
  }
};
export const numberToText = (number: number) => {
  const words = [
    '',
    'một',
    'hai',
    'ba',
    'bốn',
    'năm',
    'sáu',
    'bảy',
    'tám',
    'chín',
  ];
  const unitWords = ['', 'nghìn', 'triệu', 'tỷ'];

  function convertGroupOfThree(num: number) {
    const units = num % 10;
    const tens = Math.floor((num % 100) / 10);
    const hundreds = Math.floor(num / 100);

    let result = '';

    if (hundreds > 0) {
      result += words[hundreds] + ' trăm ';
    }

    if (tens > 1) {
      result += words[tens] + ' mươi ';
    } else if (tens === 1) {
      result += 'mười ';
    }

    if (units > 0) {
      result += words[units] + ' ';
    }

    return result.trim();
  }

  // Convert the number to a string to handle leading zeros
  const numString = String(number);

  // Split the number into groups of three digits
  const groups = [];
  for (let i = numString.length; i > 0; i -= 3) {
    groups.push(Number(numString.slice(Math.max(i - 3, 0), i)));
  }

  // Convert each group to text and combine with unit words
  let result = '';
  for (let i = 0; i < groups.length; i++) {
    const groupText = convertGroupOfThree(groups[i]);
    if (groupText !== '') {
      result = groupText + ' ' + unitWords[i] + ' ' + result;
    }
  }

  return result.trim();
};

export const formatDateTimeToAgo = (date: Date) => {
  const dateValue = new Date(date);

  const diff = Math.floor((new Date().getTime() - dateValue.getTime()) / 1000);

  const day = Math.floor(diff / 86400);
  if (day > 0) {
    return `${day} ngày trước`;
  }

  const hour = Math.floor(diff / 3600);
  if (hour > 0) {
    return `${hour} giờ trước`;
  }

  const minute = Math.floor(diff / 60);
  if (minute > 0) {
    return `${minute} phút trước`;
  }

  return `${diff} giây trước`;
};

// function removes all spaces in the string and converts it to lower case
export const slugify = (str: string) => {
  return str.replace(/\s+/g, '').toLowerCase();
};
