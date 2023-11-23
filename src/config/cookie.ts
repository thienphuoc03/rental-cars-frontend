import { addMonths } from 'date-fns';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const CookiesStorage = {
  getCookieData(name: string) {
    return cookies.get(name);
  },
  setCookieData(name: string, value: any) {
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(name, value, { expires, path: '/' });
  },
  clearCookieData(name: string) {
    cookies.remove(name, { path: '/' });
  },
};
