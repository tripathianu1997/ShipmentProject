


import React, { useState, useEffect } from 'react';
import { X } from 'feather-icons-react';
import axios from 'axios';

const AssignToDriver = ({ isOpen, onClose, assignData }) => {

  ///varibales///

  const [formData, setFormData] = useState({
    customerName: '',
    destinationAddress: '',
    plannedDeliveryDate: '',
    AssignDriver: '',
  });

  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [driverInput, setDriverInput] = useState('');

  /////

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // If there is editData, set the form data based on it
    if (assignData) {
      console.log(assignData.shipmentid,"assigndata");
      const plannedDeliveryDate = new Date(assignData.planneddeliverydate);
      const formattedDate = plannedDeliveryDate.toISOString().split('T')[0];
      setFormData({
        customerName: assignData.customername || '',
        destinationAddress: assignData.destinationaddress || '',
        shipmentstatus: assignData.shipmentstatus || '',
        plannedDeliveryDate: formattedDate || '',
      });
    }
  }, [assignData]);

  useEffect(() => {
    searchDriver();
  }, []);

  const searchDriver = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/shipment/assignShipment');
      const allDrivers = response.data.data;
      const filtered = allDrivers.filter((driver) =>
        driver.username.toLowerCase().includes(driverInput.toLowerCase()) ||
        driver.driverid.toString().includes(driverInput)
      );
      setFilteredDrivers(filtered);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDriverSelect = (selectedDriver) => {
    setDriverInput(selectedDriver.username);
    setFormData({
      ...formData,
      AssignDriver: selectedDriver.driverid.toString(),
    });
    setFilteredDrivers([]);
  };

  // const assignedDriver = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     "assigneddriverid": formData.AssignDriver,
  //     "shipmentid": assignData.shipmentid
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("http://localhost:3000/api/shipment/assigneddriver", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log(formData.AssignDriver, "formdata");
  
    try {
      const response = await axios.post("http://localhost:3000/api/shipment/assigneddriver", {
        assigneddriverid: formData.AssignDriver,
        shipmentid: assignData.shipmentid
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      console.log(response.data);
      onClose()
      setFormData({})
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container">
        <div className="modal-content">
          <form className="p-4 space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mx-12 mb-6">
              <h2 className="text-2xl font-bold">Assign Shipment</h2>
              <button className="modal-close ml-auto" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className="flex gap-x-4 mt-[20px]">
              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Customer Name</p>
                <input
                  required
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  readOnly
                  placeholder="Enter Name"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500"
                />
              </label>

              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Destination Address</p>
                <input
                  required
                  type="text"
                  name="destinationAddress"
                  value={formData.destinationAddress}
                  readOnly
                  onChange={handleInputChange}
                  placeholder="Enter Destination"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400"
                />
              </label>
            </div>

            <div className="flex gap-x-4 mt-[20px]">
              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Shipment Status</p>
                <input
                  required
                  type="text"
                  name="Status"
                  value="In Transit"

                  readOnly
                  placeholder="Enter Name"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500"
                />
              </label>
              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Delivery Date</p>
                <input
                  required
                  type="date"
                  name="plannedDeliveryDate"
                  value={formData.plannedDeliveryDate}
                  readOnly
                  onChange={handleInputChange}
                  placeholder="Delivery Date"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400"
                />
              </label>
            </div>
            <div className="relative mt-[20px]">
              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Assign Driver</p>
                <input
                  required
                  type="text"
                  name="AssignDriver"
                  value={driverInput}
                  onChange={(e) => {
                    setDriverInput(e.target.value);
                    searchDriver();
                  }}
                  placeholder="Assign Driver"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400"
                />
                {filteredDrivers.length > 0 && (
                  <ul className="absolute z-10 mt-2 bg-white border rounded-md shadow-md max-h-40 overflow-y-auto w-40">
                    {filteredDrivers.map((driver) => (
                      <li
                        key={driver.driverid}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleDriverSelect(driver)}
                      >
                        {`${driver.username} (ID: ${driver.driverid})`}
                      </li>
                    ))}
                  </ul>
                )}
              </label>
            </div>
            <button
              className="bg-black text-black py-[10px] px-[10px] rounded-md font-mullish font-bold bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignToDriver;



