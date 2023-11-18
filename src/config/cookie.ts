import { addMonths, addYears } from "date-fns";
import Cookies from "universal-cookie";

import { COOKIE_KEY } from "@/lib/constants";

const cookies = new Cookies();

export const CookiesStorage = {
  getCookieData(key: string) {
    return cookies.get(key);
  },
  setCookieData(key: string, data: any) {
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(key, data, { expires, path: "/" });
  },
  clearCookieData(key: string) {
    cookies.remove(key, { path: "/" });
  },

  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  setAccessToken(accessToken: string) {
    const currentTime = new Date();
    const expires = addYears(currentTime, 1);
    cookies.set(COOKIE_KEY.accessToken, accessToken, {
      path: "/",
      expires,
    });
  },
  clearAccessToken() {
    cookies.remove(COOKIE_KEY.accessToken, { path: "/" });
  },

  authenticated() {
    const accessToken = cookies.get(COOKIE_KEY.accessToken);
    return accessToken !== undefined;
  },
};
