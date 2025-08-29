import { createIsomorphicFn } from '@tanstack/react-start';
import { setCookie } from 'vinxi/http';

export const setCookieSetting = createIsomorphicFn().server(async () => {
  const setting = {
    VITE_SMART_GARANT_URL: process.env.VITE_SMART_GARANT_URL,
    VITE_DOMAIN_APP_URL: process.env.VITE_DOMAIN_APP_URL,
    VITE_DOMAIN_URL: process.env.VITE_DOMAIN_URL_MILA,
  };
  const stringjsonconfig = JSON.stringify(setting);

  return await setCookie('settingConfig', stringjsonconfig, {
    path: '/',
    secure: import.meta.env.NODE_ENV === 'production',
  });
});
