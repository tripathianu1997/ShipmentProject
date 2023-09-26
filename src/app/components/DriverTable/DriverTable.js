"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import DriverRegistration from '../DriverRegistration/DriverRegistration';
import TrackDriver from '../TrackDriver/TrackDriver';

export default function DriverTable() {

  ////varables/////////
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen1, setModalOpen1] = useState(false);
  let [driverData, setDriverData] = useState([])
  let [showedit, setShowedit] = useState(false);
  let [showtrack, setShowtrack] = useState(false);
  let [editData, setEditData] = useState([]);
  let [trackData, setTrackData] = useState([]);

  ///////

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

  ////variable



  ////
  const alldriver = () => {
    axios.get("http://localhost:3000/api/driver/alldriver")
      .then(response => {
        let arr = response.data.data;
        setDriverData(arr);
      })
      .catch(error => console.log('error', error));
  };

  alldriver();


  useEffect(() => {
    alldriver()
  }, [])





  const handleEdit = (data) => {
    console.log(`Editing shipment with ID `);
    if (data) {
      setEditData(data)
      openModal()
      setShowedit(true)
    }
  };

  const handleDelete = () => {
    console.log("Delete me");
  };


  /////

  const HandleTrackMe = (data) => {
    console.log(data, "dtaat");
    if (data) {
      setTrackData(data)
      openModal1()
      setShowtrack(true)
    }
  }




  return (
    <div>
      {showtrack ? (<TrackDriver isOpen={isModalOpen1} onClose={closeModal1} TrackData={trackData} />) : null}

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
                      <span>Driver Id</span>
                    </th>


                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Driver Email
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Vehicle Number
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      License Number
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Contact Number
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Track Driver Status
                    </th>


                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">

                  {driverData.map((res, ind) => {
                    return (
                      <tr className="divide-x divide-gray-200" key={ind}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">

                            <FaEdit
                              className="cursor-pointer text-blue-500 mr-2"
                              onClick={() => handleEdit(res)}
                            />
                            <FaTrash
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete()}
                            />

                            <div className="ml-4">
                              <div className="text-sm  font-medium text-gray-900">{res.driverid}</div>
                              <div className="text-sm text-gray-500">{res.username}</div>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {res.email}
                          </span>
                        </td>


                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {res.vehiclenumber}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {res.licensenumber}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {res.contactnumber}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-400 px-2 text-color-white text-xs font-semibold leading-5 text-green-800" onClick={() => HandleTrackMe(res)}>
                            Track me
                          </span>
                        </td>

                      </tr>
                    )
                  })}




                </tbody>
              </table>
            </div>
            {showedit === true ? (
              <DriverRegistration isOpen={isModalOpen} onClose={closeModal} editData={editData} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
