import { createIsomorphicFn } from '@tanstack/react-start';
import { deleteCookie } from 'vinxi/http';
import { REFRESH_TOKEN_COOKIE_NAME, SESSION_COOKIE_NAME } from '../constants';

export const deleteSessionCookie = createIsomorphicFn()
  .server(() => {
    deleteCookie(SESSION_COOKIE_NAME);
    deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
  })
  .client(() => {
    document.cookie = `${SESSION_COOKIE_NAME}=; Max-Age=0; path=/;`;
    document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=; Max-Age=0; path=/;`;
  });
