'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleLogOut } from '../lib/actions';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        'grid grid-cols-[260px_1fr] grid-rows-[120px_1fr] h-screen overflow-hidden',
        {
          'bg-pink-dark':
            pathname.startsWith('/edit') || pathname.startsWith('/task'),
        }
      )}
    >
      <div className="col-start-2 flex items-center justify-end">
        <Link
          href="/"
          className={clsx('w-[230px] text-[64px] font-bold', {
            'bg-purple': pathname === '/',
          })}
        >
          TODO
        </Link>
      </div>
      <div className="row-start-2 pl-[40px] relative">
        <Link
          href="/add"
          className={clsx(
            'mb-[40px] size-[110px] flex items-center justify-center rounded-full',
            { 'bg-purple': pathname === '/add' }
          )}
        >
          <Image
            src="/AiOutlinePlusCircle.svg"
            alt="add icon"
            width="100"
            height="100"
            priority
          />
        </Link>
        <Link
          href="/archive"
          className={clsx(
            'size-[110px] flex items-center justify-center rounded-full',
            { 'bg-purple': pathname === '/archive' }
          )}
        >
          <Image
            src="/AiOutlineFolderOpen.svg"
            alt="archive icon"
            width="100"
            height="100"
          />
        </Link>
        <form
          action={handleLogOut}
          className="absolute bottom-[40px] size-[110px] flex items-center justify-center rounded-full"
        >
          <button type="submit">
            <Image
              src="/AiOutlineLogout.svg"
              alt="logout icon"
              width="100"
              height="100"
            />
          </button>
        </form>
      </div>
      <div className="border-t-4 border-l-4 border-black rounded-tl-[24px] bg-white overflow-auto">
        {children}
      </div>
    </div>
  );
}
