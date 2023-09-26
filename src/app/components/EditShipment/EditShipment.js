import React, { useState } from 'react';
import { X } from 'feather-icons-react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios'; 
import { CustomToastContainer, showSuccessToast, showErrorToast } from '../CustomTost';


const ShipmentRegistration = ({ isOpen, onClose }) => {

    ///variables
    const [dataToSend, setDataToSend] = useState(1)
    const [formData, setFormData] = useState({
        customerName: '',
        destinationAddress: '',
        plannedDeliveryDate: ''
      });
    ////////
    const sendDataToParentOnClick = () => {
        // Call the callback function passed from the parent
        
        sendDataToParent(dataToSend+1);
      };

    
    ////

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });   
    };

  

    const handleSubmit = async (e) => {
      e.preventDefault();
  
    };
    


    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="modal-container">
                <div className="modal-content">

                    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
                        <div className="flex items-center justify-between mx-12 mb-6">
                            <h2 className="text-2xl font-bold ">Shipment Creation</h2>
                            <button className="modal-close ml-auto" onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className='flex gap-x-4 mt-[20px]'>
                            <label className='w-full'>
                                <p className='text-[0.875rem] text-black font-bold  mb-1 leading-[1.375rem]'>Customer Name</p>
                                <input
                                    required
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Name"

                                    className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500'
                                />
                            </label>

                            <label className='w-full'>
                                <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Destination Address</p>
                                <input
                                    required
                                    type="text"
                                    name="destinationAddress"
                                    value={formData.destinationAddress}
                                    onChange={handleInputChange}
                                    placeholder="Enter Destination"

                                    className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                                />
                            </label>
                        </div>

                        <div className='flex gap-x-4 mt-[20px]'>
                            <label className='w-full'>
                                <p className='text-[0.875rem] text-black font-bold  mb-1 leading-[1.375rem]'>Shipment Status</p>
                                <input
                                    required
                                    type="text"
                                    name="Status"
                                    value="In Transit"
                                    readOnly
                                    placeholder="Enter Name"

                                    className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500'
                                />
                            </label>
                            <label className='w-full'>
                                <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Delivery Date</p>
                                <input
                                    required
                                    type='date'
                                    name="plannedDeliveryDate"
                                    value={formData.plannedDeliveryDate}
                                    onChange={handleInputChange}
                                    placeholder="Delivery Date"

                                    className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                                />
                            </label>
                        </div>
                        <button
                            className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
            bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center"
                        >SUBMIT</button>

                    </form>
                </div>
            </div>
        </div>


    );
};

export default ShipmentRegistration;
