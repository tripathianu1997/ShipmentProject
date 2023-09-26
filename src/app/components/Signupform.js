

"use client"
import React, { useState,useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios'; 
import { useRouter } from 'next/navigation';
import { CustomToastContainer, showSuccessToast, showErrorToast } from './CustomTost';

export default function Signupform() {


  ///variables//
  const [emailError, setEmailError] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    roleid: '1',
    vehiclenumber: '',
    licensenumber: '',
    contactnumber: '',
  });
  const [validationError,setValidationError] =  useState('');
  const [licenseNumberError, setLicenseNumberError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  
  ////

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      if (!isValidEmail(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    } else if (name === 'contactnumber') {
      // Check if it contains only digits and has a length of 10
      if (/^\d{10}$/.test(value)) {
        setContactNumberError('');
      } else {
        setContactNumberError('Contact Number must be a 10-digit number');
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };



  const handleSubmit = async () => {
    try {
      // Validate the vehicle number (for example, check if it's not empty)
      if (formData.vehiclenumber.trim() === '') {
        setValidationError('Vehicle Number is required');
        return; // Do not submit the form if validation fails
      }else if(formData.licensenumber.trim() === ''){
        setLicenseNumberError('License Number is required')
      }else if(formData.contactnumber.trim()===''){
        setContactNumberError('Contact Number is required')
      }

      const response = await axios.post(
        'http://localhost:3000/api/registration',
        formData
      );
      console.log('Response:', response.data);
      showSuccessToast('Account created successfully');
      router.push('/')
      Swal.fire(
        'Sccessfully Registration',
        'You clicked the button!',
        'success'
      )
    } catch (error) {
      showErrorToast('An error occurred while creating the account');
      console.error('Error:', error);
    }
  };
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{' '}
              <a
                href="#"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </a>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="username" className="text-base font-medium text-gray-900">
                    {' '}
                    Username{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                      {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="vehiclenumber" className="text-base font-medium text-gray-900">
                    {' '}
                    Vehicle Number{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Vehicle Number"
                      id="vehiclenumber"
                      name="vehiclenumber"
                      value={formData.vehiclenumber}
                      onChange={handleChange}
                    />
                     {validationError && <div className="text-red-500 text-sm mt-1">{validationError}</div>}
                  </div>
                </div>
                <div>
                  <label htmlFor="licensenumber" className="text-base font-medium text-gray-900">
                    {' '}
                    License Number{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="License Number"
                      id="licensenumber"
                      name="licensenumber"
                      value={formData.licensenumber}
                      onChange={handleChange}
                    />
                     {licenseNumberError && <div className="text-red-500 text-sm mt-1">{licenseNumberError}</div>}
                  </div>
                </div>
                <div>
                  <label htmlFor="contactnumber" className="text-base font-medium text-gray-900">
                    {' '}
                    Contact Number{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent text-black px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Contact Number"
                      id="contactnumber"
                      name="contactnumber"
                      value={formData.contactnumber}
                      onChange={handleChange}
                      maxLength="10"
                    />
                     {contactNumberError && <div className="text-red-500 text-sm mt-1">{contactNumberError}</div>}
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={handleSubmit}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>
    </Layout>
  );
}

