"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import moment from 'moment';

export default function UserTrack({ isOpen, onClose, TrackData }) {

    if (isOpen) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }

    let [shipmentdata, setShipmentdata] = useState([])

    const allShipment = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "enterby": TrackData.userid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/users/allshipment", requestOptions)
            .then(response => response.text())
            .then(result => {
                let arr = JSON.parse(result)
                console.log(arr, "arrrr");
                if (arr.success == true) {

                    shipmentdata = arr.data;
                    setShipmentdata(shipmentdata)
                    console.log(arr.data, "121212");
                } else {

                    setShipmentdata([])
                }
            })
            .catch(error => console.log('error', error));
    }

    //   allShipment()
    useEffect(() => {

        allShipment()
    }, [TrackData])


    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">

            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative w-auto max-w-screen-lg mx-auto my-6">
                {/* Modal content */}

                <div className="card bg-white py-2 px-2 rounded-md">
                    <div className="modal-header">
                        <button
                            className="float-right modal-close py-2 px-4 bg-black-500 text-black font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-black-400 focus:ring-opacity-75 "
                            onClick={onClose}

                        >
                            &times;
                        </button>
                        <h1 className="text-center text-xl font-bold mb-4">{TrackData.username}</h1>
                    </div>
                    <div className="modal-body p-4">
                        <div className="mt-6 flex flex-col">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-x-auto border border-gray-200 md:rounded-lg">

                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr className="divide-x divide-gray-200">
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                    >
                                                        <span>Shipment Id</span>
                                                    </th>


                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                    >
                                                        Customer Name
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                    >
                                                        Destination Address
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                    >
                                                        status
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                    >
                                                        Driver Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                    >
                                                        Delivery Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                    >
                                                        Actual Delivery Date
                                                    </th>


                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200 bg-white" >


                                                {shipmentdata.map((res, ind) => {
                                                    return (
                                                        <tr className="divide-x divide-gray-200" key={ind}>
                                                            <td className="whitespace-nowrap px-4 py-4">
                                                                <div className="flex items-center">


                                                                    <div className="ml-4">
                                                                        <div className="text-sm  font-medium text-gray-900">{res.shipmentid}</div>
                                                                        {/* <div className="text-sm text-gray-500"></div> */}
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap px-4 py-4">
                                                                <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                    {res.customername}
                                                                </span>
                                                            </td>


                                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                                {res.destinationaddress}
                                                            </td>


                                                            {res.shipmentstatus == "Pending" ? (
                                                                <td className="whitespace-nowrap px-4 py-4">
                                                                    <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                        {res.shipmentstatus}
                                                                    </span>
                                                                </td>
                                                            ) : <td className="whitespace-nowrap px-4 py-4">
                                                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                    {res.shipmentstatus}
                                                                </span>
                                                            </td>}
                                                            {res.drivername == null ? (

                                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                                    Not Assign
                                                                </td>
                                                            ) :
                                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                                    {res.drivername}
                                                                </td>}


                                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                                <span className="inline-flex rounded-full bg-green-400 px-2 text-color-white text-xs font-semibold leading-5 text-green-800" >
                                                                    {moment(res.planneddeliverydate).format("DD-MM-YYYY")}
                                                                </span>
                                                            </td>
                                                            {res.actualdeliverydate == null ? (
                                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                                    <span className="inline-flex rounded-full bg-red-400 px-2 text-color-white text-xs font-semibold leading-5 text-green-800" >
                                                                        Not Delivered
                                                                    </span>
                                                                </td>
                                                            ) : <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                                <span className="inline-flex rounded-full bg-green-400 px-2 text-color-white text-xs font-semibold leading-5 text-green-800" >
                                                                    {moment(res.actualdeliverydate).format("DD-MM-YYYY")}
                                                                </span>
                                                            </td>}


                                                        </tr>
                                                    )
                                                })}






                                            </tbody>


                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


