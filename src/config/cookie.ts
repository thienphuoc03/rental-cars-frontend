import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Set a cookie with a 12-hour expiration time
const expirationDate = new Date();
expirationDate.setTime(expirationDate.getTime() + 12 * 60 * 60 * 1000);

export const CookiesStorage = {
  getCookieData(name: string) {
    return cookies.get(name);
  },
  setCookieData(name: string, value: any) {
    cookies.set(name, value, { expires: expirationDate, path: '/' });
  },
  clearCookieData(name: string) {
    cookies.remove(name, { path: '/' });
  },
};
