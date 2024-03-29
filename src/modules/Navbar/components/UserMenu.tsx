import { type FC, Fragment } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import cn from 'classnames';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import { useSession } from 'next-auth/react';

const MenuItem: FC<{ href: string; text: string }> = ({ href, text }) => (
  <Menu.Item>
    {({ active }) => (
      <Link
        href={href}
        className={cn(
          active ? 'bg-gray-100' : '',
          'block px-4 py-2 text-sm text-gray-700'
        )}
      >
        {text}
      </Link>
    )}
  </Menu.Item>
);

const UserMenu = () => {
  const { data: sessionData } = useSession();
  const isLoggedIn = !!sessionData;

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          {sessionData?.user?.image ? (
            <Image
              className="h-8 w-8 rounded-full"
              height={32}
              width={32}
              alt={`${
                sessionData?.user?.name || sessionData?.user?.id
              }'s Profile Picture`}
              src={sessionData?.user?.image}
            />
          ) : (
            <UserCircleIcon className="block h-8 w-8 text-white" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {isLoggedIn ? (
            <>
              <MenuItem href="/profile" text="Profile" />
              <MenuItem href="/api/auth/signout" text="Sign Out" />
            </>
          ) : (
            <MenuItem href="/api/auth/signin" text="Sign In" />
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
