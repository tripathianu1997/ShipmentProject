"use client"
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function DashboardDriver() {

  const router = useRouter();
  const { data: session } = useSession();

  ///variables///
  const [isLoading, setIsLoading] = useState(true);
  let [uniquedriver, setUniquedriver] = useState([])

  //////

  useEffect(() => {
    driverData();
    // console.log(session.user.driverid,"TrackData");
  }, [])





  const driverData = () => {
    if (!session || !session.user) {
      router.push("/");
      return null;
    }

    setIsLoading(true);
    setUniquedriver([])
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "assigneddriverid": session.user.driverid
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
          setIsLoading(false)
        } else {
          setIsLoading(false)
          setUniquedriver([])

        }


      })
      .catch(error => {
        setIsLoading(false)
        console.log('error', error)
      });
  }

  // driverData();




  const updateStatus = (val, status) => {
    // e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "shipmentstatus": val,
      "assigneddriverid": session.user.driverid,
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


  //   if (!isOpen) return null;

  const showModal = (val, res) => {
    console.log(val, "val");
    console.log(res.shipmentid, "res");
    updateStatus(val, res.shipmentid)
    // setOpen(true);
  };


  return (
    <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
      {isLoading ? (
        <p className='font-weight: 700 text-align: center'>Loading...</p>
      ) : (
        <div class="shadow-2xl ...">
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
      )}
    </div>
  );
};


