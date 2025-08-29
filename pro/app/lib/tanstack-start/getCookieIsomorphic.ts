import { createIsomorphicFn } from '@tanstack/react-start';
import { getCookie } from 'vinxi/http';
import Cookies from 'js-cookie';

export const getCookieIsomorphic = (cookieName: string) =>
  createIsomorphicFn()
    .server(() => {
      const data = getCookie(cookieName);
      return data;
    })
    .client(() => {
      const data = Cookies.get(cookieName);
      return data;
    });
