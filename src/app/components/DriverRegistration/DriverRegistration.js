

import React, { useState,useEffect } from 'react';
import { X } from 'feather-icons-react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios';

const DriverRegistration = ({ isOpen, onClose,editData }) => {



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform your authentication logic here, and navigate if successful
    const isAuthenticated = true; // Replace with your authentication logic


  };

  ////variables
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  ///////

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    roleid: '1',
    vehiclenumber: '',
    licensenumber: '',
    contactnumber: '',
  });

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

  const [validationError,setValidationError] =  useState('');
  const [licenseNumberError, setLicenseNumberError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

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
      // showSuccessToast('Account created successfully');
      // router.push('/')
      setFormData({})
      onClose();
      alert("Success")
    } catch (error) {
      // showErrorToast('An error occurred while creating the account');
      console.error('Error:', error);
    }
  };

  ///useEffect

  useEffect(() => {
    if (editData) {
      //  console.log(editData,"editData");
        setFormData({
            username: editData.username,
            email: editData.email,
            roleid: '2',
            vehiclenumber: editData.vehiclenumber,
            licensenumber: editData.licensenumber,
            contactnumber: editData.contactnumber,
        });
    }
}, [editData]);


const updatedriver = async (e) => {
  e.preventDefault();

  const requestData = {
    username: formData.username,
    email: formData.email,
    driverid: editData.driverid,
    vehiclenumber: formData.vehiclenumber,
    licensenumber: formData.licensenumber,
    contactnumber: formData.contactnumber,
  };

  try {
    const response = await axios.post("http://localhost:3000/api/driver/updatedriver", requestData);

    // Handle the response data here
    const responseData = response.data;
    // console.log(responseData, "responseData");
    if(responseData.success == true){
      onClose()
      alert(responseData.result)
    }else{
      alert("something went wrong");
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="modal-container">
        <div className="modal-content">

          <form className="p-4 space-y-4" onSubmit={handleLogin}>
            <div className="flex items-center justify-between mx-12 mb-6">
            {editData ? (
              <h2 className="text-2xl font-bold ">Update Driver</h2>
            ):<h2 className="text-2xl font-bold ">Driver Registration</h2>}
              <button className="modal-close ml-auto" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className='flex gap-x-4 mt-[20px]'>
              <label className='w-full'>
                <p className='text-[0.875rem] text-black font-bold  mb-1 leading-[1.375rem]'>Driver Name</p>
                <input
                  required
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter Name"

                  className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500'
                />
              </label>

              <label className='w-full'>
                <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Email</p>
                <input
                  required
                  type="email"
                  id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}

                  placeholder="Enter Email"

                  className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                />
                 {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
              </label>
            </div>

            <div className='flex gap-x-4 mt-[20px]'>
            {!editData ? (
              <label className='w-full relative'>
                <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Password</p>
                <input
                  required
                  type={showPassword ? ("text") : ("password")}
                  id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}

                  placeholder="Password"

                  className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                />

                <span
                  className='absolute right-2 top-[38px] cursor-pointer'
                  onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ?

                    (<AiOutlineEyeInvisible fontSize={24} fill='#000000' />) :

                    (<AiOutlineEye fontSize={24} fill='#000000' />)}
                </span>
              </label>
):null}
              <label className='w-full'>
                <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Vehicle Number</p>
                <input
                  required
                  type="text"
                  id="vehiclenumber"
                  name="vehiclenumber"
                  value={formData.vehiclenumber}
                  onChange={handleChange}

                  placeholder="Enter Vehicle NO"

                  className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                />
                 {validationError && <div className="text-red-500 text-sm mt-1">{validationError}</div>}
              </label>
            </div>



            <div className='flex gap-x-4 mt-[20px]'>
              <label className='w-full'>
                <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>License Number<sup className='text-pink-200'>*</sup></p>
                <input
                  required
                  type="text"
                  id="licensenumber"
                      name="licensenumber"
                      value={formData.licensenumber}
                      onChange={handleChange}

                  placeholder="License Number"

                  className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                />
                 {licenseNumberError && <div className="text-red-500 text-sm mt-1">{licenseNumberError}</div>}
              </label>

              <label className='w-full'>
                <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Mobile Number</p>
                <input
                  required
                  type="text"
                  
                  id="contactnumber"
                  name="contactnumber"
                  value={formData.contactnumber}
                  onChange={handleChange}
                  maxLength="10"
                  placeholder="Enter Mobile No"

                  className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                />
                 {contactNumberError && <div className="text-red-500 text-sm mt-1">{contactNumberError}</div>}
              </label>
            </div>


            {/* {editData ? ( <button
              className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
            bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center"
           onClick={updatedriver}
            >UPDATE</button>): <button
              className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
            bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center"
            onClick={handleSubmit}
            >SUBMIT</button>} */}

{editData ? (<div className="flex justify-center items-center">
  <button
    className="bg-black text-white py-[10px] px-[10px] rounded-md font-mullish font-bold
               hover:bg-cyan-600 transition-all duration-200"
    onClick={updatedriver}
  >
    UPDATE
  </button>
</div>):<div className="flex justify-center items-center">
            <button
              className="bg-black text-white py-[10px] px-[10px] rounded-md font-mullish font-bold
                         hover:bg-cyan-600 transition-all duration-200"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>}
           

          </form>
        </div>
      </div>
    </div>


  );
};

export default DriverRegistration;

