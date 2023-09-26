"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname, "pathname")
  const { data: session } = useSession();

  return (
    <nav className="bg-slate-950">
      <div className="relative w-[1080px] mx-auto flex items-center justify-between">


        {pathname != '/' && pathname != '/signIn' ? (
          <>

            <a href="/" className="cursor-pointer py-7 pr-7">
              <h3 className="text-white text-md"> Dashboard</h3>
            </a>
          </>
        ) : <a href="/" className="cursor-pointer py-7 pr-7">
          <h3 className="text-white text-md">OM LOGISTICS LTD</h3>
        </a>}



        {/* {pathname !== '/dashboard' && pathname !== '/dashboard/drivermanagement' && pathname !== '/dashboard/shipmentmanagement'? (
          <div className="flex space-x-6">
            <button
              className="py-3 px-5 font-mullish text-white border-lightBlue border rounded-sm text-sm font-bold :hover:bg-sky-700"
              onClick={() => signIn()}
            >
              Sign in
            </button>
            <button
              className="py-3 px-4 font-mullish rounded-sm text-sm font-bold text-lightBlue300 border transition-all duration-200 hover:text-lightBlue500 flex"
              onClick={() => router.push('/registration')}
            >
              Sign Up
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                className="w-[14px] h-[14px] ml-3"
              >
                <path
                  fill="currentColor"
                  d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                ></path>
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <h2 className="text-white text-xl flex">{session && session.user ? session.user.username : null}</h2>
            {session ? (
              <button
                className="py-3 px-4 font-mullish rounded-sm text-sm font-bold text-gray-100 border transition-all duration-200 hover:text-lightBlue500 flex"
                // onClick={() => signOut()}
              >
                Log Out
                <svg
                  viewBox="0 0 24 24"
                  focusable="false"
                  className="w-[14px] h-[14px] ml-3"
                >
                  <path
                    fill="currentColor"
                    d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                  ></path>
                </svg>
              </button>
            ) : null}
          </div>
        )} */}

        {pathname != '/' && pathname != '/signIn' ? (
          <div className="flex items-center space-x-6">
            <h2 className="text-white text-xl flex">{session && session.user ? session.user.username : null}</h2>
            {session ? (
              <button
                className="py-3 px-4 font-mullish rounded-sm text-sm font-bold text-gray-100 border transition-all duration-200 hover:text-lightBlue500 flex"
                onClick={() => signOut()}
              >
                Log Out
                <svg
                  viewBox="0 0 24 24"
                  focusable="false"
                  className="w-[14px] h-[14px] ml-3"
                >
                  <path
                    fill="currentColor"
                    d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                  ></path>
                </svg>
              </button>
            ) : null}
          </div>
        ) : <div className="flex space-x-6">
          <button
            className="py-3 px-5 font-mullish text-white border-lightBlue border rounded-sm text-sm font-bold :hover:bg-sky-700"
            onClick={() => signIn()}
          >
            Sign in
          </button>
          <button
            className="py-3 px-4 font-mullish rounded-sm text-sm font-bold text-lightBlue300 border transition-all duration-200 hover:text-lightBlue500 flex"
            onClick={() => router.push('/registration')}
          >
            Sign Up
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              className="w-[14px] h-[14px] ml-3"
            >
              <path
                fill="currentColor"
                d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
              ></path>
            </svg>
          </button>
        </div>}
      </div>
    </nav>
  );
}

export default Navbar;




