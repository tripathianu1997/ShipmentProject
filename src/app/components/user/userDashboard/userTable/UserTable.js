"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import moment from 'moment';
export default function UserTable() {

    ///variables///
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpen1, setModalOpen1] = useState(false);
    const { data: session, status } = useSession();
    let [shipmentdata, setShipmentdata] = useState([])

    ////
    const router = useRouter();

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal1 = () => {
        setModalOpen1(true);
    };

    const closeModal1 = () => {
        setModalOpen1(false);
    };



    const allShipment = () => {
        if (!session || !session.user) {
            router.push("/");
            return null;
        }
        const requestData = {
            enterby: session.user.userid
        };

        axios.post("http://localhost:3000/api/users/allshipment", requestData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                //   console.log(response.data,"123121212");
                shipmentdata = response.data.data
                setShipmentdata(shipmentdata)
                console.log(shipmentdata, "shipmentdata");
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    allShipment()
    useEffect(() => {
        // console.log(session.user.userid);
        allShipment()
    }, [])


    return (
        <div>


            <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
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
                                <tbody className="divide-y divide-gray-200 bg-white">

                                    {shipmentdata.map((res, ind) => {
                                        return (
                                            <tr className="divide-x divide-gray-200" key={ind}>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="flex items-center">

                                                        <FaEdit
                                                            className="cursor-pointer text-blue-500 mr-2"
                                                        //   onClick={() => handleEdit(res)}
                                                        />


                                                        <div className="ml-4">
                                                            <div className="text-sm  font-medium text-gray-900">{res.shipmentid}</div>
                                                            <div className="text-sm text-gray-500">jjiji</div>
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
    );
}
