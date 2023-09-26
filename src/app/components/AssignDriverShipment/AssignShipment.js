import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ShipmentCreation from '../ShipmentCreation/ShipmentCreation';
import AssignToDriver from '../AssignToDriver/AssignToDriver';
import moment from 'moment';

export default function AssignShipment({ refress }) {

  //variables//////
  let [allShipments, setAllShipments] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen1, setModalOpen1] = useState(false);
  let [showedit, setShowedit] = useState(false);
  let [showupdate, setShowupdate] = useState(false);
  let [editData, setEditData] = useState([]);
  let [assignData, setAssignData] = useState([]);

  ///////////////


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

  const allShipment = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/shipment/allshipment");
      response.data.data.forEach(item => {
        console.log(item.ShipmentID, "...........");
      });
      ;
      setAllShipments(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  allShipment();

  useEffect(() => {

    allShipment();
  }, [refress]);





  const handleEdit = (shipmentID, person) => {
    // Implement your edit logic here using the shipmentID
    console.log(`Editing shipment with ID ${shipmentID}`);
    // openModal()
    if (person) {
      setEditData(person)
      openModal()
      setShowedit(true)
    }

  };

  const handleDelete = (shipmentID, person) => {
    // Implement your delete logic here using the shipmentID
    console.log(`Deleting shipment with ID ${shipmentID}`);

  };

  const handleAssign = (shipmentID, person) => {
    // Implement your delete logic here using the shipmentID
    console.log(`Deleting shipment with ID ${shipmentID}`);
    if (person) {
      setAssignData(person)
      openModal1()
      setShowupdate(true)
    }

  };

  return (

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
                    <span>Customer Name</span>
                  </th>
                  <th
                    scope="col"
                    className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Destination Address
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Status
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
                    Assign Driver
                  </th>
                  {/* <th scope="col" className="relative px-4 py-3.5">
                  <span className="sr-only">Edit</span>
                </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">

                {allShipments.map((person, ind) => {
                  return (
                    <tr key={ind} className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-center">

                          <FaEdit
                            className="cursor-pointer text-blue-500 mr-2"
                            onClick={() => handleEdit(person["ShipmentID"], person)}
                          />
                          <FaTrash
                            className="cursor-pointer text-red-500"
                            onClick={() => handleDelete(person["ShipmentID"])}
                          />

                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{person.customername}</div>
                            <div className="text-sm text-gray-500">{person["ShipmentID"]}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-12 py-4">
                        <div className="text-sm text-gray-900">{person.destinationaddress}</div>
                        {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                      </td>
                      {person.shipmentstatus == "Pending" ? (
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {person.shipmentstatus}
                          </span>
                        </td>
                      ) : <td className="whitespace-nowrap px-4 py-4">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {person.shipmentstatus}
                        </span>
                      </td>}

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                        {moment(person.planneddeliverydate).format("DD-MM-YYYY")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                        <a href="#" className="text-gray-500 hover:text-indigo-600">
                          <FaPlus className="mr-1"
                            onClick={() => handleAssign(person["ShipmentID"], person)} />
                        </a>
                      </td>
                    </tr>
                  )
                })}


              </tbody>
            </table>
          </div>
          {showedit === true ? (
            <ShipmentCreation isOpen={isModalOpen} onClose={closeModal} editData={editData} />
          ) : null}
          {showupdate === true ? (
            <AssignToDriver isOpen={isModalOpen1} onClose={closeModal1} assignData={assignData} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
