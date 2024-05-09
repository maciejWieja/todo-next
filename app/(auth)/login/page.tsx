'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { handleCredentialsLogIn, handleGoogleLogIn } from '../../lib/actions';

export default function Page() {
  const [state, dispatch] = useFormState(handleCredentialsLogIn, '');

  return (
    <div className="bg-login bg-cover bg-center w-screen h-screen flex justify-center">
      <div className="py-[40px] px-[75px] w-[540px] bg-purple rounded-[70px] border-4 border-black m-auto">
        <form action={handleGoogleLogIn} className="flex mb-[40px]">
          <button type="submit" className="m-auto">
            <Image
              src="/google-icon-logo.svg"
              width="80"
              height="80"
              alt="google logo"
              priority={true}
            />
          </button>
        </form>
        <div className="w-full h-[2px] bg-black mb-[20px]"></div>
        <div className="w-full h-[2px] bg-black mb-[40px]"></div>
        <form action={dispatch}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full h-[70px] pl-[20px] text-[32px] rounded-[12px] border-2 border-black mb-[40px]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full h-[70px] pl-[20px] text-[32px] rounded-[12px] border-2 border-black mb-[10px]"
          />
          {state ? (
            <p className="mb-[15px] text-red text-[12px] font-bold">{state}</p>
          ) : (
            <p className="invisible mb-[15px] text-[12px] font-bold">
              error message
            </p>
          )}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-[320px] h-[80px] bg-blue-dark text-white rounded-full border-2 border-black text-[32px] font-bold mb-[20px]"
            >
              Log in
            </button>
            <Link href="/register" className="text-[14px] font-bold">
              No account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
