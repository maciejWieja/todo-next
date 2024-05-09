'use client';

import Image from 'next/image';
import Link from 'next/link';
import { handleGoogleLogIn, register } from '../../lib/actions';
import { useFormState } from 'react-dom';

export default function Page() {
  const [state, dispatch] = useFormState(register, {
    errors: {},
    message: null,
  });

  if (state.message) {
    console.log(state.message);
  }

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
            className="w-full h-[70px] pl-[20px] text-[32px] rounded-[12px] border-2 border-black mb-[10px]"
          />
          {state.errors?.email ? (
            <p className="mb-[15px] text-red text-[12px] font-bold">
              {state.errors.email[0]}
            </p>
          ) : (
            <p className="invisible mb-[15px] text-[12px] font-bold">
              error message
            </p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full h-[70px] pl-[20px] text-[32px] rounded-[12px] border-2 border-black mb-[10px]"
          />
          {state.errors?.password ? (
            <p className="mb-[15px] text-red text-[12px] font-bold">
              {state.errors.password[0]}
            </p>
          ) : (
            <p className="invisible mb-[15px] text-[12px] font-bold">
              error message
            </p>
          )}
          <input
            type="password"
            name="repeated_password"
            placeholder="Repeat password"
            className="w-full h-[70px] pl-[20px] text-[32px] rounded-[12px] border-2 border-black mb-[10px]"
          />
          {state.errors?.repeatedPassword ? (
            <p className="mb-[15px] text-red text-[12px] font-bold">
              {state.errors.repeatedPassword[0]}
            </p>
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
              Sign up
            </button>
            <Link href="/login" className="text-[14px] font-bold block">
              Do you have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
