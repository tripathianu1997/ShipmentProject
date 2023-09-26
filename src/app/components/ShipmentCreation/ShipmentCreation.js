import React, { useState, useEffect } from 'react';
import { X } from 'feather-icons-react';
import { useSession } from 'next-auth/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios';


const ShipmentRegistration = ({ isOpen, onClose, sendDataToParent, editData }) => {
    const { data: session } = useSession();

    ///varibales
    const [dataToSend, setDataToSend] = useState(1)
    const [formData, setFormData] = useState({
        customerName: '',
        destinationAddress: '',
        plannedDeliveryDate: '',

    });

    //////


    const sendDataToParentOnClick = () => {
        // Call the callback function passed from the parent

        sendDataToParent(dataToSend + 1);
    };


    ////

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //////

    useEffect(() => {
        // If there is editData, set the form data based on it
        // debugger
        if (editData) {

            const plannedDeliveryDate = new Date(editData.planneddeliverydate);
            const formattedDate = plannedDeliveryDate.toISOString().split('T')[0];
            setFormData({
                customerName: editData.customername || '',
                destinationAddress: editData.destinationaddress || '',
                shipmentstatus: editData.shipmentstatus || '',
                plannedDeliveryDate: formattedDate || '',
            });
        }
    }, [editData]);




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', session.user.userid);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/shipment/createShipment',
                {
                    customername: formData.customerName,
                    destinationaddress: formData.destinationAddress,
                    planneddeliverydate: formData.plannedDeliveryDate,
                    enterby: session.user.userid,
                    status: "N"
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Success:', response.data);
            showSuccessToast('Shipment created successfully');
            setFormData({})
            onClose();
            sendDataToParentOnClick()
        } catch (error) {
            console.error('Error:', error);
            showErrorToast('An error occurred while creating the Shipment');
        }
    };



    if (!isOpen) return null;

    /////

    const updateShipment = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "customername": formData.customerName,
            "destinationaddress": formData.destinationAddress,
            "planneddeliverydate": formData.plannedDeliveryDate,
            "shipmentid": editData.shipmentid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/shipment/updateshipment", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result, "result");
                onClose()
                sendDataToParentOnClick()

            })
            .catch(error => console.log('error', error));
    };


    return (

        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="modal-container">
                <div className="modal-content">

                    <form className="p-4 space-y-4" >
                        <div className="flex items-center justify-between mx-12 mb-6">
                            {/* <h2 className="text-2xl font-bold ">Shipment Creation</h2> */}
                            {editData ? (
                                <h2 className="text-2xl font-bold ">Edit Shipment</h2>
                            ) : <h2 className="text-2xl font-bold ">Shipment Creation</h2>}
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
                                    value="Pending"
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
                        {editData ? (
                            <button className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
                    bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center" onClick={updateShipment}>update</button>
                        ) :
                            <button
                                className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
                              bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center" onClick={handleSubmit}
                            >SUBMIT</button>}


                    </form>
                </div>
            </div>
        </div>


    );
};

export default ShipmentRegistration;
