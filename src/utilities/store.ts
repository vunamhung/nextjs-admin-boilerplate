import { ct } from '@/utilities';
import { CookieValueTypes, getCookie, setCookie } from 'cookies-next';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

type Store = {
  permissions: CookieValueTypes[];
  profile: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
export const store: Store = proxy({
  permissions: (getCookie('permissions') as string)?.split(','),
  profile: ct(getCookie('profile')) && JSON.parse(getCookie('profile') as string),
});

export const actions = {
  setPermissions: (payload: string[]) => {
    store.permissions = payload;
    setCookie('permissions', payload?.join(','));
  },
  setProfile: (payload: Store['profile']) => {
    store.profile = payload;
    setCookie('profile', JSON.stringify(payload));
  },
};

devtools(store, { name: 'must', enabled: true });
