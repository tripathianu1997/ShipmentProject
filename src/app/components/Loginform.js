"use client"
import { useState } from 'react';
import { signIn,useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'
export default function Loginform(){

  //varibales////
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null); 

  /////

  const { data: session, status } = useSession();



  const handleSignIn = async (e) => {
    e.preventDefault();
  
    const credentials = { email, password };
  
    // Use the signIn function from next-auth/react to send the credentials
    const result = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });
  
    if (result.error) {
      setError(result.error);
      console.error('Sign-in failed:', result.error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
       
      })
    } else if (result.ok) {
      // console.log(session.user.roleid,"result")
      Swal.fire(
        'Sccessfully Loagin',
        'You clicked the button!',
        'success'
      )
      router.push('/dashboard');
     
    }
    
    
     
      // Redirect to the dashboard upon successful sign-in
      // 
    }
  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </a>
          </p>
          {error && <p className="text-red-500">Wrong credentials. Please try again.</p>} {/* Display error message */}
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    className="flex h-10 w-full  text-black rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    className="flex h-10 w-full text-black rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSignIn}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="h-full w-full">
        <img
          className="mx-auto h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
