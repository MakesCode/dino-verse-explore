import { createIsomorphicFn } from '@tanstack/react-start';
import Cookies from 'js-cookie';

export const getSetting = () => {
  const datasetting =
    createIsomorphicFn()
      .server(() => {
        const data = JSON.stringify({
          VITE_SMART_GARANT_URL: process.env.VITE_SMART_GARANT_URL,
          VITE_DOMAIN_URL: process.env.VITE_DOMAIN_URL_MILA,
          VITE_DOMAIN_APP_URL: process.env.VITE_DOMAIN_APP_URL,
        });
        return data;
      })
      .client(() => {
        const data = Cookies.get('settingConfig');
        return data;
      })() ?? `{}`;
  const parsed = JSON.parse(decodeURIComponent(datasetting)) as {
    VITE_SMART_GARANT_URL: string;
    VITE_DOMAIN_URL: string;
    VITE_DOMAIN_APP_URL: string;
  };
  if (Object.keys(parsed).length === 0) {
    return {
      VITE_SMART_GARANT_URL: '',
      VITE_DOMAIN_URL: '',
      VITE_DOMAIN_APP_URL: '',
    };
  }
  return parsed;
};
