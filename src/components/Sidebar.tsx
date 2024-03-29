import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, UnstyledButton } from '@mantine/core';
import { clsx } from 'clsx';
import { deleteCookie } from 'cookies-next';
import { FiBox, FiBriefcase, FiFile, FiGift, FiHome, FiLogOut, FiMessageSquare, FiSettings, FiTag } from 'react-icons/fi';

export const Sidebar = () => {
  const { asPath, push } = useRouter();

  let onClickLogout = () => push('/login').then(() => deleteCookie('token'));

  return (
    <Navbar width={{ base: 200 }} p="md" withBorder={false}>
      <ul className="space-y-2">
        <li className={clsx('px-3 py-3 transition-all hover:bg-gray-100', asPath === '/' && 'bg-gray-100')}>
          <Link className="flex items-center" href="/">
            <FiHome className="mr-2 inline-block" size="20" />
            Dashboard
          </Link>
        </li>
        <li className={clsx('px-3 py-3 transition-all hover:bg-gray-100', asPath.startsWith('/products') && 'bg-gray-100')}>
          <Link className="flex items-center" href="/products">
            <FiBox className="mr-2 inline-block" size="20" />
            Products
          </Link>
        </li>
        <li className={clsx('px-3 py-3 transition-all hover:bg-gray-100', asPath.startsWith('/orders') && 'bg-gray-100')}>
          <Link className="flex items-center" href="/orders">
            <FiFile className="mr-2 inline-block" size="20" />
            Orders
          </Link>
        </li>
        <li className={clsx('px-3 py-3 transition-all hover:bg-gray-100', asPath.startsWith('/tags') && 'bg-gray-100')}>
          <Link className="flex items-center" href="/tags">
            <FiTag className="mr-2 inline-block" size="20" />
            Tags
          </Link>
        </li>
        <li className={clsx('px-3 py-3 transition-all hover:bg-gray-100', asPath.startsWith('/promotions') && 'bg-gray-100')}>
          <Link className="flex items-center" href="/promotions">
            <FiGift className="mr-2 inline-block" size="20" />
            Promotions
          </Link>
        </li>
        <li className={clsx('px-3 py-3 transition-all hover:bg-gray-100', asPath.startsWith('/finance') && 'bg-gray-100')}>
          <Link className="flex items-center" href="/finance">
            <FiBriefcase className="mr-2 inline-block" size="20" />
            Finance
          </Link>
        </li>
        <li className={clsx('px-3 py-3 transition-all hover:bg-gray-100', asPath.startsWith('/reviews') && 'bg-gray-100')}>
          <Link className="flex items-center" href="/reviews">
            <FiMessageSquare className="mr-2 inline-block" size="20" />
            Reviews
          </Link>
        </li>
        <li>
          <Link
            className={clsx('flex items-center px-3 py-3 transition-all hover:bg-gray-100', asPath.startsWith('/settings') && 'bg-gray-100')}
            href="/settings"
          >
            <FiSettings className="mr-2 inline-block" size="20" />
            Settings
          </Link>
          <ul className={clsx('ml-10 space-y-4 pt-4', asPath.includes('/settings') ? 'block' : 'hidden')}>
            <li>
              <Link
                className={clsx('flex items-center text-sm hover:text-blue-500', asPath.startsWith('/settings/roles') && 'text-blue-500')}
                href="/settings/roles"
              >
                Roles
              </Link>
            </li>
            <li>
              <Link
                className={clsx('flex items-center text-sm hover:text-blue-500', asPath.startsWith('/settings/users') && 'text-blue-500')}
                href="/settings/users"
              >
                Users
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <UnstyledButton onClick={onClickLogout} className="fixed bottom-6 inline-flex items-center hover:text-blue-500">
        <FiLogOut className="mr-1" />
        Logout
      </UnstyledButton>
    </Navbar>
  );
};
