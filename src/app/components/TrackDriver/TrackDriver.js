
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import { Select, Space, Modal } from 'antd';
// const {    } = antd;
export default function DriverTable({ isOpen, onClose, TrackData }) {

  if (isOpen) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }

  ////variables////

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  let [uniquedriver, setUniquedriver] = useState([])

  /////

  const showModal = (val, res) => {
    console.log(val, "val");
    console.log(res.shipmentid, "res");
    updateStatus(val, res.shipmentid)
    // setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  ////

  useEffect(() => {
    driverData();
    console.log(TrackData, "TrackData");
  }, [TrackData])



  // const driverData = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/driver/trackdriver", {
  //       assigneddriverid: "3300003"
  //     }, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });

  //     console.log(response.data, "data");
  //     // if()
  //     // setUniquedriver(response.data.data)
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // };

  const driverData = () => {
    setUniquedriver([])
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "assigneddriverid": TrackData.driverid
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("/api/driver/trackdriver", requestOptions)
      .then(response => response.text())
      .then(result => {
        // console.log(result,"result");
        let arr = JSON.parse(result);
        console.log(arr.data, "result");
        console.log(arr.success, "result");
        if (arr.success == true) {
          setUniquedriver(arr.data)
        } else {
          setUniquedriver([])
        }


      })
      .catch(error => console.log('error', error));
  }

  // driverData();

  const handleChange = (value, res) => {
    console.log(`selected ${value}`);
    console.log(`res: ${res}`);

    // updateStatus(value)
  };


  const updateStatus = (val, status) => {
    // e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "shipmentstatus": val,
      "assigneddriverid": TrackData.driverid,
      "shipmentid": status
    });
    console.log(raw, "rawwww");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("/api/driver/driverstatus", requestOptions)
      .then(response => response.text())
      .then(result => {
        let arr = JSON.parse(result)
        console.log(arr, "result");
        if (arr.success == true) {
          alert(arr.result);
          onClose()
        } else {
          alert("Something Went Wrong")
        }
      })
      .catch(error => console.log('error', error));
  }


  if (!isOpen) return null;



  return (
    <div>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>kuhgwduygwiuaygdiuyuaygdiuyugaidugiauy</p>
      </Modal>
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
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis"
                            >
                              <span>Shipment Id</span>
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis"
                            >
                              Customer Name
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis"
                            >
                              Destination Address
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis"
                            >
                              Shipment Status
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis"
                            >
                              Delivery Date
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis"
                            >
                              Actual Date
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis"
                            >
                              Update Status
                            </th>



                          </tr>
                        </thead>
                        {uniquedriver.map((res, ind) => {
                          return (
                            <tbody className="divide-y divide-gray-200 bg-white" key={ind}>


                              <tr className="divide-x divide-gray-200" >
                                <td className="whitespace-nowrap px-4 py-4">
                                  <div className="flex items-center">



                                    <div className="ml-4">
                                      <div className="text-sm  font-medium text-gray-900">{res.shipmentid}</div>
                                      <div className="text-sm text-gray-500">{res.customername}</div>
                                    </div>
                                  </div>
                                </td>

                                <td className="whitespace-nowrap px-4 py-4">

                                  {res.customername}

                                </td>


                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                  {res.destinationaddress}
                                </td>
                                {res.shipmentstatus == "In Transit" ? (
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                    <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                      {res.shipmentstatus}
                                    </span>
                                  </td>
                                ) : <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                  <span className="inline-flex rounded-full bg-green-500 px-2 text-xs font-semibold leading-5 text-green-800">
                                    {res.shipmentstatus}
                                  </span>
                                </td>}

                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                  {moment(res.planneddeliverydate).format('DD-MM-YYYY')}
                                </td>

                                {res.actualdeliverydate != null ? (
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                    <span className="inline-flex rounded-full bg-green-500 px-2 text-xs font-semibold leading-5 text-green-800">
                                      {moment(res.actualdeliverydate).format('DD-MM-YYYY')}
                                    </span>
                                  </td>
                                ) : <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                  <span className="inline-flex rounded-full bg-red-500 px-2 text-xs font-semibold leading-5 text-green-800">
                                    Not Delivered
                                  </span>
                                </td>}

                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">

                                  {/* <Select
      placeholder="Choose me"
      style={{ width: 120 }}
      // onChange={() => handleChange(res)}
      onChange={handleChange}
      onS
      loading
      options={[
        { value: 'delivered', label: 'delivered' }
      ]}
    /> */}

                                  {/* <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <div className="space-x-2">
              <button
                type="button"
                onClick={() =>showModal("Delivered",res)}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                &larr; Delivered
              </button>
              <button
                type="button"
                onClick={() =>showModal("In Transit",res)}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                In Transit &rarr;
              </button>
            </div>
          </div>
        </div> */}
                                  {/* <button
                type="button"
                onClick={() =>showModal("Delivered",res)}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                &larr; Delivered
              </button>

              <button
                type="button"
                onClick={() =>showModal("In Transit",res)}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                In Transit &rarr;
              </button> */}

                                  <button
                                    className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                    onClick={() => showModal("Delivered", res)}
                                  >
                                    Delivered
                                  </button>

                                  <br /><br />
                                  <button
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    onClick={() => showModal("In Transit", res)}
                                  >
                                    In Transit
                                  </button>


                                </td>

                              </tr>





                            </tbody>
                          )
                        })}

                      </table>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


