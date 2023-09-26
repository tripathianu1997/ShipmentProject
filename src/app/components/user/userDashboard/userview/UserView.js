"use client"
import React, { useState } from 'react';
import UserTable from "../userTable/UserTable"
import ShipmentCreation from '../../../ShipmentCreation/ShipmentCreation';



export default function UserView() {

    ////varibales////
    const [dataFromChild, setDataFromChild] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [showtable, setShowtable] = useState(false);

    ////////

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const receiveDataFromChild = (data) => {
        setDataFromChild(data);
        console.log(data, "Data received in receiveDataFromChild");
    };


    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Shipments</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            This is a list of all Shipments. You can add new Shipments, edit existing
                            ones.
                        </p>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={openModal}
                        >
                            Add new Shipment
                        </button>
                    </div>
                </div>
                <ShipmentCreation isOpen={isModalOpen} onClose={closeModal} sendDataToParent={receiveDataFromChild} />
                {/* <AssignShipment refress ={dataFromChild}/>  */}

                <UserTable />

                <div className="mt-4 w-full border-gray-300">
                    <div className="mt-2 flex items-center justify-end">
                        <div className="space-x-2">
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                &larr; Previous
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Next &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}



